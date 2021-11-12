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
import {useState} from "react";
import BoardStore from "../stores/BoardStore";

function ThreadDialog (props){
    const [open, setOpen] = useState(true);
    const [newComment, setNewComment] = useState("");

    const handleClose = e => {
        console.log("threaddialog handleclose");
        props.handleClose();
        setOpen(false);
    };

    const handlePost = e =>{
        console.log("dialog posting comment")
        props.props.store.addComment(newComment, "commentUser", props.props.cardid, props.props.status);
        setOpen(false);
    };

    const comments = [];

    props.props.comments.forEach((tempComment) => {
        comments.push(<Box
                borderBottom={1}
                borderColor="primary.second"
            >
                <Typography variant={"h5"}>{tempComment.username}</Typography>
                <Typography variant={"caption"}>{tempComment.date}</Typography>
                <Typography variant={"body1"}>{tempComment.comment}</Typography>
            </Box>

        );
    });

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            {/*Question*/}
            <DialogTitle>
                <Typography variant={"h4"}>{props.props.title}</Typography>
                <Typography variant={"body1"}>By {props.props.username}</Typography>
                <br/>
                <Typography variant={"h6"}>{props.props.desc}</Typography>
            </DialogTitle>
            {/*commentsection*/}
            <DialogContent dividers={true}>
                <DialogContentText>
                    {comments}
                </DialogContentText>
                <TextField
                    id="commentInput"
                    label="New comment"
                    multiline
                    maxRows={5}
                    fullWidth
                    onChange={(e) => setNewComment(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handlePost}>Post New Comment</Button>
            </DialogActions>
        </Dialog>
    );
}
export default ThreadDialog;