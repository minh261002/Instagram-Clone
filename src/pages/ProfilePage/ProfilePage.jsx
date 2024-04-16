import { Box, Flex, Text, Container } from '@chakra-ui/react'
import ProfileHeader from './ProfileHeader'
import ProfileTab from './ProfileTab'
import ProfilePosts from './ProfilePosts'

const ProfilePage = () => {
    return (
        <Container maxW="container.lg" py={5}>
            <Flex flexDirection={"column"} py={10} px={4} pl={{ base: 4, md: 10 }} w={'full'} mx={"auto"}>
                <ProfileHeader />
            </Flex>


            <Flex px={{ base: 2, sm: 4 }} maxW={'full'} mx={'auto'} borderTop={'1px solid'} borderColor={"whiteAlpha.300"} direction={'column'}>
                <ProfileTab />
                <ProfilePosts />
            </Flex>
        </Container>
    )
}

export default ProfilePage
