import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from '../config';

class GameList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: [],
    };
  }

  async componentDidMount() {
    let response = await fetch(`${Config.host}/games`);
    if (!response.ok) {
      return;
    }

    let games = await response.json();
    this.setState({ loading: false, games: games });
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="GameList">
          <h2 className="GameList-title">
            Available Games ({this.state.games.length})
          </h2>
          <div className="GameList-container">
            {this.state.games.map((game, index) => {
              return (
                <div className="GameList-game" key={game.id}>
                  <Link to={`/games/${game.id}`}>
                    <h3>{game.name}</h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return <h2 className="GameList-title">Waiting for API...</h2>;
  }
}

export default GameList;
