import icons from "../utils/icons";

export default function MostlyPlayed (props){
    return(
        <>
        <div className="mostlyPlayedDiv">
            <img src={props.cover} alt="" className="playedCover rounded-full w-4 h-4" />
            <div className="playedDesc" style={{display:"flex", flexDirection: "column", gap: "4px"}}>
                <p className="playedSong">{props.song}</p>
                <p className="playedArtist">{props.artist}</p>
            </div>
            <div className="playedDuration">{props.duration}</div>
            <img src={icons.threeDotsIcon} alt="" className="playedMore"/>
        </div>
        </>
    )
}