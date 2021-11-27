import {Component, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Typography,
    Tabs,
    Tab,
} from "@material-ui/core";
import BoardStore from "../../stores/BoardStore";
import {observer, useObserver } from 'mobx-react-lite';
import Thread from "../Thread";
import { useParams } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div style={{ width: "100%", height: "100%"}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
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
        <div style={{width: "100%", height: "100%", alignItems: "center", display: "flex", flexDirection: "column"}} id="boardContainer">
            <h1 style={{ color: "white", textAlign: 'center' }}>{course} {day}</h1>
            <Box sx={{color: "white", width:"100%"}}>
                <Tabs centered={true} indicatorColor="secondary" value={value} onChange={handleTabChange} aria-label="basic tabs" >
                    <Tab label="No answers yet" {...a11yProps(0)} />
                    <Tab label="Still discussing" {...a11yProps(1)} />
                    <Tab label="Finished answers" {...a11yProps(2)} />
                </Tabs>
            </Box>

            {/*EACH TABPANEL BELOW HOLDS THE VIEW OF THAT TAB*/}

            <TabPanel value={value} index={0}>
                <Box
                    border={10}
                    borderColor={'#30656d'}
                    sx={{
                        background: "",
                        borderRadius: 20,
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexGrow: 1,
                    }}
                >
                    <h2 style={{ color: "white" }}>No answers yet</h2>
                    {/*/!*unanswered cards*/}
                    {threads.filter((e)=>e.status===1).map((element) => (
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
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Box
                    border={10}
                    borderColor={'#c7c700'}
                    sx={{
                        background: "",
                        borderRadius: 20,
                        width: "100%",
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
            </TabPanel>

            <TabPanel value={value} index={2}>
                <Box
                    border={10}
                    borderColor={'#4b893c'}
                    sx={{
                        background: "",
                        borderRadius: 20,
                        width: "100%",
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
            </TabPanel>


            {/*<Box
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
                    /!*unanswered cards
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
                    /!*answered cards
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
                    /!*Finished questions
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
            </Box>*/}
        </div>
    );
    }
    //dekopler vi ikke threads fra store her?
    
}
export default observer(Board);
