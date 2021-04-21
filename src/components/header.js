function Header(props) {
    return (
        <div className="flex-fill">
            <div className="d-flex justify-content-center bg-primary p-4">
                <h3 className="text-light">{props.text}</h3>
            </div>
        </div>
    );
}

export default Header;