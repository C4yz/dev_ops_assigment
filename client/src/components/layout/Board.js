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
    let { course, day } = useParams();

    if (props.store.state == "error") {
        return (
            <div style={{width: "100%"}}>
                <h1 style={{ color: "white", textAlign: 'center' }}>owh njow shomwthing whent wrong uwu</h1>
            </div>
        )
    }

    if (props.store.state == "empty") {
        if(course){
            props.store.changeStore(course);
        }
        return (
            <div style={{width: "100%"}}>
                <h1 style={{ color: "white", textAlign: 'center' }}>loading</h1>
            </div>
        )
    } else if (props.store.state == "pending") {
        return (
            <div style={{width: "100%"}}>
                <h1 style={{ color: "white", textAlign: 'center' }}>loading</h1>
            </div>
        )
    } else if (props.store.state == "done") {
    
    const tabs = props.store.course.tabs
    const threads = tabs[day].threads;

    return (
        <div style={{ width: "100%" }} id="boardContainer">
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
                    border={10}
                    borderColor={'#30656d'}
                    sx={{
                        background: "",
                        borderRadius: 20,
                        m: 1,
                        width: "33%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2 style={{ color: "white" }}>No answers yet</h2>
                    {/*unanswered cards*/
                        threads.filter((e)=>e.status===1).map((element) => (
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
                            ) )
                    }
                </Box>
                <Box
                    border={10}
                    borderColor={'#c7c700'}
                    sx={{
                        background: "",
                        borderRadius: 20,
                        m: 1,
                        width: "33%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2 style={{ color: "white" }}>Discussing</h2>
                    {/*answered cards*/
                        threads.filter((e)=>e.status===2).map((element) => (
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
                        ) )
                    }

                </Box>
                <Box
                    border={10}
                    borderColor={'#4b893c'}
                    sx={{
                        background: "",
                        borderRadius: 20,
                        m: 1,
                        width: "33%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h2 style={{ color: "white" }}>Finished answer</h2>
                    {/*Finished questions*/
                        threads.filter((e)=>e.status===3).map((element) => (
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
                        ) )
                    }
                </Box>
            </Box>
        </div>
    );
    }
    //dekopler vi ikke threads fra store her?
    
}
export default observer(Board);
