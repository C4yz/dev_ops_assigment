import { Component } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { borders } from "@mui/system";
import NewQuestion from "../NewQuestion";

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
  for (let i = 0; i < list.length; i++) {
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
  }
  return (
    <div
      style={{
        background: "#2b2f38",
        padding: 5,
      }}
    >
      <NewQuestion store={props.store} />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          p: 1,
          borderColor: "text.primary",
        }}
      >
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Day 1" />
          <Tab label="Day 2" />
          <Tab label="Day 3" />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item one
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item three
        </TabPanel>
      </Box>
    </div>
  );
}

export default Sidebar;
