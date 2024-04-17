import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firebase/firebase'
import Swal from 'sweetalert2'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import useAuthStore from '../store/authStore'

const UseSignUpWithEmailAndPassword = () => {
    const loginUser = useAuthStore(state => state.login)
    const logoutUser = useAuthStore(state => state.logout)

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth)

    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng nhập đầy đủ thông tin'
            })
            return;
        }

        const userRef = collection(firestore, 'users');
        const q = query(userRef, where("username", "==", inputs.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Tên người dùng đã tồn tại'
            })

            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)

            if (!newUser && error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: "Đã có lỗi xảy ra, vui lòng thử lại"
                })

                console.log(error)
            }

            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullname: inputs.fullname,
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }

                await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
                localStorage.setItem('user', JSON.stringify(userDoc));
                loginUser(userDoc);

                Swal.fire({
                    icon: 'success',
                    title: 'Thành Công',
                    text: 'Đăng ký thành công'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: "Đã có lỗi xảy ra, vui lòng thử lại"
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    return { loading, error, signup }
}

export default UseSignUpWithEmailAndPassword