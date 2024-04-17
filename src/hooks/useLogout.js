import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import Swal from "sweetalert2"
import useAuthStore from "../store/authStore"

const useLogout = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth)
    const useLogout = useAuthStore(state => state.logout)

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user');
            useLogout();

            Swal.fire({
                icon: 'success',
                title: 'Thành Công',
                text: 'Đăng xuất thành công'
            })
        } catch (error) {
            console.log(error)
        }
    }

    return { handleLogout, isLoggingOut, error }
}

export default useLogout