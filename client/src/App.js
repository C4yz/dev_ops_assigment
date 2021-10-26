import React, { Component } from "react";
import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";
import { Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import BoardStore from "./stores/BoardStore";
import Board from "./components/layout/Board";

const boardStore = new BoardStore();

function App() {
  /* ComponentDidMount() {
    callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }; */

  return (
    <div className="App" style={{ p: 0, background: "#313847" }}>
      <Topbar store={boardStore} />
      <Sidebar store={boardStore} />

    </div>
  );
}

export default App;


/* <Grid item xs={10}>
          <div>
            <Board store={boardStore} />
          </div>
        </Grid> */
