import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Score as ScoreComponent } from '../components';

class Score extends PureComponent {

    render() {
        const { score, speed, ...props } = this.props;
        return (
            <ScoreComponent
                score={score}
                speed={speed}
                {...props}
            />
        )
    }

}

export default connect(
    store => {
        return {
            score: store.tetris.opponent.score,
            speed: store.tetris.opponent.speed,
        }
    },
)(Score);
