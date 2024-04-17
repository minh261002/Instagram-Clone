import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firebase/firebase'
import Swal from 'sweetalert2'
import { doc, setDoc } from 'firebase/firestore'

const UseSignUpWithEmailAndPassword = () => {

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

                Swal.fire({
                    icon: 'success',
                    title: 'Thành Công',
                    text: 'Đăng ký thành công'
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    return { loading, error, signup }
}

export default UseSignUpWithEmailAndPassword