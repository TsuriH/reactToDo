import Filter from "../Filter/Filter";
import Header from "../Header/Header";
import Image from "../../../Images/girlDone.png"
import "./Layout.css";
import AddTask from "../../TasksArea/AddTask/AddTask";
import { useEffect, useState } from "react";
import TaskCard from "../../TasksArea/TaskCard/TaskCard";
import TaskType from "../../../Models/TaskType";


interface ITask {
    id: number;
    name: string;
    description: string;
    tags: string[];
}

function Layout(): JSX.Element {

    const [taskArray, setTaskArray] = useState<TaskType[]>([])

    const [isAddTaskVisible, setIsAddTaskVisible] = useState(false)

    const [taskId, setTaskId] = useState(1)

    const [taskMenuOpenedId, setTaskMenuOpenedId] = useState<number>()

    const initialDataFromLocalStorage = bringTasksLs()

    const [isItEditMode, setIsItEditMode] = useState(false)

    const [taskToEdit, setTaskToEdit] = useState<TaskType>()

    function closeTaskActionsMenu() {
        setTaskMenuOpenedId(undefined)
    }

    //sending the add task generator the details of the task to be edited
    function openAddNewTaskInEditMode(taskId: number) {
        
        setIsAddTaskVisible(true)

        setIsItEditMode(() => true)

        const currentArrayState = [...taskArray]

        const taskToEdit = currentArrayState[currentArrayState.findIndex(task => task.id === taskId)]
        
        populateTasksArray(taskToEdit)
        
        setTaskToEdit(taskToEdit)


    }

    function openSingleTaskActionsMenu(id: number) {

        setTaskMenuOpenedId((prevId) => (prevId === id ? undefined : id))
    }

    useEffect(() => {

        // rendering for the first time? bring all the tasks that are on the local storage.
        if (taskArray.length === 0) {

            setTaskArray(initialDataFromLocalStorage)

        }

        //if this is the first task set the id for 1, else, go to the last task get its id and add to it 1
        if (initialDataFromLocalStorage.length === 0) {
            setTaskId(1)
        }
        else {

            const currentTasksArray = bringTasksLs()
            const lastTask = currentTasksArray[currentTasksArray.length - 1]
            setTaskId(lastTask.id + 1)
        }


    }, [])

    // open/close plusBtn addTaskForm
    const toggleAddTask = () => {
        setIsAddTaskVisible(!isAddTaskVisible)
    }

    // cancel button addTaskForm
    const closeAddTask = () => {
        setIsAddTaskVisible(false)
        setIsItEditMode(false)
    }

    //Add new task
    function populateTasksArray(task: TaskType) {
        
        const newTask = {
            id: taskId,
            name: task.name,
            description: task.description,
            tags: task.tags
        }

        if (isItEditMode) {
              
            newTask.id = task.id
            const updatedTasksArray = [...taskArray]
            const taskToEditIndex = updatedTasksArray.findIndex(task => task.id === newTask.id)
            console.log(taskToEditIndex)
            updatedTasksArray[taskToEditIndex] = newTask
            console.log(updatedTasksArray);
            
            setTaskArray(updatedTasksArray)
            setIsItEditMode( () => false)
            // setTaskToEdit(undefined)
        }

        else {
            setTaskArray((prevTasks) => {
                return [...prevTasks, newTask]
                
            })
            setTaskId((prevId) => prevId + 1)
        }
        
       

        // updateTasksLs(newTask)
        updateTasksLs()
        setIsAddTaskVisible(!isAddTaskVisible)


    }


    //bring tasks from local storage
    function bringTasksLs() {

        let currentTasksArray = JSON.parse(localStorage.getItem("tasks"))
        if (currentTasksArray === null) {
            currentTasksArray = []
        }

        return currentTasksArray
    }

    // function updateTasksLs(task: ITask) {
    //     const currentTasksArray = bringTasksLs()
    //     currentTasksArray.push(task)
    //     localStorage.setItem("tasks", JSON.stringify(currentTasksArray))

    // }
    useEffect(() => {

        updateTasksLs()

    },[taskArray])


    function updateTasksLs() {
        // const currentTasksArray = bringTasksLs()
        // currentTasksArray.push(task)
        localStorage.setItem("tasks", JSON.stringify(taskArray))

    }

    function deleteTask(taskId: number) {

        // get all the local storage task

        const currentTasksArrayLs = bringTasksLs()

        // remove the task with this id

        const newArray = currentTasksArrayLs.filter((task: TaskType) => task.id !== taskId)

        // update the local storage with the new task

        localStorage.setItem("tasks", JSON.stringify(newArray))
        
        const lastTaskId = newArray[newArray.length - 1].id

        setTaskId(() => lastTaskId + 1)
        
       

        setTaskArray(newArray)

    }

   
    


  

    return (
        <div className="Layout">

            <header>

                <Header onToggleAddTask={toggleAddTask} />

            </header>

            <nav>

                <div className="filters-container" >

                    <Filter name={"work"} color={"#D2CEFF"} />
                    <Filter name={"study"} color={'#D1E5F7'} />
                    <Filter name={"entertainment"} color={'#FFCECE'} />
                    <Filter name={"family"} color={'#DAF2D6'} />

                    <div className="hide-done-btn">
                        <input type="checkbox" />
                        <p>Hide Done Task </p>
                    </div>

                </div>

                <div className="image-girl-container">
                    <img src={Image} />
                </div>

            </nav>

            <main>
                {isAddTaskVisible && <AddTask
                    populateTasksArray={populateTasksArray}
                    orderCloseAddTask={() => closeAddTask()}
                    isItEditMode={isItEditMode}
                    taskToEdit={taskToEdit}

                />}

                {taskArray && taskArray.map((task, index) => <TaskCard

                    key={index}
                    id={task.id}
                    name={task.name}
                    description={task.description}
                    tags={task.tags}
                    delete={(taskId: number) => deleteTask(taskId)}
                    isTaskMenuOpen={taskMenuOpenedId === task.id}
                    openSingleTaskActionsMenu={(taskId: number) => openSingleTaskActionsMenu(taskId)}
                    closeTaskActionsMenu={closeTaskActionsMenu}
                    openAddNewTaskInEditMode={(taskId: number) => openAddNewTaskInEditMode(taskId)}
                />)}



            </main>

        </div>
    );
}

export default Layout;
