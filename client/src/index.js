import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

/* credit to Christan Budtz lektion 8 */
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  //name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const token = getParameterByName("token");
if (token!=null && token.length>0){
  //Store token and redirect to baseURL
  localStorage.setItem("portal-jwt-Token",token);
  console.log(token);
  console.log("yes");
  window.location.replace("http://localhost:3000/courses/DevOps/Day 1");
}

ReactDOM.render(
<Router>
    <App />,
</Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

