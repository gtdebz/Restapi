import React, { Component } from "react";
import PlayerDataService from "../services/player.service";

export default class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.onChangePlayer_Name = this.onChangePlayer_Name.bind(this);
    this.onChangeMatches = this.onChangeMatches.bind(this);
    this.onChangeInns = this.onChangeInns.bind(this);
    this.onChangeRuns = this.onChangeRuns.bind(this);
    this.onChangeHs = this.onChangeHs.bind(this);
    this.onChangeAve = this.onChangeAve.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.newPlayer = this.newPlayer.bind(this);

    this.state = {
      id: null,
      player_name: "",
      matches: "", 
      inns: "",
      runs: "",
      hs: "",
      ave: "",
      added: false,

      submitted: false
    };
  }

  onChangePlayer_Name(e) {
    this.setState({
      player_name: e.target.value
    });
  }

  onChangeMatches(e) {
    this.setState({
      matches: e.target.value
    });
  }

  onChangeInns(e) {
    this.setState({
      inns: e.target.value
    });
  }

  onChangeRuns(e) {
    this.setState({
      runs: e.target.value
    });
  }

  onChangeHs(e) {
    this.setState({
      hs: e.target.value
    });
  }

  onChangeAve(e) {
    this.setState({
      ave: e.target.value
    });
  }

  savePlayer() {
    var data = {
      player_name: this.state.player_name,
      matches: this.state.matches,
      inns: this.state.inns,
      runs: this.state.runs,
      hs: this.state.hs,
      ave: this.state.ave
    };

    PlayerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          player_name: response.data.player_name,
          matches: response.data.matches,
          inns: response.data.inns,
          runs: response.data.runs,
          hs: response.data.hs,
          ave: response.data.ave,
          added: response.data.added,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPlayer() {
    this.setState({
      id: null,
      player_name: "",
      matches: "",
      inns: "",
      runs: "",
      hs: "",
      ave: "",
     added: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Data added successfully!</h4>
            <button className="btn btn-success" onClick={this.newPlayer}>
              Add
            </button>
          </div>
        ) : (
          <div>
              <h3>Add a New Player Record</h3><br/>
            <div className="form-group">
              <label htmlFor="player_name">Player Name</label>
              <input
                type="text"
                className="form-control"
                id="player_name"
                required
                value={this.state.player_name}
                onChange={this.onChangePlayer_Name}
                name="player_name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="matches">Matches</label>
              <input
                type="text"
                className="form-control"
                id="matches"
                required
                value={this.state.matches}
                onChange={this.onChangeMatches}
                name="matches"
              />
            </div>

            <div className="form-group">
              <label htmlFor="inns">Inns</label>
              <input
                type="text"
                className="form-control"
                id="inns"
                required
                value={this.state.inns}
                onChange={this.onChangeInns}
                name="inns"
              />
            </div>

            <div className="form-group">
              <label htmlFor="runs">Runs</label>
              <input
                type="text"
                className="form-control"
                id="runs"
                required
                value={this.state.runs}
                onChange={this.onChangeRuns}
                name="runs"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hs">HS</label>
              <input
                type="text"
                className="form-control"
                id="hS"
                required
                value={this.state.hs}
                onChange={this.onChangeHs}
                name="hs"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ave">Ave</label>
              <input
                type="text"
                className="form-control"
                id="ave"
                required
                value={this.state.ave}
                onChange={this.onChangeAve}
                name="ave"
              />
            </div>

            <button onClick={this.savePlayer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
