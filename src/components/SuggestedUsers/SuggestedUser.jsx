import { Button, Flex, Avatar, VStack, Box } from "@chakra-ui/react"
import { useState } from "react"

const SuggestedUser = ({ followers, name, avatar }) => {

    const [isFollowed, setIsFollowed] = useState(false)

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
            <Flex alignItems={'center'} gap={2}>
                <Avatar src={avatar} name={name} size={'md'} />

                <VStack spacing={2}>
                    <Box fontSize={12} fontWeight={'bold'}>
                        {name}
                    </Box>

                    <Box fontSize={11} color={'gray.500'}>
                        {followers} người theo dõi
                    </Box>
                </VStack>
            </Flex>

            <Button
                fontSize={13}
                bg={'transparent'}
                p={0}
                h={'max-content'}
                fontWeight={'medium'}
                color={'blue.400'}
                cursor={'pointer'}
                _hover={{ color: "white" }}
                onClick={() => setIsFollowed(!isFollowed)} // Sử dụng hàm callback để tránh gọi setIsFollowed ngay khi render
            >
                {isFollowed ? 'Huỷ' : 'Theo Dõi'}
            </Button>


        </Flex>
    )
}

export default SuggestedUser