import { useState } from "react";
import { storage, db } from "../../firebase"; // Adjust the path as needed
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import icons from "../../utils/icons";
import Button from "../button";

export default function UploadSong({ onClose }) {
    const [songFile, setSongFile] = useState(null);
    const [songName, setSongName] = useState("");
    const [description, setDescription] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("audio/") && file.duration <= 480) {
            setSongFile(file);
        } else {
            alert("Please upload a valid audio file not exceeding 8 minutes.");
        }
    };

    const handleUpload = async () => {
        if (!songFile || !songName) {
            alert("Please provide all necessary information.");
            return;
        }

        const storageRef = ref(storage, `songs/${songFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, songFile);

        uploadTask.on("state_changed",
            (snapshot) => {
                // Handle progress
            },
            (error) => {
                // Handle error
                alert("Upload failed: " + error.message);
            },
            async () => {
                // Handle successful upload
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await addDoc(collection(db, "songs"), {
                    name: songName,
                    description: description,
                    url: downloadURL,
                });
                onClose();
            }
        );
    };

    return (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="uploadSongContainer">
                <div className="browseSong">
                    <p>Browse song</p>
                    <input type="file" accept="audio/*" onChange={handleFileChange} />
                </div>
                <div className="songName">
                    <input type="text" placeholder="Song name" value={songName} onChange={(e) => setSongName(e.target.value)} />
                    <img src={icons.writeIcon} alt="" />
                </div>
                <textarea cols="30" rows="10" placeholder="Description ..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <Button text="Upload Song" backgroundColor="black" color="white" width="100%" onClick={handleUpload} />
            </div>
        </div>
    );
}
