import React, { Component } from "react";
import PlayerDataService from "../services/player.service";
import { withRouter } from '../common/with-router';

class Player extends Component {
  constructor(props) {
    super(props);
    this.onChangePlayer_name = this.onChangePlayer_name.bind(this);
    this.onChangeMatches = this.onChangeMatches.bind(this);
    this.onChangeInns = this.onChangeInns.bind(this);
    this.onChangeRuns = this.onChangeRuns.bind(this);
    this.onChangeHs = this.onChangeHs.bind(this);
    this.onChangeAve = this.onChangeAve.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.updateAdded = this.updateAdded.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);

    this.state = {
      currentPlayer: {
      id: null,
      player_name: "",
      matches: "",
		  inns: "",
		  runs: "",
		  hs: "",
		  ave: "",
		
      added: false
		
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPlayer(this.props.router.params.id);
  }

  onChangePlayer_Name(e) {
    const player_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPlayer: {
          ...prevState.currentPlayer,
          player_name: player_name
        }
      };
    });
  }

  onChangeMatches(e) {
    const matches = e.target.value;
    
    this.setState(prevState => ({
      currentPlayer: {
        ...prevState.currentPlayer,
        matches: matches
      }
    }));
  }
  
  onChangeInns(e) {
    const inns = e.target.value;
    
    this.setState(prevState => ({
      currentPlayer: {
        ...prevState.currentPlayer,
        inns: inns
      }
    }));
  }
  
  onChangeRuns(e) {
    const runs = e.target.value;
    
    this.setState(prevState => ({
      currentPlayer: {
        ...prevState.currentPlayer,
        runs: runs
      }
    }));
  }

  onChangeHs(e) {
    const hs = e.target.value;
    
    this.setState(prevState => ({
      currentPlayer: {
        ...prevState.currentPlayer,
        hs: hs
      }
    }));
  }
  
  onChangeAve(e) {
    const ave = e.target.value;
    
    this.setState(prevState => ({
      currentPlayer: {
        ...prevState.currentPlayer,
        ave: ave
      }
    }));
  }
  
  getPlayer(id) {
    PlayerDataService.get(id)
      .then(response => {
        this.setState({
          currentPlayer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAdded(status) {
     var data = {
      id: this.state.currentPlayer.id,
      player_name: this.state.currentPlayer.player_name,
      matches: this.state.currentPlayer.matches,
	  inns: this.state.currentPlayer.inns,
      runs: this.state.currentPlayer.runs,
	  hs: this.state.currentPlayer.hs,
      ave: this.state.currentPlayer.ave,
      added: status
    };

    PlayerDataService.update(this.state.currentPlayer.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPlayer: {
           ...prevState.currentPlayer,
           added: status
        }
        }));
        console.log(response.data);
     })
      .catch(e => {
        console.log(e);
    });
  }

  updatePlayer() {
    PlayerDataService.update(
      this.state.currentPlayer.id,
      this.state.currentPlayer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The data was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePlayer() {    
    PlayerDataService.delete(this.state.currentPlayer.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/players');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPlayer } = this.state;

    return (
      <div>
        {currentPlayer ? (
          <div className="edit-form">
            <h4>Player</h4>
            <form>
              <div className="form-group">
                <label htmlFor="player_name">Player</label>
                <input
                  type="text"
                  className="form-control"
                  id="player_name"
                  value={currentPlayer.player_name}
                  onChange={this.onChangePlayer_Name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="matches">Matches</label>
                <input
                  type="text"
                  className="form-control"
                  id="matches"
                  value={currentPlayer.matches}
                  onChange={this.onChangeMatches}
                />
              </div>
			  <div className="form-group">
                <label htmlFor="inns">Inns</label>
                <input
                  type="text"
                  className="form-control"
                  id="inns"
                  value={currentPlayer.inns}
                  onChange={this.onChangeInns}
                />
              </div>
              <div className="form-group">
                <label htmlFor="runs">Runs</label>
                <input
                  type="text"
                  className="form-control"
                  id="runs"
                  value={currentPlayer.runs}
                  onChange={this.onChangeRuns}
                />
              </div>
			  <div className="form-group">
                <label htmlFor="hs">HS</label>
                <input
                  type="text"
                  className="form-control"
                  id="hs"
                  value={currentPlayer.hs}
                  onChange={this.onChangeHs}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ave">Ave</label>
                <input
                  type="text"
                  className="form-control"
                  id="Ave"
                  value={currentPlayer.ave}
                  onChange={this.onChangeAve}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPlayer.added ? "Added" : "Pending"}
              </div>
            </form>

            {currentPlayer.added ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAdded(false)}
              >
                Remove
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAdded(true)}
              >
                Add
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePlayer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePlayer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Player Record Field...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Player);