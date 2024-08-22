import { useRef, useState, useEffect } from "react";
import "../assets/css/pages/home.css";
import ArtistBtn from "../components/artistsMenu";
import Button from "../components/button";
import MenuBtn from "../components/menu";
import MessageBox from "../components/popups/messageBox";
import UploadSong from "../components/popups/uploadSong";
import icons from "../utils/icons";
import HomeContainer from "./homePage";
import { useUserSongs } from "../utils/functions";

export default function Home() {
    const [popup, setPopup] = useState("");
    const [playing, setPlaying] = useState(false);
    const [speaker, setSpeaker] = useState(true);
    const [repeat, setRepeat] = useState(false);
    const [liked, setLiked] = useState(false);
    const [expand, setExpand] = useState(true);
    const [messageBox, setMessageBox] = useState("");
    const [currentSong, setCurrentSong] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0); // State for current time
    const [duration, setDuration] = useState(0); // State for song duration

    const musicPlayerRef = useRef();
    const timelineRef = useRef(); // Ref for the timeline bar

    const { songs, loading } = useUserSongs();

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

    // Toggle playing/pausing the song
    const handlePlaying = () => {
        if (currentSong) {
            if (playing) {
                musicPlayerRef.current.pause();
                setPlaying(false);
            } else {
                musicPlayerRef.current.play();
                setPlaying(true);
            }
        }
    };

    // Play the next song when the current one ends
    const handleSongEnd = () => {
        handleNextSong();
    };

    // Select and play a song immediately
    const handleSongSelection = (index) => {
        setCurrentSong(songs[index]);
        setCurrentSongIndex(index);
        setPlaying(true);
    };

    // Play the next song in the list
    const handleNextSong = () => {
        if (songs.length > 0) {
            const nextIndex = (currentSongIndex + 1) % songs.length;
            setCurrentSong(songs[nextIndex]);
            setCurrentSongIndex(nextIndex);
            setPlaying(true);
            musicPlayerRef.current.play();
        }
    };

    // Play the previous song in the list
    const handlePrevSong = () => {
        if (songs.length > 0) {
            const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            setCurrentSong(songs[prevIndex]);
            setCurrentSongIndex(prevIndex);
            setPlaying(true);
            musicPlayerRef.current.play();
        }
    };

    // Update current time of the song
    const updateCurrentTime = () => {
        setCurrentTime(musicPlayerRef.current.currentTime);
    };

    // Handle loaded metadata to get song duration
    const handleLoadedMetadata = () => {
        setDuration(musicPlayerRef.current.duration);
    };

    // Handle clicking on the timeline bar to seek
    const handleTimelineClick = (e) => {
        const timelineWidth = timelineRef.current.offsetWidth;
        const clickX = e.nativeEvent.offsetX;
        const newTime = (clickX / timelineWidth) * duration;
        musicPlayerRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Format time in MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    useEffect(() => {
        if (currentSong) {
            musicPlayerRef.current.play();
        }
    }, [currentSong]);

    return (
        <>
            {popup === "upload song" && <UploadSong onClose={handleClosePopup} setMessageBox={setMessageBox} />}
            {messageBox ? <MessageBox message={messageBox} /> : ""}
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
                            backgroundColor="rgb(37 99 235)"
                            color="#FFFFFF"
                            onClick={() => setPopup("upload song")}
                        />
                    </div>
                    <HomeContainer 
                        setCurrentSong={setCurrentSong} 
                        setCurrentSongIndex={setCurrentSongIndex}
                        songs={songs}
                        loading={loading}
                        onSelectSong={handleSongSelection} // Pass the selection handler to HomeContainer
                    />
                </div>
                {/* Bottom music player */}
                <div className="musicPlayerDiv">
                    {currentSong ? (
                        <>
                            <audio 
                                src={currentSong.url} 
                                ref={musicPlayerRef} 
                                className="hidden" 
                                onEnded={handleSongEnd} // Automatically play next song
                                onTimeUpdate={updateCurrentTime} // Update current time as the song plays
                                onLoadedMetadata={handleLoadedMetadata} // Get song duration when metadata is loaded
                            ></audio>
                            <div className="musicInfoDiv">
                                <div className="infoDiv">
                                    <div className="songName">{currentSong.name}</div>
                                    <div className="artistName">{currentSong.artist || "Unknown Artist"}</div>
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
                                <div className="mainControlsDiv">
                                    <div className="timeStampsDiv">
                                        <div className="currentTime">{formatTime(currentTime)}</div> {/* Display formatted current time */}
                                        <div 
                                            className="timelineBar cursor-pointer" 
                                            ref={timelineRef} 
                                            onClick={handleTimelineClick}
                                            style={{
                                                background: `linear-gradient(to right, rgb(37 99 235) ${currentTime / duration * 100}%, #ccc 0%)`
                                            }}
                                        ></div>
                                        <div className="endingTime">{formatTime(duration)}</div>
                                    </div>
                                    <div className="flowControlsDiv">
                                        <img 
                                            src={icons.prevIcon} 
                                            alt="Previous" 
                                            title={songs[(currentSongIndex - 1 + songs.length) % songs.length]?.name || "Previous"} 
                                            onClick={handlePrevSong} 
                                        />
                                        <div className="playControl" title="Play / Pause" onClick={handlePlaying}>
                                            {playing ?
                                                <img src={icons.playingIcon} alt="Play" />
                                                :
                                                <img src={icons.pausedIcon} alt="Pause" />}
                                        </div>
                                        <img 
                                            src={icons.nextIcon} 
                                            alt="Next" 
                                            title={songs[(currentSongIndex + 1) % songs.length]?.name || "Next"} 
                                            onClick={handleNextSong} 
                                        />
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
                        </>
                    ) : (
                        <p>No song selected</p>
                    )}
                </div>
            </div>
        </>
    );
}
