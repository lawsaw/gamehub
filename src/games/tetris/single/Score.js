import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Score as ScoreComponent } from '../components';

class Score extends PureComponent {

    render() {
        const { score } = this.props;
        return (
            <ScoreComponent
                score={score}
            />
        )
    }

}

export default connect(
    store => {
        return {
            score: store.tetris.score,
        }
    },
)(Score);
