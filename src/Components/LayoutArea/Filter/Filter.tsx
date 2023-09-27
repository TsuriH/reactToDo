import "./Filter.css";

interface FilterProps {
    name: string;
    color: string
}

function Filter(props: FilterProps): JSX.Element {
    const style = {
        backgroundColor: props.color
    }
    return (
        <div className="Filter" >
            <button className="filter-btn" >
                <div className="task-color" style={style} ></div>
                <p className="task-name-filter">{props.name}</p>
            </button>
        </div>
    );
}

export default Filter;
