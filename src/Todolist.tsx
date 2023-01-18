import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    source?:string
}

export const Todolist=memo((props: PropsType)=> {
    console.log(`Todolist ${props.source} ${props.title}`)
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    },[props.addTask,props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle =useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[props.changeTodolistTitle,props.id])

    const onAllClickHandler =useCallback(() => props.changeFilter("all", props.id),[props.id,props.changeFilter])
    const onActiveClickHandler =useCallback(() => props.changeFilter("active", props.id),[props.id,props.changeFilter])
    const onCompletedClickHandler =useCallback(() => props.changeFilter("completed", props.id),[props.id,props.changeFilter])

    let tasks = props.tasks
    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }
    const removeTaskHandler=useCallback((taskId: string)=>{
        props.removeTask(taskId,props.id)
    },[props.removeTask,props.id])
    const changeTaskStatusHandler=useCallback((taskId: string, isDone: boolean)=>{
        props.changeTaskStatus(taskId,isDone,props.id)
    },[props.id,props.changeTaskStatus])
    const changeTaskTitleHandler=useCallback((taskId:string,newTitle:string)=>{
        props.changeTaskTitle(taskId,newTitle,props.id)
    },[props.id,props.changeTaskTitle])

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} source={`Todolist ${props.title}`}/>
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} source={"Todolist"}/>
        <div>
            {
                tasks.map(t => {
                    return <TaskWithRedux
                        key={t.id}
                        t={t}
                        todolistId={props.id}
                    />
                })
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <ButtonWithMemo title={"All"} callback={onAllClickHandler} variant={props.filter === 'all' ? 'outlined' : 'text'} color={'inherit'}/>
            <ButtonWithMemo title={"Active"} callback={onActiveClickHandler} variant={props.filter === 'active' ? 'outlined' : 'text'} color={'primary'}/>
            <ButtonWithMemo title={"Completed"} callback={onCompletedClickHandler} variant={props.filter === 'completed' ? 'outlined' : 'text'} color={'secondary'}/>

        </div>
    </div>
})

type ButtonWithMemo={
    title:string
    callback:()=>void
    variant:'text' | 'outlined' | 'contained'
    color:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

const ButtonWithMemo=memo((props:ButtonWithMemo)=>{
    console.log(`ButtonWithMemo ${props.title}`)
    return <Button variant={props.variant}
                   onClick={props.callback}
                   color={props.color}
    >{props.title}
    </Button>
})


