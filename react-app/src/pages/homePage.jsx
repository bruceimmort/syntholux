import { useState } from "react";
import "../assets/css/pages/home.css";
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
            </div>
        </>
    );
}
