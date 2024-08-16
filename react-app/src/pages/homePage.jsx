import "../assets/css/pages/home.css";
import { logout } from "../firebase/auth";
import icons from "../utils/icons";
import { useUserSongs } from "../utils/functions";
import MostlyPlayed from "../components/mostlyPlayed";
import BeatLoader from "react-spinners/BeatLoader";
import RecentSong from "../components/recentlySong";

export default function HomeContainer() {
    const { songs, loading } = useUserSongs();

    if (loading) {
        return <div>Loading... <BeatLoader size={10} color="#000" /></div>;
    }

    return (
        <div className="homeContainer font-mono">
            <div className="homeHeaderDiv">
                <img className="profilePicture" src={icons.profileImage} alt="" onClick={logout} />
            </div>
            <div className="homeContainerDiv">
                {/* <div className="recently">
                    Recently played
                    <div className="recentlyList">
                        {songs.map((song,index) => {
                            <>
                            <div key={index}></div>
                            <RecentSong cover={icons.unnamedImage} song={song.name} artist={song.artist} />
                            </>
                        })}
                    </div>
                </div> */}
                <div className="mostlyPlayed">
                    Mostly played
                    <div className="mostlyPlayedList">
                        {songs.map((song, index) => (
                            <MostlyPlayed
                                key={index}
                                cover={icons.unnamedImage}
                                duration={song.duration ? `${Math.floor(song.duration / 60)}:${("0" + Math.floor(song.duration % 60)).slice(-2)}` : "Unknown"}
                                song={song.name}
                                artist={song.artist || "Unknown Artist"}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

