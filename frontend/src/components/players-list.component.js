import React, { Component } from "react";
import PlayerDataService from "../services/player.service.js";
import { Link } from "react-router-dom";

export default class PlayersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchPlayer_Name = this.onChangeSearchPlayer_Name.bind(this);
    this.retrievePlayers = this.retrievePlayers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePlayer = this.setActivePlayer.bind(this);
    this.removeAllPlayers = this.removeAllPlayers.bind(this);
    this.searchPlayer_name = this.searchPlayer_name.bind(this);

    this.state = {
      players: [],
      currentPlayer: null,
      currentIndex: -1,
      searchPlayer_Name: ""
    };
  }

  componentDidMount() {
    this.retrievePlayers();
  }

  onChangeSearchPlayer_Name(e) {
    const searchPlayer_name = e.target.value;

    this.setState({
      searchPlayer_name: searchPlayer_name
    });
  }

  retrievePlayers() {
    PlayerDataService.getAll()
      .then(response => {
        this.setState({
          players: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePlayers();
    this.setState({
      currentPlayer: null,
      currentIndex: -1
    });
  }

  setActivePlayer(player, index) {
    this.setState({
      currentPlayer: player,
      currentIndex: index
    });
  }

  removeAllPlayers() {
    PlayerDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchPlayer_name() {
    this.setState({
      currentPlayer: null,
      currentIndex: -1
    });

    PlayerDataService.findByPlayer_name(this.state.searchPlayer_name)
      .then(response => {
        this.setState({
          players: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchPlayer_name, players, currentPlayer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-9">
        <h5>Search for data from Cricket game records</h5>
          <div className="input-group mb-3">
            
            <input
              type="text"
              className="form-control"
              placeholder="Search by player name"
              value={searchPlayer_name}
              onChange={this.onChangeSearchPlayer_name}
            />
            <div className="input-group-append">
              <button
                className="btn btn-default btn-outline-success bg-default"
                type="button"
                onClick={this.searchPlayer_name}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Players List</h4>

          <ul className="list-group">
            {players &&
              players.map((player, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePlayer(player, index)}
                  key={index}
                >
                  {player.player_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-med btn-danger"
            onClick={this.removeAllPlayers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPlayer ? (
            <div>
              <h4>Player</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentPlayer.player_name}
              </div>
              <div>
                <label>
                  <strong>Matches:</strong>
                </label>{" "}
                {currentPlayer.matches}
              </div>
              <div>
                <label>
                  <strong>Inns:</strong>
                </label>{" "}
                {currentPlayer.inns}
              </div>
              <div>
                <label>
                  <strong>Runs:</strong>
                </label>{" "}
                {currentPlayer.runs}
              </div>
              <div>
                <label>
                  <strong>HS:</strong>
                </label>{" "}
                {currentPlayer.hs}
              </div>
              <div>
                <label>
                  <strong>Ave:</strong>
                </label>{" "}
                {currentPlayer.ave}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPlayer.added ? "Added" : "Pending"}
              </div>

              <Link
                to={"/players/" + currentPlayer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Player Record Field...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
