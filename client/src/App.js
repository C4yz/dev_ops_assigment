import React, { Component } from 'react';
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import {Grid} from "@material-ui/core";
import Board from "./Board";
import { observer } from 'mobx-react-lite';


class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
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
  };

  render() {
    return (
      <div className="App" style={{p: 0, background: "#313847"}}>
        <Topbar/>
        <Grid container xs={12}
            direction={"row"}>
            <Grid item xs={2} >
                <Sidebar/>
            </Grid>
            <Grid item xs={10}>
                <div>
                    <Board/>
                </div>
            </Grid>
        </Grid>

        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.data}</p>
      </div>
    );
  }
}

export default App;