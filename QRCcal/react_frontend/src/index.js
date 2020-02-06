import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainAdmin from "./AdminFiles/MainAdmin"
import MainNormal from "./NormalFiles/MainNormal"
import MainTutor from "./TutorFiles/MainTutor"

const normalElement = document.getElementById("normal");
if (normalElement){
    ReactDOM.render(<MainNormal/>, normalElement);
}

const tutorElement = document.getElementById("tutor");
if (tutorElement){
    ReactDOM.render(<MainTutor/>, tutorElement);
}

const adminElement = document.getElementById("admin");
if (adminElement){
    ReactDOM.render(<MainAdmin/>, adminElement);
}
