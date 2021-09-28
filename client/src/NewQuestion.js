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
import {Component} from "react";


class NewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
        }

        this.handleClickOpen = () => {
            this.setState({open: true})
        };

        this.handleClose = () => {
            this.setState({open: false})
            //TODO: handle cancel button
        };
        this.handlePost = () =>{
            this.setState({open: false})
            //TODO: handle post button
        }
    }

    render() {
        return (
            <div>
                <Button style={{color: "white",
                    background:"#3373ff",
                    padding:15,
                    margin:15}}
                        onClick={this.handleClickOpen}>
                    Ask a new Question
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth>
                    <DialogTitle>New question</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your question might have been answered already.<br/>
                            Remember to check board before asking.
                        </DialogContentText>
                        <TextField
                            id="TitleInput"
                            label="Title"

                            fullWidth
                            //value={} holder værdi
                            /*onChange={} TODO: handleChange metode*/
                        />
                        <TextField
                            id="DescriptionInput"
                            label="Description"
                            multiline
                            maxRows={5}
                            fullWidth
                            //value={} holder værdi
                            /*onChange={} TODO: handleChange metode*/
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handlePost}>Post</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default NewQuestion;