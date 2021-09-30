import * as React from 'react';
import BoardStore from "./stores/BoardStore";
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
            title: '',
            desc: '',
            store: this.props.store,
        }

        this.handleClickOpen = () => {
            this.setState({open: true})
        };

        this.handleClose = () => {
            this.setState({open: false})
            //TODO: handle cancel button
        };
        this.handlePost = (event) =>{
            this.setState({open: false})
            console.log(this.state.title);
            const question = {
                title: this.state.title,
                desc: this.state.desc,
                author: "Daniel Styrbæk",
                date: "Lige fucking nu" 
            }
            this.state.store.content.push(question);
            

            
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
                        <form noValidate autoComplete="off" onSubmit={this.handlePost} >
                        <TextField
                            id="TitleInput"
                            label="Title"
                            fullWidth
                            onChange={(e) => this.state.title = e.target.value}
                        />
                        <TextField
                            id="DescriptionInput"
                            label="Description"
                            multiline
                            maxRows={5}
                            fullWidth
                            onChange={(e) => this.state.title = e.target.value}
                        />
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handlePost}>Post</Button>

                    </form>

                    </DialogContent>
                    <DialogActions>
                        
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default NewQuestion;