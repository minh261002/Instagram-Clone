import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const [
        siginInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const loginUser = useAuthStore(state => state.login);

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng nhập đầy đủ thông tin'
            })
            return;
        }

        try {
            const userCred = await siginInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCred) {
                const docRef = doc(firestore, 'users', userCred.user.uid);
                const docSnap = await getDoc(docRef);

                localStorage.setItem('user', JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Thông tin đăng nhập không chính xác'
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    return { loading, error, login }
}

export default useLogin