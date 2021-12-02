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
import {grey} from "@material-ui/core/colors";
import NewDay from "../NewDay";


function Sidebar (props){
    let { course } = useParams();
    const { history } = props;



    if (props.store.state === "error") {
        return (
            <div style={{width: "100%"}}>
                <h1 style={{ color: "white", textAlign: 'center' }}>owh njow shomwthing whent wrong uwu</h1>
            </div>
        )
    }

    if (props.store.state === "empty") {
        if(course) {
            props.store.changeStore(course);
        }
    }

    if (props.store.state === "pending") {
        return (
            <div style={{width: "100%"}}>
                <h1 style={{ color: "white", textAlign: 'center' }}>loading</h1>
            </div>
        )
    }

    if (props.store.state === "done") {
        const tabs = props.store.course.tabs;

    const buttons = [];

    const onClickHandler = event =>  {
        history.push(`/courses/${course}/${event}`);
        console.log(JSON.stringify(tabs[event].threads));
    }

    Object.keys(tabs).forEach((element) => {
        buttons.push(
                <Button onClick= {() => {onClickHandler(element)}}
                        variant={'outlined'}
                        fullWidth={true}
                        style={{width: "100%", marginBottom:"5px", justifyContent: "flex-start", color: "white"}}
                        color={"primary"}
                >{element}</Button>
        )
    });

  return (
        <div style = {{/*background:'#2b2f38',*/ width : '100%', height: '100%', alignItems: "center", display: "flex", flexDirection: "column"}} id={"sidebarContainer"}>
            <NewQuestion store = {props.store}/>
            <Box sx={{display : 'flex',
                flexDirection : 'column',
                flexGrow : 1,
                justifyContent : 'flex-start',
                alignItems : 'center',
                height: "100%",
                width: "100%",
                px:1,
            }}>
                {buttons}
                <NewDay store={props.store} />
            </Box>
        </div>
    )
    }
    
}

export default withRouter(observer(Sidebar));