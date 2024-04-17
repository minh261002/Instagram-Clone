import { useState } from "react";
import useAuthStore from "../store/authStore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/useProfileStore";

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) return;
        setIsUpdating(true);

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, "users", authUser.uid);

        let URL = "";
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }

            const updatedUser = {
                ...authUser,
                fullname: inputs.fullname || authUser.fullname,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL,
            };

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return { editProfile, isUpdating };
};

export default useEditProfile;