import {Box, Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import {useState} from "react";

function Thread (props){
    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.desc);
    const [author, setAuthor] = useState(props.author);
    const [date, setDate] = useState(props.date);
    //const [comments, setComments] = useState(props.comments)

    return (
        <div>
            <Box p={1}>
                <Card elevation={3}>
                    <CardHeader
                        title={title}
                        subheader={author + ", " + date}
                    />
                    <CardContent>
                        <Typography>{desc}</Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}
export default Thread;