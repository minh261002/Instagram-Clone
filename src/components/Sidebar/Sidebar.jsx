import { Box, Link, Tooltip, Avatar, Flex, Button } from "@chakra-ui/react";
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
import { AiFillHome } from 'react-icons/ai';
import { Link as RouterLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
    const { handleLogout, isLoggingOut, error } = useLogout();

    return (
        <Box
            height={'100vh'}
            borderRight={"1px solid"}
            borderColor={"whiteAlpha.300"}
            py={8}
            position={'sticky'}
            top={0}
            left={0}
            px={{ base: 2, md: 4 }}
        >

            <Flex direction={'column'} gap={10} w="full" height={"full"}>
                <Link to={"/"} as={RouterLink} pl={2} cursor={"pointer"} display={{ base: 'none', md: 'block' }}>
                    <InstagramLogo />
                </Link>

                <Link to={"/"} pl={2} cursor={"pointer"} display={{ base: 'block', md: 'none' }}>
                    <InstagramMobileLogo />
                </Link>

                <Flex direction={'column'} gap={5} cursor={'pointer'}>
                    <SidebarItem />
                </Flex>

                <Tooltip
                    hasArrow
                    label={"Đăng Xuất"}
                    placement='right'
                    ml={1}
                    openDelay={500}
                    display={{ base: "none", md: "block" }}
                >
                    <Flex
                        onClick={handleLogout}
                        alignItems={"center"}
                        gap={4}
                        _hover={{ bg: "whiteAlpha.400" }}
                        borderRadius={6}
                        p={2}
                        w={{ base: 10, md: "full" }}
                        mt={"auto"}
                        justifyContent={{ base: "center", md: "flex-start" }}
                        cursor={'pointer'}
                    >
                        <BiLogOut size={25} />
                        <Button display={{ base: "none", md: "flex" }}
                            variant={"ghost"}
                            _hover={{ bg: "transparent" }}
                            isLoading={isLoggingOut}
                        >
                            Đăng Xuất
                        </Button>
                    </Flex>
                </Tooltip>
            </Flex>
        </Box>
    )
}

export default Sidebar
