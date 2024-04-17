import { Tooltip, Box, Link, Avatar } from "@chakra-ui/react"
import { AiFillBell, AiFillHome } from "react-icons/ai"
import { Link as RouterLink } from "react-router-dom"
import useAuthStore from "../../store/authStore"

const ProfileLink = () => {
    const authUser = useAuthStore((state) => state.user);

    return (
        <Tooltip
            hasArrow
            label={"Thông Tin"}
            placement="right"
            ml={1}
            openDelay={500}
            display={{ base: 'block', md: 'none' }}
        >
            <Link
                display={'flex'}
                to={`/${authUser?.username}`}
                as={RouterLink}
                alignItems={'center'}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
            >
                <Avatar size="sm" src={authUser?.profilePicURL || ""} />

                <Box display={{ base: "none", md: "flex" }}>
                    {authUser?.username}
                </Box>
            </Link>
        </Tooltip>
    )
}

export default ProfileLink