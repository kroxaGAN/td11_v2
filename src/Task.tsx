import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type taskPropsType={
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    t: TaskType
}

export const Task = memo(({t, ...props}:taskPropsType)=>{
    console.log(`Task ${t.title}`)
    const onClickHandler = () => props.removeTask(t.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(t.id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
        props.changeTaskTitle(t.id, newValue);
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
