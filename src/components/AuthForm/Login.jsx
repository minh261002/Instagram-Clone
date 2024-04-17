import { Input, Button, Alert, AlertIcon } from '@chakra-ui/react'
import { useState } from 'react'
import useLogin from '../../hooks/useLogin';

const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { loading, error, login } = useLogin();

    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                value={inputs.email}
                onChange={(e) => { setInputs({ ...inputs, email: e.target.value }) }}
            />

            <Input
                placeholder='Mật Khẩu'
                fontSize={14}
                type='password'
                value={inputs.password}
                onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }}
            />

            {error && (
                <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon />
                    {error.message}
                </Alert>
            )}

            <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}
                onClick={() => login(inputs)}
                isLoading={loading}
            >
                Đăng Nhập
            </Button>
        </>
    )
}

export default Login