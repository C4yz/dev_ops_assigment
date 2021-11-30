import {Component, useState} from "react";
import Button from '@mui/material/Button';
import {Box, Grid, Typography} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";

function Topbar(props){
    const [currentBoard,setCurrentBoard] = useState("No board selected");
    const { history, store } = props;

    const list = [
        
    ];

    store.courseNames.forEach(element => {
        list.push(element.name);
    });


    const onClickHandler = event =>  {
        store.changeStore(event);
        history.push(`/courses/${event}/Day 1`);
        

    };

    
    const color = [
        "#463147",
        "#314147",
        "#31473a",
        "#404731",
        "#473b31",
        "#473131",
    ]
    //create grid items (buttons)
    const buttons = [];



    for (let i = 0; i < list.length; i++) {
        buttons.push(
            <Button onClick= {() => {onClickHandler(list[i])}} style={{background: color[i%color.length]}} variant={'contained'}>
                {list[i]}
            </Button>
        )
    }

    return  (
        <div className="Topbar" >
            <div style={{background: "#2b2f38",  width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection : 'row', p:1}}>
                    <Box sx={{ display: 'flex', //make flexbox (stuff works...)
                        p: 0, //padding
                        flexGrow: 1, //grow box to fill space
                        flexDirection : 'row',
                        justifyContent : 'flex-start'// gravity left
                    }}>
                        {buttons}
                    </Box>
                    <Box style={{ background: "#7a3131", borderRadius: 20}} sx={{ p:1 }}>
                        <Button style={{ color: 'white'}}>{localStorage.getItem("studentid")}</Button>
                        <Typography  style={{ fontSize: 'small', color: 'white', textAlign: 'center'}}>Log Out</Typography>
                    </Box>
                </Box>
            </div>
        </div>
    )
}
export default withRouter(Topbar);
/*
class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBoard: "No board selected",
            username: "s195471"
        }
    }

    render() {
        //hardcoded list of
        const list = [
            "DevOps",
            "Innovation Pilot",
            "CDIO",
            "Algoritmer og datastrukturer",
        ];
        const color = [
            "#463147",
            "#314147",
            "#31473a",
            "#404731",
            "#473b31",
            "#473131",
        ]
        //create grid items (buttons)
        const buttons = [];
        for (let i = 0; i < list.length; i++) {
            buttons.push(
                <Button style={{background: color[i]}}variant={'contained'} onClick={() => {this.setState({currentBoard : list[i]})}}>
                    {list[i]}
                </Button>
                )
        }
        return (
            <div className="Topbar" >
                <div style={{background: "#2b2f38", padding: 3,  width: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection : 'row'}}>
                        <Box sx={{ display: 'flex', //make flexbox (stuff works...)
                            p: 0, //padding = 1
                            flexGrow: 1, //grow box to fill space
                            flexDirection : 'row',
                            justifyContent : 'flex-start'// gravity left
                            }}>
                            {buttons}
                        </Box>
                        <Box style={{ background: "#7a3131", borderRadius: 20}} sx={{  p: 1 }}>
                            <Button style={{ color: 'white'}}>{this.state.username}</Button>
                            <Typography  style={{ fontSize: 'small', color: 'white'}}>Log Out</Typography>
                        </Box>
                    </Box>
                </div>
                {/!*<h1 style={{color: 'white'}}>{this.state.currentBoard}</h1>*!/}
            </div>
        )
    }

export default Topbar;
}*/

