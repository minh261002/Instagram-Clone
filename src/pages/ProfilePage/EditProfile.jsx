import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import Swal from "sweetalert2";

const EditProfile = ({ isOpen, onClose }) => {
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

    const [inputs, setInputs] = useState({
        fullname: "",
        username: "",
        bio: "",
    });

    const authUser = useAuthStore((state) => state.user);
    const fileRef = useRef(null);
    const { isUpdating, editProfile } = useEditProfile();

    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Cập nhật thông tin thành công",
            });
            onClose();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
                    <ModalHeader />
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody>
                        {/* Container Flex */}
                        <Flex bg={"black"}>
                            <Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
                                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                                    Thông Tin Cá Nhân
                                </Heading>
                                <FormControl>
                                    <Stack direction={["column", "row"]} spacing={6}>
                                        <Center>
                                            <Avatar
                                                size='xl'
                                                border={"2px solid white "}
                                                src={selectedFile || authUser.profilePicURL}
                                            />
                                        </Center>
                                        <Center w='full'>
                                            <Button w='full' onClick={() => fileRef.current.click()}>
                                                Chọn Ảnh
                                            </Button>
                                        </Center>
                                        <input
                                            ref={fileRef}
                                            type='file'
                                            accept='image/*'
                                            hidden
                                            onChange={handleImageChange}
                                        />
                                    </Stack>
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Họ Và Tên</FormLabel>
                                    <Input
                                        size={"sm"}
                                        type={"text"}
                                        value={inputs.fullname || authUser.fullname}
                                        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Tên Người Dùng</FormLabel>
                                    <Input
                                        size={"sm"}
                                        type={"text"}
                                        value={inputs.username || authUser.username}
                                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>Mô Tả</FormLabel>
                                    <Input
                                        size={"sm"}
                                        type={"text"}
                                        value={inputs.bio || authUser.bio}
                                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                                    />
                                </FormControl>

                                <Stack spacing={6} direction={["column", "row"]}>
                                    <Button
                                        bg={"red.400"}
                                        color={"white"}
                                        w='full'
                                        size='sm'
                                        _hover={{ bg: "red.500" }}
                                        onClick={onClose}
                                    >
                                        Huỷ
                                    </Button>
                                    <Button
                                        bg={"blue.400"}
                                        color={"white"}
                                        size='sm'
                                        w='full'
                                        _hover={{ bg: "blue.500" }}
                                        onClick={handleEditProfile}
                                        isLoading={isUpdating}
                                    >
                                        Lưu Thay Đổi
                                    </Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditProfile;