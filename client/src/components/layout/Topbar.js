import {Component, useState} from "react";
import Button from '@mui/material/Button';
import {Box, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";

function Topbar(props){
    const { history, store } = props;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        console.log("value: " + newValue);
        setValue(newValue);
        store.changeStore(store.courseNames[newValue].name);
        history.push(`/courses/${store.courseNames[newValue].name}/Day 1`);
    };

    return  (

            <Box style={{background: "#2b2f38",width:"100%",maxWidth:"100%"}} sx={{display: 'flex', flexDirection : 'row', justifyContent: "space-between", p:0}}id="topbarContainer">
                <Box style={{maxWidth:"90%"}} sx={{ color: "white", display:"flex", alignContent: "flex-end", alignItems:"flex-end"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons={true}
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                    >
                        {store.courseNames.map((element) => (<Tab label={element.name}/>))}
                    </Tabs>
                </Box>
                <Box style={{background: "#7a3131", borderRadius: 20}} sx={{ alignContent: "center", display: "flex", flexDirection:"column" }}>
                    <Button style={{ color: 'white'}}>{localStorage.getItem("studentid")}</Button>
                    <Button style={{color: "white", fontSize:"x-small"}}>Log Out</Button>
                </Box>
            </Box>

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

