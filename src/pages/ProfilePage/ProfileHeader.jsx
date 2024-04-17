import { AvatarGroup, Avatar, Text, Flex, VStack, Button, useDisclosure } from "@chakra-ui/react"
import useUserProfileStore from "../../store/useProfileStore"
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";

const ProfileHeader = () => {
    const { userProfile } = useUserProfileStore();
    const authUser = useAuthStore(state => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

    const visittingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
    const visittingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;


    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
            <AvatarGroup
                size={{ base: "xl", md: "2xl" }}
                justifySelf={"center"}
                alignSelf={"center"}
                mx={"auto"}
            >
                <Avatar src={userProfile.profilePicURL} />
            </AvatarGroup>

            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>
                    <Text fontSize={{ base: "sm", md: "lg" }}>
                        {userProfile.username}
                    </Text>

                    {visittingOwnProfileAndAuth && (
                        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                            <Button bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }} onClick={onOpen}>
                                Chỉnh sửa
                            </Button>
                        </Flex>
                    )}

                    {visittingAnotherProfileAndAuth && (
                        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                            <Button isLoading={isUpdating} onClick={handleFollowUser} bg={"blue.500"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}>
                                {isFollowing ? 'Huỷ Theo Dõi' : 'Theo Dõi'}
                            </Button>
                        </Flex>
                    )}
                </Flex>

                <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }} fontSize={{ base: "xs", md: "sm" }}>
                    <Text>
                        <Text as={'span'} fontWeight={'bold'} mr={1}>{userProfile.posts.length}</Text>
                        Bài viết
                    </Text>

                    <Text>
                        <Text as={'span'} fontWeight={'bold'} mr={1}>{userProfile.followers.length}</Text>
                        Người theo dõi
                    </Text>

                    <Text>
                        <Text as={'span'} fontWeight={'bold'} mr={1}>{userProfile.following.length}</Text>
                        Đang theo dõi
                    </Text>
                </Flex>

                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} fontWeight={"bold"}>
                        {userProfile.fullname}
                    </Text>
                </Flex>

                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} >
                        {userProfile.bio}
                    </Text>
                </Flex>
            </VStack>

            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
        </Flex>
    )
}

export default ProfileHeader