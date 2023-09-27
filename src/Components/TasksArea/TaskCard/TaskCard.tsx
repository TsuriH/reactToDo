import "./TaskCard.css";
import dots from "../../../Images/three-small-dots-svgrepo-com.svg"

interface ITask {
    id: number;
    name: string;
    description: string;
    tags: string[];
    delete: Function;
    isTaskMenuOpen: boolean
    openSingleTaskActionsMenu: Function
    closeTaskActionsMenu: Function
    openAddNewTaskInEditMode: Function
}

 
function TaskCard(props: ITask): JSX.Element {

    function editTask(taskId: number) {

        //close the taskMenuActions
        props.closeTaskActionsMenu()
        // open the task template with the details of the task I have clicked
        props.openAddNewTaskInEditMode(taskId)
        // the button needs to be update instead of add
        
        // when I click update it is update the local storage
        // it renders again
    }
       



    return (
        <div className="TaskCard">

            <div className="task-header">

                <h2>{props.name}</h2>

                <button onClick={() =>  props.openSingleTaskActionsMenu(props.id)}> <img src={dots} className="image-buttons-task" /></button>

                <div className="task-card-actions-menu" style={props.isTaskMenuOpen ? { display: "flex" } : { display: "none" }}>

                    <button className="edit-btn" onClick={() => editTask(props.id)} >Edit...</button>
                    <button className="delete-btn" onClick={() => props.delete(props.id)}>Delete</button>
                    
                </div>

            </div>

            <p className="task-content">{props.description}</p>

            <div className="task-footer">

                <div className="task-tags-container">
                    {props.tags.map((color, index) => <p key={index} className={`tag-shape ${color}`}></p>)}

                </div>

                <div className="done-indicator">
                    <input type="checkbox" id="input-done" />
                    <label htmlFor="input-done">Done</label>
                </div>

            </div>
        </div>
    );
}

export default TaskCard;
