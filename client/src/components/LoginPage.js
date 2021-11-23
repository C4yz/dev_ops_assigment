import {Component, useState} from "react";
import Button from '@mui/material/Button';
import {Box, Grid, Typography} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";

function LoginPage(props){
    const { history } = props;
    const onClickHandler = event =>  {
        history.push(`/courses/DevOps/Day 1`);
    };

    return  (
        <div className="LoginPage" style={{display: "flex", flexDirection: "column", justifyContent : "center", alignItems :'center', height : "100vh"}}>
            <Typography variant={"h1"} style={{color: "white"}}>WELCOME</Typography>

            <Button style={{alignItems : "center", background: "white"}} onClick={(e) => onClickHandler(e)} >Click here to login</Button>
        </div>
    )
}
export default withRouter(LoginPage);


