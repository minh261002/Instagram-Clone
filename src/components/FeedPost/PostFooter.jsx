import { Flex, Box, Text, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import { useState } from 'react'

import { NotificationsLogo, UnlikeLogo, CommentLogo } from '../../assets/constants'
const PostFooter = ({ username, isProfilePage }) => {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(1000)

    const handleLike = () => {
        if (liked) {
            setLiked(false)
            setLikes(likes - 1)
        } else {
            setLiked(true)
            setLikes(likes + 1)
        }
    }

    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} my={4}>
                <Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
                    {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>

                <Box cursor={'pointer'} fontSize={18}>
                    <CommentLogo />
                </Box>
            </Flex>

            <Text fontWeight={600} fontSize={'sm'}>
                {likes} lượt thích
            </Text>

            {!isProfilePage && (
                <>
                    <Text fontSize={'sm'} fontWeight={700}>
                        {username}_{" "}
                        <Text as='span' fontWeight={400}>
                            Lorem ipsum dolor sit amet
                        </Text>
                    </Text>

                    <Text fontSize={'sm'} color={'gray'}>
                        Xem tất cả 100 bình luận
                    </Text>
                </>
            )}

            <Flex alignItems={'center'} justifyContent={'space-between'} gap={2} w={'full'}>
                <InputGroup>
                    <Input variant={"flushed"} placeholder={"Viết Bình Luận ..."} fontSize={14} />
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={'blue.500'}
                            fontWeight={600}
                            cursor={'pointer'}
                            _hover={{ color: "white" }}
                            bg={'transparent'}
                        >
                            Đăng
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    )
}

export default PostFooter