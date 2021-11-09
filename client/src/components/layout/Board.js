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
    const store = props.store;
    const todoCards = [];
    let { course, day } = useParams();
    console.log("hej" + course + " " + day);
    const tabs = props.store.course.tabs

    const threads = tabs[day].threads;

    threads.forEach((element) => {
        todoCards.push(
            <Thread
                title={element.title}
                desc={element.desc}
                author={element.author}
                date={element.date}
            />
        );
    });

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
                    {todoCards}
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
                    {todoCards}
                    {todoCards}
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
                    {todoCards}
                </Box>
            </Box>
        </div>
    );
}
export default observer(Board);
