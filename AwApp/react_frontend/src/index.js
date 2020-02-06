import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./index.css";
 
const rootElement = document.getElementById('root');
if(rootElement){
    ReactDOM.render(<Main/>, rootElement);
}

const testElement = document.getElementById('test');
if (testElement){
    ReactDOM.render(<p>Hello World</p>, testElement);
}
