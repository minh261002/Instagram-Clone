import { Flex, Box, Spinner } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar"

const PageLayout = ({ children }) => {
    const pathname = useLocation().pathname;
    const [user, loading] = useAuthState(auth);

    const canRenderSidebar = pathname !== '/auth' && user;
    const canRenderNavbar = !user && !loading && pathname !== '/auth';

    if (!user && loading) {
        return <PageLayoutSpinner />
    } else {
        return (
            <Flex flexDir={canRenderNavbar ? "column" : "row"}>
                {/* sidebar */}
                {canRenderSidebar ? (
                    <Box w={{ base: '70px', md: '240px' }}>
                        <Sidebar />
                    </Box>
                ) : null}

                {/* navbar */}
                {canRenderNavbar ? (
                    <Navbar />
                ) : null}
                {/* page */}
                <Box flex={1} w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}>
                    {children}
                </Box>
            </Flex>
        )
    }
}

export default PageLayout

const PageLayoutSpinner = () => {
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} h={'100vh'}>
            <Spinner size={'xl'} />
        </Flex>
    )
}