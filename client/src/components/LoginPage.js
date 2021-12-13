import {Component, useState} from "react";
import Button from '@mui/material/Button';
import {Box, Grid, Typography} from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";

function LoginPage(props){
    const { history } = props;
    const onClickHandler = event =>  {
        window.location.href = "http://130.225.170.203/api/login";
    };

    return  (
        <div className="LoginPage" style={{display: "flex", flexDirection: "column", justifyContent : "center", alignItems :'center', height : "100vh"}} id="container">
            <Typography variant={"h1"} style={{color: "red"}}>WELCOME EXAM</Typography>

            <Button style={{alignItems : "center", background: "white"}} onClick={(e) => onClickHandler(e)} >Click here to login</Button>
        </div>
    )
}
export default withRouter(LoginPage);


