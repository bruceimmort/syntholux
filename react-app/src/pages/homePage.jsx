import { useState } from "react";
import "../assets/css/pages/home.css";
import MostlyPlayed from "../components/mostlyPlayed";
import RecentSong from "../components/recentlySong";
import icons from "../utils/icons";

export default function HomeContainer() {
    

    return (
        <>
            <div className="homeContainer">
                <div className="homeHeaderDiv">
                    <div className="searchBar">
                        <input type="text" placeholder="Search songs and playlists"/>
                        <img src={icons.searchIcon} alt="" />
                    </div>
                    <img className="profilePicture" src={icons.profileImage} alt="" />
                </div>
                <div className="homeContainerDiv">
                    <div className="recently">
                        Recently played
                        <div className="recentlyList">
                            <RecentSong cover={icons.adeleImage} song="Easy on me" artist="Adele"/>
                            <RecentSong cover={icons.adeleImage} song="Easy on me" artist="Adele"/>
                            <RecentSong cover={icons.adeleImage} song="Easy on me" artist="Adele"/>
                            <RecentSong cover={icons.adeleImage} song="Easy on me" artist="Adele"/>
                        </div>
                    </div>
                    <div className="mostlyPlayed">
                        Mostly played
                        <div className="mostlyPlayedList">
                            <MostlyPlayed cover={icons.adeleImage} duration="03:20" song="Easy on me" artist="Adele"/>
                            <MostlyPlayed cover={icons.adeleImage} duration="03:20" song="Easy on me" artist="Adele"/>
                            <MostlyPlayed cover={icons.adeleImage} duration="03:20" song="Easy on me" artist="Adele"/>
                            <MostlyPlayed cover={icons.adeleImage} duration="03:20" song="Easy on me" artist="Adele"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
