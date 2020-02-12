import React, { Component } from "react";
import { MenuItem, InputLabel } from '@material-ui/core';
import * as $ from 'jquery';
import ReactDOMServer from 'react-dom/server';

class Request extends React.Component{
  constructor(props){
  super(props);
  this.state = { response: null };
  }
  
  componentDidMount(){
    this.sendRequest(this.props.sent, this.props.type);
  }

  sendRequest(sent, type){
    var request = $.post("post", {input: sent, category: type}, function(data){
      this.setState({response: data});
    }.bind(this));
  }
  
  render(){
    if (this.state.response !==  null){
      if (this.props.type == "get_pref_shifts"){
       var arr = this.state.response.split("\n");
       var array = [];
       for (var i = 0; i < arr.length; i++) {
          const item = <p>{arr[i]}</p>;
          array.push(item);
        }
        return array
      }
      else if(this.props.type=="get_assigned_shifts" || this.props.type == "get_busy_shifts"){
        var arr = this.state.response.split("\n");
        var array = [];
        for (var i = 0; i < arr.length; i++) {
          const item = <p>{arr[i]}</p>;
          array.push(item);
        }
        return<p align>{array}</p>
      }
      else if(this.props.type=="get_discipline_list"){
       var arr = this.state.response.split("\n");
       var array = [];
       for (var i = 0; i < arr.length; i++) {
          const item = <p>{arr[i]}</p>;
          array.push(item);
       }
	return<p>{array}</p>
      }
      else if(this.props.type=="get_la_status" || this.props.type=="profile_get_last_shifts" || this.props.type == "get_last_shifts"){
        return(
          <p> {this.state.response} </p>
      	)
      }
      else if(this.props.type == "get_max_shifts"){
        return <InputLabel>{this.state.response}</InputLabel>
      }
      else if(this.props.type == "get_all_tutors") {
        var arr = this.state.response.split("\n");
        var array = [];
        for (var i = 0; i < arr.length; i++) {
           const item = <p>{arr[i]}</p>
           array.push(item)
        }
         return<p align="center">{array}</p>
      }
      else {
        return <p></p>
      }
    } 
    return <p></p>
  }
}
export { Request };
