import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

const PostHeader = ({ username, avatar }) => {
    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={"full"} my={2}>
            <Flex alignItems={'center'} gap={2}>
                <Avatar src={avatar} size={'sm'} />

                <Flex fontSize={12} fontWeight={'bold'} gap={2}>
                    {username}
                    <Box color={"gray.500"}>
                        .1 giờ
                    </Box>
                </Flex>
            </Flex>

            <Box cursor={'pointer'}>
                <Text
                    fontSize={12}
                    color={"blue.500"}
                    fontWeight={'bold'}
                    _hover={{
                        color: "White",
                    }}
                    transition={'all 0.3s ease-in-out'}
                >
                    Bỏ theo dõi
                </Text>
            </Box>
        </Flex>
    )
}

export default PostHeader