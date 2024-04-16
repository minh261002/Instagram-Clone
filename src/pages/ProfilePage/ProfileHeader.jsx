import { AvatarGroup, Avatar, Text, Flex, VStack, Button } from "@chakra-ui/react"
const ProfileHeader = () => {
    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
            <AvatarGroup
                size={{ base: "xl", md: "2xl" }}
                justifySelf={"center"}
                alignSelf={"center"}
                mx={"auto"}
            >
                <Avatar name="Minh" src="/profilepic.png" />
            </AvatarGroup>

            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>
                    <Text fontSize={{ base: "sm", md: "lg" }}>
                        Minh_
                    </Text>

                    <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                        <Button bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}>
                            Chỉnh sửa
                        </Button>
                    </Flex>
                </Flex>

                <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }} fontSize={{ base: "xs", md: "sm" }}>
                    <Text>
                        <Text as={'span'} fontWeight={'bold'} mr={1}>4</Text>
                        Bài viết
                    </Text>

                    <Text>
                        <Text as={'span'} fontWeight={'bold'} mr={1}>100</Text>
                        Người theo dõi
                    </Text>

                    <Text>
                        <Text as={'span'} fontWeight={'bold'} mr={1}>100</Text>
                        Đang theo dõi
                    </Text>
                </Flex>

                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} fontWeight={"bold"}>Tran Cong Minh</Text>
                </Flex>

                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, necessitatibus.</Text>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default ProfileHeader