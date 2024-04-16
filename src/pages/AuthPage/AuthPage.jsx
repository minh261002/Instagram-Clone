import { Container, Flex, Box, Image, VStack } from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm'

const AuthPage = () => {
    return (
        <Flex minH={"100vh"} justifyContent={'center'} alignItems={'center'} px={4} >
            <Container maxW={"container.md"} padding={0}>
                <Flex justifyContent={'center'} alignItems={'center'} gap={10}>
                    {/* left */}
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src="/auth.png" h={650} alt="Auth Photo" />
                    </Box>

                    {/* right */}
                    <VStack spacing={4} align={"stretch"}>
                        <AuthForm />

                        <Box textAlign={'center'}>
                            Tải Ứng Dụng
                        </Box>

                        <Flex gap={5} justifyContent={'center'}>
                            <Image src='/playstore.png' h={10} />
                            <Image src='/microsoft.png' h={10} />
                        </Flex>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    )
}

export default AuthPage
