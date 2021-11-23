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
import { autorun } from "mobx";



function Board(props){
    let { course, day } = useParams();
    const tabs = props.store.course.tabs

    const threads = tabs[day].threads;



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
export default observer(Board);
