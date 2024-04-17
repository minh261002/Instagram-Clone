import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/useProfileStore";

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setLoading] = useState(false);
    const { userProfile, setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getUserProfile = async () => {
            setLoading(true);

            try {
                const q = query(collection(firestore, "users"), where("username", "==", username));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setUserProfile(null);
                    return;
                }

                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });

                setUserProfile(userDoc);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getUserProfile();
    }, [setUserProfile, username]);

    return { isLoading, userProfile }
}

export default useGetUserProfileByUsername;
