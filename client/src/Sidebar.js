import {Component} from "react";
import * as React from "react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    TextField
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { borders } from '@mui/system';
import NewQuestion from "./NewQuestion";

function Sidebar(props){
    const list = [
        "Dag 1",
        "Dag 2",
        "Aflevering 1",
        "Eksamen",
        "Hygge",
    ];
    const buttons = [];
    const color = [
        "#463147",
        "#314147",
        "#31473a",
        "#404731",
        "#473b31",
        "#473131",
    ]
    for (let i = 0; i < list.length; i++) {
        buttons.push(
            <Box sx={{p: 0.2 , width : '100%'}}>
                <Button variant={'contained'}
                        fullWidth={true}
                        style={{justifyContent: "flex-start", background: color[i]}}>{list[i]}</Button>
            </Box>
        )
    }
    return (
        <div style = {{background:'#2b2f38', width : '100%', height: '100%', padding:5}}>
            <NewQuestion store = {props.store}/>
            <Box  sx={{display : 'flex',
                flexDirection : 'column',
                flexGrow : 1,
                justifyContent : 'flex-start',
                alignItems : 'flex-start',
                p:1,
                borderColor: 'text.primary'}}>
                {buttons}
            </Box>
        </div>
    )
}

export default Sidebar;