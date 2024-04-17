import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";
import Swal from "sweetalert2";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const loginUser = useAuthStore(state => state.login);

    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();

            if (!newUser && error) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã có lỗi xảy ra, vui lòng thử lại sau'
                })
            }

            const userRef = doc(firestore, 'users', newUser.user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userDoc = userSnap.data();
                loginUser(userDoc);
                localStorage.setItem('user', JSON.stringify(userDoc));
            } else {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split('@')[0],
                    fullname: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }

                await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
                loginUser(userDoc);
                localStorage.setItem('user', JSON.stringify(userDoc));
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'}
                onClick={handleGoogleAuth}
            >
                <Image src='/google.png' w={5} />
                <Text mx={2} color={'blue.500'}>
                    {prefix} Với Google
                </Text>
            </Flex>
        </>
    )
}

export default GoogleAuth