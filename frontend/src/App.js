import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddPlayer from "./components/add-player.component";
import Player from "./components/player.component";
import PlayersList from "./components/players-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-success">
          <Link to={"/players"} className="navbar-brand">
            Group 44
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/players"} className="nav-link">
                Players
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<PlayersList/>} />
            <Route path="/players" element={<PlayersList/>} />
            <Route path="/add" element={<AddPlayer/>} />
            <Route path="/players/:id" element={<Player/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
