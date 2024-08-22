import React, { useState } from "react";
import { handleSongUpload } from "../../utils/functions";
import icons from "../../utils/icons";
import Button from "../button";

export default function UploadSong({ onClose, setMessageBox }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [songName, setSongName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [btnText, setBtnText] = useState("Upload Song");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const audio = new Audio(URL.createObjectURL(file));
            audio.addEventListener('loadedmetadata', () => {
                const duration = audio.duration;
                if (duration > 300) {
                    handleMessageBox("The selected audio exceeds 5 minutes. Please choose another file.", setMessageBox);
                    setSelectedFile(null);
                } else {
                    setSelectedFile(file);
                }
            });
        }
    };

    const closepopup = () => {
        onClose()
    }

    const handleBrowseClick = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="uploadSongContainer">
                <div className="browseSong flex items-center cursor-pointer" onClick={handleBrowseClick}>
                    <p className="fileName flex-grow mr-2 truncate max-w-[calc(100%-40px)]">
                        {selectedFile ? selectedFile.name : "Browse song"}
                    </p>
                    <img src={icons.browseIcon} alt="Browse Icon" className="w-5 h-5" />
                </div>

                <input type="file" id="fileInput" accept="audio/*" style={{ display: "none" }} onChange={handleFileChange} />

                <div className="songName mt-4 flex items-center">
                    <input 
                        type="text" 
                        placeholder="Song name" 
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                    <img src={icons.writeIcon} alt="Write Icon" className="ml-2 w-5 h-5" />
                </div>

                <div className="songName mt-4 flex items-center">
                    <input 
                        type="text" 
                        placeholder="Artist" 
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                    <img src={icons.writeIcon} alt="Write Icon" className="ml-2 w-5 h-5" />
                </div>

                {/* <textarea className="mt-4 w-full p-2 border border-gray-300 rounded-md" cols="30" rows="10" placeholder="Description ..." ></textarea> */}
                
                <Button text={btnText} backgroundColor="black" color="white" width="100%" onClick={() => handleSongUpload(setBtnText, selectedFile, songName, artistName, setMessageBox, closepopup)} />
            </div>
        </div>
    );
}
