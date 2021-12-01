import {
    Box, Button,
    Card,
    CardContent,
    CardHeader, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, TextField,
    Typography
} from "@material-ui/core";
import * as React from "react";
import Thread from "./Thread";
import {useState} from "react";
import BoardStore from "../stores/BoardStore";
import {Close} from '@material-ui/icons';

function ThreadDialog (props){
    const [open, setOpen] = useState(true);
    const [newComment, setNewComment] = useState("");

    const handleClose = e => {
        console.log("threaddialog handleclose");
        props.handleClose();
        setOpen(false);
    };

    const handlePost = e =>{
        if(newComment == ""){
            console.log("NO TEXT IN NEW COMMENT")
        }
        else{
            console.log("dialog posting comment")
            props.props.store.addComment(newComment, localStorage.getItem("studentid"), props.props.cardid, props.props.status);
            setOpen(false);
        }
    };

    const handleMoveToFinish = e =>{
        console.log("we are in the handlemovetofinish!")
        props.props.store.moveCardToFinish(props.props.cardid, 3);
    };

    const moveToFinishedButton = () => {
        if(props.props.status === 2){
            return <Button onClick={handleMoveToFinish}>Move to finished questions</Button>
        }
        return <div></div>;
    };

    const postCommentButton = () => {
        if(props.props.status !== 3){
            return <Button onClick={handlePost}>Post New Comment</Button>
        }
        return <div></div>;
    };
    const newCommentTextField = () =>{
        if(props.props.status !== 3){
            return <TextField
                id="commentInput"
                label="New comment"
                multiline
                maxRows={5}
                fullWidth
                style={{width:"95%", alignSelf: "center"}}
                onChange={(e) => setNewComment(e.target.value)}
            />
        }
        return <div></div>;
    }

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
                    {props.props.comments.map((tempComment) => (
                        <Box borderBottom={1} borderColor="primary.second">
                            <Typography variant={"body1"} color={"textPrimary"}>{tempComment.username}</Typography>
                            <Typography variant={"caption"}>{tempComment.date.substring(0,10)}</Typography>
                            <Typography variant={"body1"}>{tempComment.comment}</Typography>
                        </Box>
                    ))}
                </DialogContentText>
            </DialogContent>
            {newCommentTextField() /*editable comment field if not finished thread*/}
            <DialogActions>
                {moveToFinishedButton()/*movetofinish button if not finished thread*/}
                <Button onClick={handleClose}>Close</Button>
                {postCommentButton()/*post comment button if not finished thread*/}
            </DialogActions>
        </Dialog>
    );
}
export default ThreadDialog;