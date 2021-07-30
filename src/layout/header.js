export default function Header(props) {
  return (
    <div className="fill-flex">
      <div className="header d-flex justify-content-center bg-primary align-items-center">
        <h3 className="text-light">{props.text}</h3>
      </div>
    </div>
  );
}
