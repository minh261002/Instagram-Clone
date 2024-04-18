import { VStack, Flex, Text, Box } from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUser from '../../hooks/useGetSuggestedUser'

const SuggestedUsers = () => {
    const { isLoading, suggestedUsers } = useGetSuggestedUser()

    if (isLoading) return null;
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />

            {suggestedUsers.length === 0 && (
                <Flex w={'full'} justify={'center'} align={'center'}>
                    <Text fontSize={14} color={"gray.500"}>
                        Không Có Gợi Ý Nào Cho Bạn
                    </Text>
                </Flex>)}

            {suggestedUsers.length > 0 && (
                <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
                    <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                        Gợi Ý Cho Bạn
                    </Text>

                    <Text fontSize={12} fontWeight={'bold'} _hover={{ color: "gray.400" }} cursor={'pointer'}>
                        Xem Tất Cả
                    </Text>
                </Flex>
            )}
            {suggestedUsers.map((user) => (
                <SuggestedUser key={user.id} user={user} />
            ))}

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