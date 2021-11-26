import {Box, Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import React, {useState} from "react";
import ThreadDialog from "./ThreadDialog";

function Thread (props){
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState();
    const handleClick = e => {
        //TODO: fix buggy clicking... acting super weird
        console.log("thread handleclick with open: " + open);
        if(open){
            console.log("setting open to false");
            setOpen(false);
            setDialog(<div></div>);
        }
        else {
            console.log("setting open to true");
            setOpen(true);
            setDialog(<ThreadDialog props={props} handleClose={handleClick}/>);
        }
    };

    return (
        <div style={{width: '100%'}} >
            {dialog}
            <Box m={1} onClick={handleClick}>
                <Card elevation={3}>
                    <CardHeader
                        title={props.title}
                        subheader={props.username + ", " + props.date}
                    />
                    <CardContent>
                        <Typography variant={"body1"}>{props.desc}</Typography>
                        <Typography variant={"body2"}><br/>There are {props.comments.length
                        } comments</Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}
export default Thread;