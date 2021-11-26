import React, { Component, useEffect, useState } from "react";
import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";
import { Grid } from "@material-ui/core";
import Board from "./components/layout/Board";
import { observer } from "mobx-react-lite";
import BoardStore from "./stores/BoardStore";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";

//import { watchOptions } from "nodemon/lib/config/defaults";

const boardStore = new BoardStore();
//boardStore.populateStore();

function App() {
  const [store, setStore] = useState();
  

  useEffect(() => {
    boardStore.populateStore().then(() => {
      console.log("useEffect");
      setStore(boardStore);
    })
    
  }, []) ;

  return (
    <div className="App" style={{ p: 0, background: "#313847", minHeight: "100vh", height: "100%", width: "100%" }}>
      <Switch>
        <Route exact path="/">
          <LoginPage/>
        </Route>
        <Route path="/courses/:course/:day">
          <Topbar store={boardStore}/>
          <Grid container xs={12} direction={"row"}>
            <Grid item xs={2}>
              <Sidebar store={boardStore}/>
            </Grid>
            <Grid item xs={10}>
              <div>
                <Board store={boardStore}/>
              </div>
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </div>
  );
}

export default observer(App);
