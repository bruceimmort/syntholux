export default function ArtistBtn(props) {
    return (
      <>
      <div className="ArtistBtnComponent">
          <img src={props.image} alt="" />
          <div>{props.name}</div>
      </div>
      </>
    );
  }