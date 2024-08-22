import { useEffect } from "react";
import { useUserSongs } from "../utils/functions";
import MostlyPlayed from "../components/mostlyPlayed";
import BeatLoader from "react-spinners/BeatLoader";
import icons from "../utils/icons";
import { logout } from "../firebase/auth";

export default function HomeContainer({ setCurrentSong, setCurrentSongIndex, songs, loading }) {

    useEffect(() => {
        // Load the first song initially
        if (songs.length > 0) {
            setCurrentSong(songs[0]);
            setCurrentSongIndex(0);
        }
    }, [songs, setCurrentSong, setCurrentSongIndex]);

    if (loading) {
        return <div>Loading... <BeatLoader size={10} color="#000" /></div>;
    }

    const handleSongClick = (song, index) => {
        setCurrentSong(song);
        setCurrentSongIndex(index);
    };

    return (
        <div className="homeContainer font-mono">
            <div className="homeHeaderDiv">
                <img className="profilePicture" src={icons.profileImage} alt="" onClick={logout} />
            </div>
            <div className="homeContainerDiv">
                <div className="mostlyPlayed">
                    Mostly played
                    <div className="mostlyPlayedList gap-11 w-[100%]">
                        {songs.map((song, index) => (
                            <div key={index} onClick={() => handleSongClick(song, index)} className="w-[44%]">
                                <MostlyPlayed
                                    cover={icons.unnamedImage}
                                    duration={song.duration ? `${Math.floor(song.duration / 60)}:${("0" + Math.floor(song.duration % 60)).slice(-2)}` : "Unknown"}
                                    song={song.name}
                                    artist={song.artist || "Unknown Artist"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
