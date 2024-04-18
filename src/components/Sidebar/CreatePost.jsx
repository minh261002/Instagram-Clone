import { Tooltip, Image, Box, Link, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, Button, Flex, CloseButton } from "@chakra-ui/react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { CreatePostLogo } from "../../assets/constants"
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/useProfileStore";
import Swal from "sweetalert2";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [caption, setCaption] = useState("");
    const imageRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const { isLoading, handleCreatePost } = useCreatePost();

    const handlePostCreation = async () => {
        try {
            await handleCreatePost(selectedFile, caption);
            onClose();
            setCaption("");
            setSelectedFile(null);
            Swal.fire({
                title: "Thành công!",
                text: "Tạo bài viết thành công!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
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
                    onClick={onOpen}
                >
                    <CreatePostLogo size={25} />
                    <Box display={{ base: "none", md: "flex" }}>
                        Tạo Bài Viết
                    </Box>
                </Link>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />

                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Tạo Bài Viết Mới</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <Textarea placeholder="Nội dung bài viết"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />

                        <Input type="file" hidden
                            ref={imageRef}
                            onChange={handleImageChange}
                        />

                        <BsFillImageFill
                            onClick={() => imageRef.current.click()}
                            size={16}
                            style={{
                                marginTop: "15px", marginLeft: "5px", cursor: "pointer"
                            }} />

                        {selectedFile && (
                            <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                                <Image src={selectedFile} />

                                <CloseButton position={"absolute"} top={2} right={2} onClick={() => {
                                    setSelectedFile(null);
                                }} />
                            </Flex>

                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3}
                            onClick={handlePostCreation}
                            isLoading={isLoading}
                        >Đăng</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost

function useCreatePost() {
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const createPost = usePostStore((state) => state.createPost);
    const addPost = useUserProfileStore((state) => state.addPost);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const { pathname } = useLocation();

    const handleCreatePost = async (selectedFile, caption) => {
        if (isLoading) return;
        if (!selectedFile) throw new Error("Please select an image");
        setIsLoading(true);
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
        };

        try {
            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
            const userDocRef = doc(firestore, "users", authUser.uid);
            const imageRef = ref(storage, `posts/${postDocRef.id}`);

            await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(postDocRef, { imageURL: downloadURL });

            newPost.imageURL = downloadURL;

            if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

            if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

            Swal.fire({
                title: "Thành công!",
                text: "Tạo bài viết thành công!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleCreatePost };
}