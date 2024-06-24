import "../assets/css/pages/home.css"
import icons from "../utils/icons";

export default function Home(){
    return(
        <>
        <div className="all">
            <div className="containerDiv"></div>
            <div className="musicPlayerDiv">
                <div className="musicInfoDiv">
                    <div className="infoDiv">
                        <div className="songName"> What was I made for</div>
                        <div className="artistName"> Billie Eilish</div>
                    </div>
                    <div className="likeSongDiv">
                        <img src={icons.heart} alt="" />
                    </div>
                </div>
                <div className="controlsDiv">
                    <div className="mainControlsDiv">
                        <div className="timeStampsDiv">
                            <div className="startingTime">00:00</div>
                            <div className="timelineBar"></div>
                            <div className="startingTime">04:00</div>
                        </div>
                    </div>
                    <div className="flowControlsDiv"></div>
                </div>
            </div>
        </div>
        </>
    );
}