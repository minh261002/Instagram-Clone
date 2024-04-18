import { Grid, VStack, Skeleton, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import ProfilePost from './ProfilePost'
import useGetUserPost from '../../hooks/useGetUserPost'

const ProfilePosts = () => {

    const { posts, isLoading } = useGetUserPost();

    if (!isLoading && posts.length === 0) {
        return (
            <VStack w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"}>
                <Box>Chưa có bài viết nào</Box>
            </VStack>
        )
    }

    return (
        <Grid
            templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(4, 1fr)",
            }}
            gap={1}
            columnGap={1}
        >
            {isLoading && [0, 1, 2].map((_, idx) => (
                <VStack key={idx} alignItems={"flex-start"} gap={4}>
                    <Skeleton w={"full"}>
                        <Box h="300px">
                            contents wrapped
                        </Box>
                    </Skeleton>
                </VStack>
            ))}

            {!isLoading && (
                <>
                    {posts.map((post) => (
                        <ProfilePost key={post.id} post={post} />
                    ))}
                </>
            )}
        </Grid>
    )
}

export default ProfilePosts
