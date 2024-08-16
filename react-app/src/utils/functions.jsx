import BeatLoader from "react-spinners/BeatLoader";
import { getFirestore, doc, setDoc, query, collection, getDocs, where, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth} from "../firebase/firebase";
import { useEffect, useState } from "react";

// Initialize Firestore
const db = getFirestore();
const storage = getStorage();

export function handleMessageBox (message, setMessageBox) {
    setMessageBox(message);
    setTimeout(() => {
        setMessageBox("");
    }, 3000);
}

export function useUserSongs() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            handleMessageBox("User is not authenticated.", setMessageBox);
            setLoading(false);
            return;
        }

        const q = query(collection(db, "songs"), where("userId", "==", user.uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedSongs = querySnapshot.docs.map((doc) => doc.data());
            setSongs(fetchedSongs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user songs:", error);
            handleMessageBox("Failed to fetch songs due to insufficient permissions.", setMessageBox);
            setLoading(false);
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);

    return { songs, loading };
}


export function handleSongUpload(setBtnText, selectedFile, songName, artistName, setMessageBox, closepopup) {
    if (!songName.trim()) {
        handleMessageBox("Please enter a song name.", setMessageBox);
        return;
    }

    if (!selectedFile) {
        handleMessageBox("Please select a file to upload.", setMessageBox);
        return;
    }

    setBtnText(<BeatLoader size={10} color="#fff" />);

    // Create a reference to the Firebase storage location
    const storageRef = ref(storage, `songs/${songName}_${Date.now()}`);

    // Start the upload task
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    
    const userId = auth.currentUser.uid;
    // console.log(userId)

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            console.error("Error during file upload:", error);
            handleMessageBox("Error uploading file. Please try again.", setMessageBox);
            setBtnText("Upload Song");
        },
        async () => {
            try {
                // Get the download URL
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Get the song's duration
                const audio = new Audio(URL.createObjectURL(selectedFile));
                audio.addEventListener('loadedmetadata', async () => {
                    const duration = audio.duration;

                    // Get the current user ID
                    const userId = auth.currentUser.uid;

                    // Store the song details in Firestore
                    const songDoc = doc(db, "songs", `${songName}_${Date.now()}`);
                    await setDoc(songDoc, {
                        name: songName,
                        url: downloadURL,
                        duration: duration,
                        artist: artistName,
                        userId: userId
                    });

                    handleMessageBox("Song uploaded and saved successfully!", setMessageBox);
                    setBtnText("Upload Song");
                    closepopup();
                });
            } catch (error) {
                console.error("Error saving song to Firestore:", error);
                handleMessageBox("Error saving song details. Please try again.", setMessageBox);
                setBtnText("Upload Song");
            }
        }
    );
}