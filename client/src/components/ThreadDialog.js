import {
    Box, Button,
    Card,
    CardContent,
    CardHeader, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, TextField,
    Typography
} from "@material-ui/core";
import * as React from "react";
import Thread from "./Thread";

function ThreadDialog (props){

    const handleClickOpen = e => {
        setOpen(true);
    };
    const handleClose = e => {
        setOpen(false);
    }

    const handlePost = e =>{
        setOpen(false);
        /*const question = {
            title: title,
            desc: desc,
            author: "DummyUser"
        }
        console.log(store.content);
        store.content.push(question);*/
        //TODO: handlePost proper
        console.log("handlepost called:")
        store.addQuestion(day, title, desc, "DummyUser")
    }

    const comments = [];
    comments.forEach((element) => {
        todoCards.push(
            <Thread
                title={element.title}
                desc={element.desc}
                author={element.username}
                date={element.date}
                cardid={element.cardid}
                status={element.status}
            />
        );
    });

    return (
        <Dialog open={true} onClose={handleClose} fullWidth>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.desc}
                    <br/>
                    {props.comments}
                </DialogContentText>
                <form noValidate autoComplete="off" onSubmit={handlePost} >
                    <TextField
                        id="DescriptionInput"
                        label="Description"
                        multiline
                        maxRows={5}
                        fullWidth
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handlePost}>Post</Button>

                </form>

            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    );
}
export default ThreadDialog;