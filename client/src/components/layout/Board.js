import {Component, useState} from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import BoardStore from "../../stores/BoardStore";
import {observer, useObserver } from 'mobx-react-lite';
import Thread from "../Thread";
import { useParams } from "react-router-dom";



function Board(props){
    const todoCards1 = [];
    const todoCards2 = [];
    const todoCards3 = [];
    let { course, day } = useParams();
    const tabs = props.store.course.tabs

    const threads = tabs[day].threads;
    console.log("title " + props.store.course.title);

    console.log("jbe" + threads);

    for (const element of threads) {
        if(element.status == 1){
            todoCards1.push(
                <Thread
                    title={element.title}
                    desc={element.desc}
                    username={element.username}
                    date={element.date}
                    cardid={element.cardid}
                    status={element.status}
                    comments={element.comments}
                    store={props.store}
                />
            );
        }
        else if(element.status == 2){
            todoCards2.push(
                <Thread
                    title={element.title}
                    desc={element.desc}
                    username={element.username}
                    date={element.date}
                    cardid={element.cardid}
                    status={element.status}
                    comments={element.comments}
                    store={props.store}
                />
            );
        }
        else if(element.status == 3){
            todoCards3.push(
                <Thread
                    title={element.title}
                    desc={element.desc}
                    username={element.username}
                    date={element.date}
                    cardid={element.cardid}
                    status={element.status}
                    comments={element.comments}
                    store={props.store}
                />
            );
        }

    }

    return (
        <div style={{ width: "100%" }}>
            <h1 style={{ color: "white", textAlign: 'center' }}>{course} {day}</h1>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "row",
                }}
            >
                <Box
                    sx={{
                        background: "#30656d",
                        borderRadius: 20,
                        m: 1,
                        width: "33%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2 style={{ color: "white" }}>No answers yet</h2>
                    {todoCards1}
                </Box>
                <Box
                    sx={{
                        background: "#c7c700",
                        borderRadius: 20,
                        m: 1,
                        width: "33%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2 style={{ color: "white" }}>Discussing</h2>
                    {todoCards2}
                </Box>
                <Box
                    sx={{
                        background: "#4b893c",
                        borderRadius: 20,
                        m: 1,
                        width: "33%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2 style={{ color: "white" }}>Finished answer</h2>
                    {todoCards3}
                </Box>
            </Box>
        </div>
    );
}
export default observer(Board);
