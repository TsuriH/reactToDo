import "./Header.css";

function Header({onToggleAddTask}: {onToggleAddTask: () => void}): JSX.Element {

    return (
        <div className="Header">
			<h1>todo</h1>
            <button className="plus-btn" onClick={onToggleAddTask}>➕</button>
        </div>
    );
}

export default Header;
