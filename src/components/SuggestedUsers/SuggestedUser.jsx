import { Button, Flex, Avatar, VStack, Box } from "@chakra-ui/react"
import { useState } from "react"
import useFollowUser from "../../hooks/useFollowUser"
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, setUser }) => {
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user?.uid);
    const authUser = useAuthStore(state => state.user);

    const onFollowUser = async () => {
        await handleFollowUser();
        setUser({
            ...user,
            followers: isFollowing
                ? user.followers.filter((follower) => follower.uid !== authUser.uid)
                : [...user.followers, authUser],
        });
    };
    return (
        <>
            {user && (
                <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
                    <Flex alignItems={'center'} gap={2}>
                        <Avatar src={user.profilePicURL} size={'md'} />

                        <VStack spacing={2}>
                            <Flex direction={'column'} alignItems={'flex-start'}>
                                <Box fontSize={12} fontWeight={'bold'}>
                                    {user.username}
                                </Box>

                                <Box fontSize={11} color={'gray.500'}>
                                    {user.followers.length} người theo dõi
                                </Box>
                            </Flex>
                        </VStack>
                    </Flex>

                    {authUser.uid !== user.uid && (
                        <Button
                            fontSize={13}
                            bg={"transparent"}
                            p={0}
                            h={"max-content"}
                            fontWeight={"medium"}
                            color={"blue.400"}
                            cursor={"pointer"}
                            _hover={{ color: "white" }}
                            onClick={onFollowUser}
                            isLoading={isUpdating}
                        >
                            {isFollowing ? "Huỷ Theo Dõi" : "Theo Dõi"}
                        </Button>
                    )}

                </Flex>
            )}
        </>
    )
}

export default SuggestedUser