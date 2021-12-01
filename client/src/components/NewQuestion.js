import * as React from 'react';
import BoardStore from "../stores/BoardStore";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {Component, useState} from "react";
import {useParams} from "react-router-dom";

function NewQuestion (props){

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const store = props.store;
    let { course, day } = useParams();

    const handleClickOpen = e => {
        setOpen(true);
    };
    const handleClose = e => {
        setOpen(false);
    };

    const handlePost = e =>{
        setOpen(false);
        /*const question = {
            title: title,
            desc: desc,
            author: "DummyUser"
        }
        console.log(store.content);
        store.content.push(question);*/
        console.log("handlepost called:")
        store.addQuestion(day, title, desc, localStorage.getItem("studentid"));
    };

    return (
        <div>
            <Button style={{color: "white",
                background:"#3373ff",
                padding:15,
                margin:15}}
                    onClick={handleClickOpen}>
                Ask a new Question
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>New question</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your question might have been answered already.<br/>
                        Remember to check board before asking.
                    </DialogContentText>
                    <form noValidate autoComplete="off" onSubmit={handlePost} >
                        <TextField
                            id="TitleInput"
                            label="Title"
                            fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            id="DescriptionInput"
                            label="Description"
                            multiline
                            maxRows={5}
                            fullWidth
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <Button onClick={handleClose} id="cancelButton" >Cancel</Button>
                        <Button onClick={handlePost} id="postButton" >Post</Button>

                    </form>

                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </div>
    );
}
export default NewQuestion;