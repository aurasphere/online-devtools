export default function Footer(props) {
  return (
    <footer className={"p-1 flex-column footer text-center " + props.bgColor}>
      <div className="mx-auto">
        This app performs everything in your browser and no data is sent
        anywhere. The code is available on{" "}
        <a
          className={props.linkColor}
          href="https://github.com/aurasphere/online-devtools"
        >
          GitHub
        </a>
        .
      </div>
      <div className="mx-auto">
        Made by{" "}
        <a
          className={props.linkColor}
          href="https://github.com/aurasphere/online-devtools"
        >
          Donato Rimenti
        </a>
      </div>
    </footer>
  );
}
