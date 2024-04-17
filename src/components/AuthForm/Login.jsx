import { Input, Button } from '@chakra-ui/react'
import { useState } from 'react'

const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
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

            <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14}>
                Đăng Nhập
            </Button>
        </>
    )
}

export default Login