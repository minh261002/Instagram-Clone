import { Link, Flex, Text, Container, SkeletonCircle, VStack, Skeleton } from '@chakra-ui/react'
import ProfileHeader from './ProfileHeader'
import ProfileTab from './ProfileTab'
import ProfilePosts from './ProfilePosts'
import { useParams } from 'react-router-dom'
import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername'
import { Link as RouterLink } from 'react-router-dom'
const ProfilePage = () => {
    const { username } = useParams();
    const { isLoading, userProfile } = useGetUserProfileByUsername(username);

    if (!isLoading && !userProfile) {
        return <UserNotFound />
    }

    return (
        <Container maxW="container.lg" py={5}>
            <Flex flexDirection={"column"} py={10} px={4} pl={{ base: 4, md: 10 }} w={'full'} mx={"auto"}>
                {!isLoading && userProfile && <ProfileHeader />}
            </Flex>


            <Flex px={{ base: 2, sm: 4 }} maxW={'full'} mx={'auto'} borderTop={'1px solid'} borderColor={"whiteAlpha.300"} direction={'column'}>
                <ProfileTab />
                <ProfilePosts />
            </Flex>
        </Container>
    )
}

export default ProfilePage

const UserNotFound = () => {
    return (
        <Flex flexDir={'column'} textAlign={'center'} mx={'auto'} mt={100}>
            <Text fontSize={'2xl'}>
                Không Tìm Thấy Người Dùng Này
            </Text>

            <Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
                Trang Chủ
            </Link>
        </Flex>
    );

}