import { Box, Container, Flex } from '@chakra-ui/react'
import FeedPosts from '../../components/FeedPost/FeedPosts'
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers'

const HomePage = () => {
    return (
        <Container maxW="container.lg">
            <Flex gap={20}>
                <Box flex={2} py={10} >
                    <FeedPosts />
                </Box>

                <Box flex={3} display={{ base: "none", lg: "block" }} maxW={'400px'}>
                    <SuggestedUsers />
                </Box>
            </Flex>
        </Container>
    )
}

export default HomePage
