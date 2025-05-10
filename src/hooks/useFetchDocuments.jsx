import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where
} from "firebase/firestore"

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (cancelled) return;

            setLoading(true);
            setError(null);

            try {
                let q;
                const collectionRef = collection(db, docCollection);

                if (search) {
                    q = query(
                        collectionRef,
                        where("title", ">=", search),
                        where("title", "<=", search + "\uf8ff"),
                        orderBy("title")
                    );
                } else if (uid) {
                    q = query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("title")
                    );
                } else {
                    q = query(collectionRef, orderBy("title"));
                }

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    
                    setDocuments(data);
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error(error);
                setError(error.message);
                setLoading(false);
            }
        }

        loadData();
    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
}