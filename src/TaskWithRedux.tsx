import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type taskPropsType={
    t: TaskType
    todolistId:string
}

export const TaskWithRedux = memo(({t, ...props}:taskPropsType)=>{
    console.log(`Task ${t.title}`)
    let dispatch=useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(t.id,props.todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(t.id,newIsDoneValue,props.todolistId))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(t.id,newValue,props.todolistId))
    }
    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
        <Checkbox
            checked={t.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={t.title} onChange={onTitleChangeHandler} source={`Task ${t.title}`}/>
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
