import { Flex, Image, Text } from "@chakra-ui/react";

const GoogleAuth = () => {
    return (
        <>
            <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
                <Image src='/google.png' w={5} />
                <Text mx={2} color={'blue.500'}>
                    Đăng Nhập Với Google
                </Text>
            </Flex>
        </>
    )
}

export default GoogleAuth