import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../assets/css/pages/home.css";
import MostlyPlayed from "../components/mostlyPlayed";
import RecentSong from "../components/recentlySong";
import icons from "../utils/icons";

export default function HomeContainer() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            const querySnapshot = await getDocs(collection(db, "songs"));
            const songsList = querySnapshot.docs.map(doc => doc.data());
            setSongs(songsList);
        };

        fetchSongs();
    }, []);

    return (
        <>
            <div className="homeContainer">
                <div className="homeHeaderDiv">
                    <div className="searchBar">
                        <input type="text" placeholder="Search songs and playlists" />
                        <img src={icons.searchIcon} alt="" />
                    </div>
                    <img className="profilePicture" src={icons.profileImage} alt="" />
                </div>
                <div className="homeContainerDiv">
                    <div className="recently">
                        Recently played
                        <div className="recentlyList">
                            {songs.map((song, index) => (
                                <RecentSong key={index} cover={icons.adeleImage} song={song.name} artist="Unknown" />
                            ))}
                        </div>
                    </div>
                    <div className="mostlyPlayed">
                        Mostly played
                        <div className="mostlyPlayedList">
                            {songs.map((song, index) => (
                                <MostlyPlayed key={index} cover={icons.adeleImage} duration="03:20" song={song.name} artist="Unknown" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
