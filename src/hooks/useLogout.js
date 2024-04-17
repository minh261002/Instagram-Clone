import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import Swal from "sweetalert2"

const useLogout = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth)

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user');

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