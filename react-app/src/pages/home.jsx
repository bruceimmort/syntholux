import { useState } from "react";
import "../assets/css/pages/home.css";
import ArtistBtn from "../components/artistsMenu";
import Button from "../components/button";
import MenuBtn from "../components/menu";
import UploadSong from "../components/popups/uploadSong";
import icons from "../utils/icons";
import HomeContainer from "./homePage";

export default function Home() {
    const [popup, setPopup] = useState("");
    const [playing, setPlaying] = useState(true);
    const [speaker, setSpeaker] = useState(true);
    const [repeat, setRepeat] = useState(true);
    const [liked, setLiked] = useState(false);
    const [expand, setExpand] = useState(true);

    const handlePlaying = () => {
        setPlaying(!playing);
    };

    const handleLiked = () => {
        setLiked(!liked);
    };

    const handleRepeat = () => {
        setRepeat(!repeat);
    };

    const handleMute = () => {
        setSpeaker(!speaker);
    };

    const handleExpand = () => {
        setExpand(!expand);
    };

    const handleClosePopup = () => {
        setPopup("");
    };

    return (
        <>
            {popup === "upload song" && <UploadSong onClose={handleClosePopup} />}
            <div className="all">
                <div className="containerDiv">
                    <div className="sideBar">
                        <div className="logoDiv">
                            Sortify
                        </div>
                        <div className="menuDiv">
                            <p>Menu</p>
                            <MenuBtn image={icons.playlistIcon} name="Playlist" />
                            <MenuBtn image={icons.heartIcon} name="Liked" />
                            <MenuBtn image={icons.settingsIcon} name="Settings" />
                        </div>
                        <div className="artistsMenuDiv">
                            <p>Artists</p>
                            <ArtistBtn image={icons.mjImage} name="Michael Jackson" />
                            <ArtistBtn image={icons.mariahImage} name="Mariah Carey" />
                            <ArtistBtn image={icons.bruceImage} name="Bruce Melodie" />
                        </div>
                        <Button
                            text="Upload Song"
                            backgroundColor="#00BBC7"
                            color="#FFFFFF"
                            onClick={() => setPopup("upload song")}
                        />
                    </div>
                    <HomeContainer/>
                </div>
                {/* Bottom music player */}
                <div className="musicPlayerDiv">
                    {/* Music name and artist */}
                    <div className="musicInfoDiv">
                        <div className="infoDiv">
                            <div className="songName">What was I made for</div>
                            <div className="artistName">Billie Eilish</div>
                        </div>
                        <div className="likeSongDiv" onClick={handleLiked}>
                            {liked ?
                                <img src={icons.blueHeartIcon} alt="Liked" />
                                :
                                <img src={icons.heartIcon} alt="Not liked" />
                            }
                        </div>
                    </div>
                    <div className="controlsDiv">
                        {/* Music player controls */}
                        <div className="mainControlsDiv">
                            <div className="timeStampsDiv">
                                <div className="startingTime">00:00</div>
                                <div className="timelineBar"></div>
                                <div className="endingTime">04:00</div>
                            </div>
                            <div className="flowControlsDiv">
                                <img src={icons.prevIcon} alt="Previous" title="Previous" />
                                <div className="playControl" title="Play / Pause" onClick={handlePlaying}>
                                    {playing ?
                                        <img src={icons.pausedIcon} alt="Pause" />
                                        :
                                        <img src={icons.playingIcon} alt="Play" />}
                                </div>
                                <img src={icons.nextIcon} alt="Next" title="Next" />
                            </div>
                        </div>
                        <div className="otherControlsDiv">
                            <div className="otherControlsContainer">
                                <div className="repeatControl" title={repeat ? "Repeat one" : "Repeat"} onClick={handleRepeat}>
                                    {repeat ?
                                        <img src={icons.repeatIcon} alt="Repeat" />
                                        :
                                        <img src={icons.repeatOneIcon} alt="Repeat one" />
                                    }
                                </div>
                                <div className="speakerControl" title={speaker ? "Mute" : "Unmute"} onClick={handleMute}>
                                    {speaker ?
                                        <img src={icons.speakerIcon} alt="Speaker" />
                                        :
                                        <img src={icons.muteIcon} alt="Mute" />
                                    }
                                </div>
                                <div className="expandControl" title={expand ? "Expand" : "Minimize"} onClick={handleExpand}>
                                    {expand ?
                                        <img src={icons.expandIcon} alt="Expand" />
                                        :
                                        <img src={icons.minimizeIcon} alt="Minimize" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
