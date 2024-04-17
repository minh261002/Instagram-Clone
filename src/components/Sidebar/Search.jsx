import { Tooltip, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Box, useDisclosure, Flex, ModalBody, FormControl, FormLabel } from "@chakra-ui/react"
import { SearchLogo } from "../../assets/constants"
import { useRef } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const searchRef = useRef(null);
    const { user, isLoading, getUserProfile, setUser } = useSearchUser();

    const handleSearchUser = (e) => {
        e.preventDefault();
        getUserProfile(searchRef.current.value);
    };

    return (
        <>
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
                    alignItems={'center'}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    onClick={onOpen}
                >
                    <SearchLogo size={25} />
                    <Box display={{ base: "none", md: "flex" }}>
                        Tìm Kiếm
                    </Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"} maxW={"480px"}>
                    <ModalHeader>Tìm Kiếm</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <form onSubmit={handleSearchUser}>
                            <FormControl>
                                <FormLabel>Tìm Kiếm</FormLabel>
                                <Input ref={searchRef} placeholder="Nhập tên người dùng" />
                            </FormControl>

                            <Flex w={"full"} justifyContent={"flex-end"}>
                                <Button mt={4} colorScheme="blue" type="submit" isLoading={isLoading}>
                                    Tìm Kiếm
                                </Button>
                            </Flex>
                        </form>

                        {user && <SuggestedUser user={user} setUser={setUser} />}

                        {!user && <Box mt={4}>Không tìm thấy người dùng</Box>}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Search