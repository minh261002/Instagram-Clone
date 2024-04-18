import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    const authUser = useAuthStore((state) => state.user);

    useEffect(() => {
        const getSuggestedUser = async () => {
            try {
                const userRef = collection(firestore, "users");
                const q = query(userRef,
                    where("uid", "not-in", [authUser.uid, ...authUser.following]),
                    orderBy("uid"),
                    limit(5)
                );

                const querySnapshot = await getDocs(q);
                const users = [];

                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                });

                setSuggestedUsers(users);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        if (authUser) getSuggestedUser();
    }, [authUser])

    return { isLoading, suggestedUsers };

}

export default useGetSuggestedUser;