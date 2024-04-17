import { Tooltip, Box, Link } from "@chakra-ui/react"
import { AiFillHome } from "react-icons/ai"
import { Link as RouterLink } from "react-router-dom"

const Home = () => {
    return (
        <Tooltip
            hasArrow
            label={"Trang Chủ"}
            placement="right"
            ml={1}
            openDelay={500}
            display={{ base: 'block', md: 'none' }}
        >
            <Link
                display={'flex'}
                to={"/"}
                as={RouterLink}
                alignItems={'center'}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
            >
                <AiFillHome size={25} />
                <Box display={{ base: "none", md: "flex" }}>
                    Trang Chủ
                </Box>
            </Link>
        </Tooltip>
    )
}

export default Home