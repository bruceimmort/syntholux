export default function RecentSong (props){
    return(
        <>
        <div className="recentSongDiv">
            <img src={props.cover} alt="" />
            <div className="recentSongDesc">
                <p className="recentArtist">{props.artist}</p>
                <p className="recentSong">{props.song}</p>
            </div>
        </div>
        </>
    )
}