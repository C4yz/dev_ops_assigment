import {Component} from "react";
import * as React from "react";
import {
    Box,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { borders } from '@mui/system';
import NewQuestion from "../NewQuestion";
import {observer, useObserver } from 'mobx-react-lite';
import {useParams, withRouter } from "react-router-dom";


function Sidebar (props){
    let { course } = useParams();
    const { history } = props;
    const store = props.store;
    const tabs = store.course.tabs;

    const buttons = [];
    const color = [
        "#463147",
        "#314147",
        "#31473a",
        "#404731",
        "#473b31",
        "#473131",
    ]

    const onClickHandler = event =>  {
        history.push(`/courses/${course}/${event}`);
        console.log(JSON.stringify(tabs[event].threads));
    }

    Object.keys(tabs).forEach((element) => {
        buttons.push(
            <Box sx={{p: 0.2 , width : '100%'}}>
                <Button onClick= {() => {onClickHandler(element)}}
                        variant={'contained'}
                        fullWidth={true}
                        style={{justifyContent: "flex-start"}}>{element}</Button>
            </Box>
        )
    })
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

export default withRouter(observer(Sidebar));