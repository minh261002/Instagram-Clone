import { Box, Image } from '@chakra-ui/react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'

const FeedPost = ({ img, username, avatar }) => {
    return (
        <>
            <PostHeader username={username} avatar={avatar} />
            <Box my={2} borderRadius={4} overflow={'hidden'}>
                <Image src={img} />
            </Box>
            <PostFooter username={username} avatar={avatar} />
        </>
    )
}

export default FeedPost