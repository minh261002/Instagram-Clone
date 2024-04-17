import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import Swal from "sweetalert2";

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const getUserProfile = async (username) => {
        setIsLoading(true);
        setUser(null);
        try {
            const q = query(collection(firestore, "users"), where("username", "==", username));

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                Swal.fire({
                    icon: "error",
                    title: "Không Tìm Thấy Người Dùng",
                    text: "Vui lòng kiểm tra lại tên người dùng",
                });
                return;
            }

            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });

            console.log(user)
        } catch (error) {
            console.log(error)
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;