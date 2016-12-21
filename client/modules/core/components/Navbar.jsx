import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Pdf Viewer</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
