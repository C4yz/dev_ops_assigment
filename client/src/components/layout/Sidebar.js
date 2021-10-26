import { Component } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import Titlebar from "./Titlebar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import {Box,} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import { borders } from "@mui/system";
import NewQuestion from "../NewQuestion";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#2b2f38",
    display: "flex",
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    color: 'white',
    height: '100%',
  },
  tab: {
    color: 'blue',
    backGround: 'blue'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (<div>
      {value===index && (
          <Box sx={{ p: 0.2, width: "100%" }}>
            {children}
          </Box>
      )}
  </div>)
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
};

function Sidebar(props) {
  const classes = useStyles();
  const store = props.store;
  const tabs = store.course.tabs;
  const [value, setValue] = useState(0);
  let list = Object.keys(tabs);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("hej" + newValue);
  };

  /* const list = [
        "Dag 1",
        "Dag 2",
        "Aflevering 1",
        "Eksamen",
        "Hygge",
    ]; */
  const buttons = [];
  const color = [
    "#463147",
    "#314147",
    "#31473a",
    "#404731",
    "#473b31",
    "#473131",
  ];
   /*for (let i = 0; i < list.length; i++) {
    buttons.push(
      <Box sx={{ p: 0.2, width: "100%" }}>
        <Button
          variant={"contained"}
          fullWidth={true}
          style={{ justifyContent: "flex-start", background: color[i] }}
        >
          {list[i]}
        </Button>
      </Box>
    );
  } */
  return (
    <div
      className={classes.root}>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          border: '1px dashed grey',
          p: 1,
          borderColor: "1px dashed grey",
        }}
      >
        <Tabs
          tabItemContainerStyle={{width: '100px'}}
          orientation="vertical"
          value={value}
          onChange={handleChange}
          textColor="#FFFFFF"
          className={classes.tabs}
          TabIndicatorProps= {{
            style: {
              display: "none",
            },
          }}

        >
          <Tab className={classes.tab} label="Day 1" />
          <Tab label="Day 2" />
          <Tab label="Day 3" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Titlebar title="yeet"/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Titlebar title="somelongtitle"/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Titlebar title="yeet3"/>
        </TabPanel>
      </Box>
    </div>
  );
}

export default Sidebar;
