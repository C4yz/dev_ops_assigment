import {Component} from "react";
import {Box, Card, CardContent, CardHeader, Grid, IconButton, Typography} from "@material-ui/core";

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            desc: this.props.desc,
            author: this.props.author,
            date: this.props.date,
            comments: this.props.comments,
        }
    }
    render() {
        return (
            <div>
                <Box p={1}>
                <Card elevation={3}>
                    <CardHeader
                        title={this.state.title}
                        subheader={this.state.author + ', ' + this.state.date}/>
                    <CardContent>
                        <Typography>
                            {this.state.desc}
                        </Typography>
                    </CardContent>
                </Card>
                </Box>
            </div>
        )
    }
}

class Board extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'notitle',
            todo: null,
            ongoing: null,
            done: null,
        }
    }
    render() {


        const todoCards = [];

        todoCards.push(<Thread title={"titel"} desc={"beskrivelse"} author={"Jacob Berg Eriksen"} date={ "dags dato"} />);
        todoCards.push(<Thread title={"titel2"} desc={"beskrivelse2"} author={"nanv2"} date={ "i morgen"} />);
        todoCards.push(<Thread title={"titel2"} desc={"beskrivelse2"} author={"nanv2"} date={ "i morgen"} />);

        console.log(todoCards[0]);
        return (
            <div style={{width: '100%'}}>
                <h1 style={{color: 'white'}}>{this.state.title}</h1>

                <Box sx={{width: '100%', display:'flex', flexGrow: 1, flexDirection: 'row'}}>
                    <Box sx={{background: "#30656d", borderRadius: 20, m:1, width:'33%' , display: 'flex', flexDirection: 'column'}}>
                        <h2 style={{color: 'white'}}>No answers yet</h2>
                        {todoCards}
                    </Box>
                    <Box sx={{background: "#c7c700", borderRadius: 20, m:1,width: '33%', display: 'flex', flexDirection: 'column'}}>
                        <h2 style={{color: 'white'}}>Discussing</h2>
                        {todoCards}
                        {todoCards}
                    </Box>
                    <Box sx={{background: "#4b893c", borderRadius: 20, m:1, width: '33%', display: 'flex', flexDirection: 'column'}}>
                        <h2 style={{color: 'white'}}>Finished answer</h2>
                        {todoCards}
                    </Box>
                </Box>
            </div>
        )
    }

}
export default Board;