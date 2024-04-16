import { VStack, Flex, Text, Box } from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'

const SuggestedUsers = () => {
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />

            <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                    Gợi Ý Cho Bạn
                </Text>

                <Text fontSize={12} fontWeight={'bold'} _hover={{ color: "gray.400" }} cursor={'pointer'}>
                    Xem Tất Cả
                </Text>
            </Flex>

            <SuggestedUser followers={1000} name={'Trần Công Minh'} avatar={'/profilepic.png'} />

            <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={'start'} w={'full'}>
                <Text as={"span"} mr={2} w={'full'}>
                    © 2024 {" "}
                    <a href={'https://www.facebook.com/profile.php?id=100051915323590'} target="_blank" rel="noopener noreferrer">
                        Tran Cong Minh
                    </a>
                    {" "} | All rights reserved
                </Text>
            </Box>
        </VStack>
    )
}

export default SuggestedUsers