import React from 'react';
import RankCard from '../components/RankCard';
import { getSavedRanking } from '../services/getRank';

class Rank extends React.Component {
  render() {
    const rank = getSavedRanking();
    return (
      <div className="container">
        <h1 data-testid="ranking-title" className="ranking-title">Rank</h1>
        <ul className="ranking-list">
          { rank.length !== 0 && rank.sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <li key={ index }>
                <RankCard
                  name={ player.name }
                  score={ player.score }
                  img={ player.picture }
                  index={ index }
                />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default Rank;
