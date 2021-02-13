import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Games } from '../api';

class GameList extends Component {
  state = {
    loading: true,
    products: [],
  };

  async componentDidMount() {
    const { data: games } = await Games.getGames();

    this.setState({ loading: false, games });
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
