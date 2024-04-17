import { Tooltip, Box, Flex } from "@chakra-ui/react"
import { AiFillBell } from "react-icons/ai"
import { Link as RouterLink } from "react-router-dom"

const Notifications = () => {
    return (
        <Tooltip
            hasArrow
            label={"Thông Báo"}
            placement="right"
            ml={1}
            openDelay={500}
            display={{ base: 'block', md: 'none' }}
        >
            <Flex
                display={'flex'}
                as={RouterLink}
                alignItems={'center'}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
            >
                <AiFillBell size={25} />
                <Box display={{ base: "none", md: "flex" }}>
                    Thông Báo
                </Box>
            </Flex>
        </Tooltip>
    )
}

export default Notifications