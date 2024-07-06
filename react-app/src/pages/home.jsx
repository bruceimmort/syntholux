import { useState } from "react";
import "../assets/css/pages/home.css"
import ArtistBtn from "../componets/artistsMenu";
import Button from "../componets/button";
import MenuBtn from "../componets/menu";
import UploadSong from "../componets/popups/uploadSong";
import icons from "../utils/icons";

export default function Home(){
    const [popup, setPopup] = useState("");
    const [playing, setPlaying] = useState(true);
    const [speaker, setSpeaker] = useState(true);
    const [repeat, setRepeat] = useState(true);
    const [liked, setLiked] = useState(false);
    const [expand, setExpand] = useState(true);

    const handlePlaying = () => {
        setPlaying(!playing);
    }

    const handleLiked = () => {
        setLiked(!liked);
    }

    const handleRepeat = () => {
        setRepeat(!repeat);
    }

    const handleMute = () => {
        setSpeaker(!speaker);
    }

    const handleExpand = () => {
        setExpand(!expand);
    }

    return(
        <>
        {popup === "upload song" && <UploadSong />}
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
                    <Button text="Upload Song" backgroundColor="#00BBC7" color="#FFFFFF" onClick={() => setPopup("upload song")} />
                </div>
            </div>
            {/* Bottom music player */}
            <div className="musicPlayerDiv">
                {/* Music name and artist */}
                <div className="musicInfoDiv">
                    <div className="infoDiv">
                        <div className="songName"> What was I made for</div>
                        <div className="artistName"> Billie Eilish</div>
                    </div>
                    <div className="likeSongDiv" onClick={handleLiked}>
                        {liked ?
                            <img src={icons.blueHeartIcon} alt="" />
                        :
                            <img src={icons.heartIcon} alt="" />
                        }
                    </div>
                </div>
                <div className="controlsDiv">
                    {/* Music player controls */}
                    <div className="mainControlsDiv">
                        <div className="timeStampsDiv">
                            <div className="startingTime">00:00</div>
                            <div className="timelineBar"></div>
                            <div className="startingTime">04:00</div>
                        </div>
                        <div className="flowControlsDiv">
                            <img src={icons.prevIcon} alt="" title="Previous" />
                            <div className="play/play" title="Play / Pause" onClick={handlePlaying}>
                                {playing ?
                                    <img src={icons.pausedIcon} alt="" />
                                    :
                                    <img src={icons.playingIcon} alt="" />}
                            </div>
                            <img src={icons.nextIcon} alt="" title="Next" />
                        </div>
                    </div>
                    <div className="otherControlsDiv">
                        <div className="otherControlsContainer">
                            <div className="repeat/repeat-one" title={repeat ? "Repeat one" : "Repeat"} onClick={handleRepeat}>
                                {repeat ?
                                    <img src={icons.repeatIcon} alt="" />
                                    :
                                    <img src={icons.repeatOneIcon} alt="" />
                                }
                            </div>
                            <div className="speaker/mute" title={speaker ? "Mute" : "Unmute"} onClick={handleMute}>
                                {speaker ?
                                    <img src={icons.speakerIcon} alt="" />
                                    :
                                    <img src={icons.muteIcon} alt="" />
                                }
                            </div>
                            <div className="expand/minimise" title={expand ? "Expand" : "Minimize"} onClick={handleExpand}>
                                {expand ?
                                    <img src={icons.expandIcon} alt="" />
                                    :
                                    <img src={icons.minimizeIcon} alt="" />
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
