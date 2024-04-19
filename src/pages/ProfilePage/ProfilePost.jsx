import { GridItem, Avatar, Box, Flex, Text, Image, ModalContent, Modal, ModalOverlay, VStack, ModalCloseButton, ModalBody, useDisclosure, Divider, Button } from "@chakra-ui/react"

import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Comment from "../../components/Comment/Comment"
import PostFooter from "../../components/FeedPost/PostFooter"
import useUserProfileStore from "../../store/useProfileStore"
import useAuthStore from "../../store/authStore"
import { useState } from "react"
import { firestore, storage } from '../../firebase/firebase'
import { deleteObject, ref } from "firebase/storage"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import usePostStore from "../../store/postStore"
import Swal from "sweetalert2"

const ProfilePost = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const userProfile = useUserProfileStore(state => state.userProfile);
    const authUser = useAuthStore(state => state.user);
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePost = usePostStore(state => state.deletePost);

    const handleDeletePost = async () => {

        setIsDeleting(true);

        //xác nhận xóa bài viết
        const confirm = Swal.fire({
            title: 'Xác nhận xóa bài viết',
            text: 'Bạn có chắc chắn muốn xóa bài viết này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const imageRef = ref(storage, `posts/${post.id}`);
                        await deleteObject(imageRef);

                        const userRef = doc(firestore, 'users', authUser.uid);
                        await deleteDoc(doc(firestore, 'posts', post.id));

                        await updateDoc(userRef, {
                            posts: arrayRemove(post.id)
                        })

                        deletePost(post.id)

                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa bài viết thành công',
                            showConfirmButton: true,
                            timer: 1500,
                        })
                    } catch (error) {
                        console.log(error)
                    } finally {
                        setIsDeleting(false);
                    }
                }
            })
            ;

        onClose();


    }

    return (
        <>
            <GridItem
                cursor={'pointer'}
                borderRadius={4}
                overflow={'hidden'}
                border={'1px solid'}
                borderColor={'whiteAlpha.300'}
                position={'relative'}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >
                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={'blackAlpha.700'}
                    transition={"all 0.3s ease-in-out"}
                    zIndex={1}
                    justifyContent={'center'}
                >
                    <Flex alignItems={'center'} justifyContent={'center'} gap={50}>
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeight={'bold'} ml={2}>
                                {post.likes.length}
                            </Text>
                        </Flex>

                        <Flex>
                            <FaComment size={20} />
                            <Text fontWeight={'bold'} ml={2}>
                                {post.comments.length}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Image src={post.imageURL} w={"100%"} h={"100%"} objectFit={"cover"} />
            </GridItem>

            <Modal isOpen={isOpen} onClose={onClose}
                isCentered={true}
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />

                    <ModalBody bg={'black'} pb={5}>
                        <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={'auto'}>
                            <Box borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} flex={1.5}>
                                <Image src={post.imageURL} w={"100%"} h={"100%"} objectFit={"cover"} />
                            </Box>

                            <Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
                                <Flex alignItems={'center'} justifyContent={'space-between'}>
                                    <Flex alignItems={'center'} gap={4}>
                                        <Avatar src={userProfile.profilePicURL} size={"sm"} name="minh" />
                                        <Text fontWeight={'bold'} fontSize={12}>
                                            {userProfile.username}
                                        </Text>
                                    </Flex>

                                    {authUser?.uid === userProfile.uid && (
                                        <Button
                                            _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                                            borderRadius={4}
                                            p={1}
                                            size={"sm"}
                                            bg={"transparent"}
                                            onClick={handleDeletePost}
                                        >
                                            <MdDelete size={20} cursor={"pointer"} />
                                        </Button>
                                    )}
                                </Flex>

                                <Divider my={4} bg={"gray.500"} />

                                <VStack w={'full'} alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                                    <Comment
                                        created_at={"1 ngày trước"}
                                        username={"minh"}
                                        profilePic={"/profilepic.png"}
                                        content={"Lorem ipsum dolor sit "}
                                    />
                                    <Comment
                                        created_at={"1 ngày trước"}
                                        username={"minh"}
                                        profilePic={"/profilepic.png"}
                                        content={"Lorem ipsum dolor sit "}
                                    />
                                    <Comment
                                        created_at={"1 ngày trước"}
                                        username={"minh"}
                                        profilePic={"/profilepic.png"}
                                        content={"Lorem ipsum dolor sit "}
                                    />
                                    <Comment
                                        created_at={"1 ngày trước"}
                                        username={"minh"}
                                        profilePic={"/profilepic.png"}
                                        content={"Lorem ipsum dolor sit "}
                                    />
                                    <Comment
                                        created_at={"1 ngày trước"}
                                        username={"minh"}
                                        profilePic={"/profilepic.png"}
                                        content={"Lorem ipsum dolor sit "}
                                    />
                                    <Comment
                                        created_at={"1 ngày trước"}
                                        username={"minh"}
                                        profilePic={"/profilepic.png"}
                                        content={"Lorem ipsum dolor sit "}
                                    />
                                    <Comment
                                        created_at={"1 ngày trước"}
                                        username={"minh"}
                                        profilePic={"/profilepic.png"}
                                        content={"Lorem ipsum dolor sit "}
                                    />
                                    <Comment
                                        created_at={"1 ngày trước"}
                                        username={"minh"}
                                        profilePic={"/profilepic.png"}
                                        content={"Lorem ipsum dolor sit "}
                                    />
                                </VStack>

                                <Divider my={4} bg={"gray.8000"} />

                                <PostFooter isProfilePage={true} />
                            </Flex>

                        </Flex>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfilePost