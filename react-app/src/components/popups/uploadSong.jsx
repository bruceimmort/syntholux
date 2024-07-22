import icons from "../../utils/icons";
import Button from "../button";

export default function UploadSong({ onClose }) {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="uploadSongContainer">
                <div className="browseSong">
                    <p>Browse song</p>
                    <img src={icons.browseIcon} alt="" />
                </div>
                <div className="songName">
                    <input type="text" name="" placeholder="Song name" id="" />
                    <img src={icons.writeIcon} alt="" />
                </div>
                <textarea cols="30" rows="10" placeholder="Description ..."></textarea>
                <Button text="Upload Song" backgroundColor="black" color="white" width="100%" />
            </div>
        </div>
    );
}
