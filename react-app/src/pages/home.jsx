import { useState } from "react";
import "../assets/css/pages/home.css"
import icons from "../utils/icons";

export default function Home(){
    const [playing, setPlaying] = useState(true);
    return(
        <>
        <div className="all">
            <div className="containerDiv"></div>
            {/* Bottom music player */}
            <div className="musicPlayerDiv">
                {/* Music name and artist */}
                <div className="musicInfoDiv">
                    <div className="infoDiv">
                        <div className="songName"> What was I made for</div>
                        <div className="artistName"> Billie Eilish</div>
                    </div>
                    <div className="likeSongDiv">
                        <img src={icons.heartIcon} alt="" />
                    </div>
                </div>
                <div className="controlsDiv">
                    {/* Music player contro;s */}
                    <div className="mainControlsDiv">
                        <div className="timeStampsDiv">
                            <div className="startingTime">00:00</div>
                            <div className="timelineBar"></div>
                            <div className="startingTime">04:00</div>
                        </div>
                        <div className="flowControlsDiv">
                            <img src={icons.prevIcon} alt="" title="Previous"/>
                            <div className="play/play" title="Play / Pause">
                                {playing  ? 
                                <img src={icons.pausedIcon} alt=""/>
                                : 
                                <img src={icons.heartIcon} alt=""/>}
                            </div>
                            <img src={icons.nextIcon} alt="" title="Next"/>
                        </div>
                    </div>
                    <div className="otherControlsDiv">
                        <div className="otherControlsContainer">
                            <img src={icons.repeatIcon} alt="" />
                            <img src={icons.speakerIcon} alt="" />
                            <img src={icons.expandIcon} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}