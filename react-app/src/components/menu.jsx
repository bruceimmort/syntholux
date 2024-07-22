export default function MenuBtn(props) {
  return (
    <>
    <div className="MenuBtnComponent">
        <img src={props.image} alt="" />
        <div>{props.name}</div>
    </div>
    </>
  );
}