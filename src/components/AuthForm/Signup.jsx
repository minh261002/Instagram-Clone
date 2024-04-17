import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react'
import UseSignUpWithEmailAndPassword from '../../hooks/UseSignUpWithEmailAndPassword';

const Signup = () => {

    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        fullname: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const { loading, error, signup } = UseSignUpWithEmailAndPassword();

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
                placeholder='Tên Đăng Nhập'
                type='text'
                fontSize={14}
                value={inputs.username}
                onChange={(e) => { setInputs({ ...inputs, username: e.target.value }) }}
            />

            <Input
                placeholder='Họ và Tên'
                type='text'
                fontSize={14}
                value={inputs.fullname}
                onChange={(e) => { setInputs({ ...inputs, fullname: e.target.value }) }}
            />

            <InputGroup>
                <Input
                    placeholder='Mật Khẩu'
                    fontSize={14}
                    type={showPassword ? 'text' : 'password'}
                    value={inputs.password}
                    onChange={(e) => { setInputs({ ...inputs, password: e.target.value }) }}
                />

                <InputRightElement h="full">
                    <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            {error && (
                <Alert status="error" fontSize={13} p={2} borderRadius={4}>
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}

            <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} isLoading={loading} onClick={() => signup(inputs)}>
                Đăng Ký
            </Button>

        </>
    )
}

export default Signup