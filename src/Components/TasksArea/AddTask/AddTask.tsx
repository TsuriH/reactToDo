
import { useEffect, useState } from "react";
import "./AddTask.css";
import TaskType from "../../../Models/TaskType";

interface InfoFromAddTask {
    orderCloseAddTask: Function;
    populateTasksArray: Function;
    isItEditMode: boolean;
    taskToEdit: TaskType
    
}


function AddTask(props: InfoFromAddTask): JSX.Element {

    


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState<string[]>([])

    //checking if it is edit mode fill in the fields with task to edit details
    useEffect(() => {
        
        if (props.isItEditMode) {

            setTitle(props.taskToEdit.name)
            setDescription(props.taskToEdit.description)
            setTags(props.taskToEdit.tags) 

        }
    }, [])


    function tagsArray(tag: string) {
        if (tags.includes(tag)) {
            setTags(tags.filter(singleTag => singleTag !== tag))
        }
        else {
            setTags([...tags, tag])
        }

    }


    function taskAllTheFormDetails() {

        props.populateTasksArray({
    
            name: title,
            description: description,
            tags: tags,
            
        })

        setTitle("")
        setDescription("")
        setTags([])


    }


console.log(props.isItEditMode)



    return (
        <div className="AddTask">
                
                
            <div className="add-cancel-btn-container">

                <button className="cancel-task-btn" onClick={() => props.orderCloseAddTask()}>Cancel</button>
                <button className="add-task-btn" onClick={() => taskAllTheFormDetails()}>{props.isItEditMode ? "Update" : "Add"}</button>
            </div>

            <div className="insert-title-wrapper">

                <h2 className="task-title">Title</h2>
                <input className="title-task-field" placeholder="add a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

            </div>

            <div className="insert-description-wrapper" >

                <h2 className="task-description">Description</h2>
                <textarea className="task-description-field" placeholder="add a description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </div>

            <div className="task-types">
                <h2 className="task-tags-title">Tags</h2>

                <div className="work-tag-container">

                    <div className="work-container" style={tags.includes("work") ?
                        { backgroundColor: "#f5f7f7", borderRadius: "0.8em" } : {}}>

                        <input type="checkbox" id="work-checkbox" className="tag-input"

                            onChange={() => tagsArray("work")}
                            checked={tags.includes("work")}


                        />
                        <label htmlFor="work-checkbox">


                            <div className="work-circle-tag circle-tag"></div>
                            <p className="work-tag-name">work</p>
                        </label>

                    </div>

                    <div className="study-container" style={tags.includes("study") ? {
                        backgroundColor: "#f5f7f7", borderRadius: "0.8em"
                    } : {}}>

                        <input type="checkbox" id="study-checkbox" className="tag-input"
                            onChange={() => tagsArray("study")}
                            checked={tags.includes("study")}

                        />
                        <label htmlFor="study-checkbox" style={tags.includes("study") ? {
                            backgroundColor: "#f5f7f7", borderRadius: "0.8em"
                        } : {}}>
                            <div className="study-circle-tag circle-tag"></div>
                            <p className="study-tag-name">study</p>
                        </label>

                    </div>

                    <div className="entertainment-container" style={tags.includes("entertainment") ? {
                        backgroundColor: "#f5f7f7", borderRadius: "0.8em"
                    } : {}}>

                        <input type="checkbox" id="entertainment-checkbox" className="tag-input"

                            onChange={() => tagsArray("entertainment")}
                            checked={tags.includes("entertainment")}
                        />
                        <label htmlFor="entertainment-checkbox">
                            <div className="entertainment-circle-tag circle-tag"></div>
                            <p className="entertainment-tag-name">entertainment</p>
                        </label>

                    </div>

                    <div className="family-container" style={tags.includes("family") ? {
                        backgroundColor: "#f5f7f7", borderRadius: "0.8em"
                    } : {}}>

                        <input type="checkbox" id="family-checkbox" className="tag-input"

                            onChange={() => tagsArray("family")}
                            checked={tags.includes("family")}
                        />
                        <label htmlFor="family-checkbox">
                            <div className="family-circle-tag circle-tag"></div>
                            <p className="family-tag-name" >family</p>
                        </label>

                    </div>

                </div>

            </div>


        </div>
    );
}

export default AddTask;
