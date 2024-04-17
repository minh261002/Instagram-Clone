import { Input, Text, Flex, Button, Box, Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Login from './Login'
import Signup from './Signup'
import GoogleAuth from './GoogleAuth'

const AuthForm = () => {
    const MySwal = withReactContent(Swal)

    const [isLogin, setIsLogin] = useState(true);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleAuth = () => {
        if (!inputs.email || !inputs.password) {
            return MySwal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng nhập đầy đủ thông tin'
            })
        }

        navigate('/');
    };

    return (
        <div>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image src='/logo.png' h={24} cursor={'pointer'} />

                    {isLogin ? <Login /> : <Signup />}

                    <Flex alignItems={"center"} justifyContent={'center'} my={4} gap={1} w={'full'}>
                        <Box flex={2} h={'1px'} bg={"gray.400"} />
                        <Text mx={1} color={'white'}>HOẶC</Text>
                        <Box flex={2} h={'1px'} bg={"gray.400"} />
                    </Flex>

                    <GoogleAuth />
                </VStack>
            </Box>

            <Box border={'1px solid gray'} mt={5} borderRadius={4} padding={5}>
                <Flex alignItems={'center'} justifyContent={'center'}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
                    </Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'}>
                        {isLogin ? "Đăng Ký" : "Đăng Nhập"}
                    </Box>
                </Flex>
            </Box>
        </div>
    )
}

export default AuthForm
