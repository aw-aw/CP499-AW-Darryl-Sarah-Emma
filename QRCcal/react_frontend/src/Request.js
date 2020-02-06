import React, { Component } from "react";
import * as $ from 'jquery';

var createReactClass = require('create-react-class');

var Request = createReactClass({

  sendRequest: function(sent, type){
    var request = $.post("post", {input: sent, category: type});
    request.done(function(data){$("#retrieved").html(data);});
  },

  render: function(){
    return <div>{ this.sendRequest(this.props.sent, this.props.type)}</div>
  }
});

export { Request };
