import { Tooltip, Box, Link } from "@chakra-ui/react"
import { AiFillBell, AiFillHome } from "react-icons/ai"
import { Link as RouterLink } from "react-router-dom"
import { CreatePostLogo } from "../../assets/constants"

const CreatePost = () => {
    return (
        <Tooltip
            hasArrow
            label={"Tạo Bài Viết"}
            placement="right"
            ml={1}
            openDelay={500}
            display={{ base: 'block', md: 'none' }}
        >
            <Link
                display={'flex'}
                as={RouterLink}
                alignItems={'center'}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
            >
                <CreatePostLogo size={25} />
                <Box display={{ base: "none", md: "flex" }}>
                    Tạo Bài Viết
                </Box>
            </Link>
        </Tooltip>
    )
}

export default CreatePost