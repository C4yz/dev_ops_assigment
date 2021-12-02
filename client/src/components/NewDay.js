import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {useState} from "react";

function NewDay (props){

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const handleClickOpen = e => {
        setOpen(true);
    };

    const handleClose = e => {
        setOpen(false);
    };

    const handlePost = e =>{
        setOpen(false);
        console.log("handlepost called:")
        props.store.addDay(name);
    };

    const addDayButton = () => {
        if(localStorage.getItem("role")==="admin") {
            return <Button onClick={handleClickOpen}
                           variant={'contained'}
                           style={{borderRadius: 20, margin: "5px", justifyContent: "center", color: "white"}}
                           color={"primary"}
                    >Add tab</Button>
        }
        return <div></div>
    }
    return (
        <div>
            {addDayButton()}
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add a tab</DialogTitle>
                <DialogContent>
                        <TextField
                            id="DayNameInput"
                            label="New tab name"
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} id="cancelButton" >Cancel</Button>
                    <Button onClick={handlePost} id="postButton" >Post</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default NewDay;