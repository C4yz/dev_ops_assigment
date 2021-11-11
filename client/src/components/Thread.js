import {Box, Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import {useState} from "react";

function Thread (props){
    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.desc);
    const [author, setAuthor] = useState(props.author);
    const [date, setDate] = useState(props.date);

    return (
        <div style={{width: '100%'}}>
            <Box m={1}>
                <Card elevation={3}>
                    <CardHeader
                        title={title}
                        subheader={author + ", " + date}
                    />
                    <CardContent>
                        <Typography variant={"body1"}>{props.desc}</Typography>
                        <Typography variant={"body2"}><br/>There are {props.comments.length} comments</Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}
export default Thread;