import { Flex, Box, Text } from "@chakra-ui/react"
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs"

const ProfileTab = () => {
    return (
        <Flex w={'full'} justifyContent={'center'} gap={{ base: 4, sm: 10 }} textTransform={"uppercase"} fontWeight={"bold"}>
            <Flex borderTop={"1px solid white"} alignItems={"center"} p={3} gap={1} cursor={"pointer"} >
                <Box fontSize={20}>
                    <BsGrid3X3 />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }}>Bài Viết</Text>
            </Flex>
            <Flex alignItems={"center"} p={3} gap={1} cursor={"pointer"} >
                <Box fontSize={20}>
                    <BsBookmark />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }}>Lưu Trữ</Text>
            </Flex>
            <Flex alignItems={"center"} p={3} gap={1} cursor={"pointer"} >
                <Box fontSize={20}>
                    <BsSuitHeart fontWeight={"bold"} />
                </Box>
                <Text fontSize={12} display={{ base: "none", sm: "block" }}>Đã Thích</Text>
            </Flex>
        </Flex>
    )
}

export default ProfileTab