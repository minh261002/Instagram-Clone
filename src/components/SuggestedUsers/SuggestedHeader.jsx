import { Flex, Avatar, Text, Spinner, Button } from "@chakra-ui/react"
import useLogout from "../../hooks/useLogout"
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
    const { handleLogout, isLoggingOut } = useLogout();
    const authUser = useAuthStore(state => state.user);

    if (!authUser) {
        return (
            <Flex flexDir={'column'} justifyContent={'flex-start'} alignItems={'center'} h={'100vh'}>
                <Spinner size={'xl'} />
            </Flex>
        );
    }

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
            <Flex alignItems={'center'} gap={2}>
                <Link to={`${authUser.username}`}>
                    <Avatar size={'lg'} src={authUser.profilePicURL} />
                </Link>
                <Link to={`${authUser.username}`}>
                    <Text fontSize={12} fontWeight={'bold'}>
                        {authUser.username}
                    </Text>
                </Link>
            </Flex>

            <Button
                onClick={handleLogout}
                bg={'transparent'}
                _hover={{ bg: 'transparent' }}
                fontSize={14}
                fontWeight={'medium'}
                color={'blue.400'}
                cursor={'pointer'}
                isLoading={isLoggingOut}
            >
                Đăng Xuất
            </Button>
        </Flex>
    )
}

export default SuggestedHeader