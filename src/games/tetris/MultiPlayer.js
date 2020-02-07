import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Results } from '../../components';
import { Arena } from './';
import { Lobby } from './lobby';
import { resetConfig, stopGame, closeResults } from '../../actions/tetris';
import { socketDisconnect, socketGameFinish } from "../../socket/tetris";

class MultiPlayer extends PureComponent {

    componentWillUnmount() {
        const { resetConfig, is_lobby, socketDisconnect, stopGame } = this.props;
        if(!is_lobby) {
            console.log('make disconnect');
            stopGame();
            socketDisconnect();
        }
        resetConfig();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { results_data, socketGameFinish } = this.props;
        if(results_data !== null) {
            socketGameFinish();
        }
    }

    render() {
        const { isConnected, is_lobby, results_data, closeResults } = this.props;
        return isConnected ? (
            <Fragment>
                {
                    is_lobby ? <Lobby /> : <Arena />
                }
                {
                    results_data ? <Results data={results_data.data} title={results_data.title} onClose={closeResults} /> : null
                }
            </Fragment>
        ) : (
            <Fragment>
                no connected
            </Fragment>
        )
    }

}

export default connect(
    store => {
        const { isResultModalOpen, opponent, score, config } = store.tetris;
        return {
            isConnected: store.socket.isConnected,
            is_lobby: opponent === null,
            results_data: isResultModalOpen ? {
                title: score > opponent.score ? 'You won!' : score < opponent.score ? 'You lost!' : 'Победила дружба!',
                data: [{
                    label: `You (${config.nickname}):`,
                    value: score,
                },{
                    label: `Opponent (${opponent.nickname}):`,
                    value: opponent.score,
                }],
            } : null,
        }
    },
    dispatch => {
        return {
            resetConfig: () => dispatch( resetConfig() ),
            stopGame: () => dispatch( stopGame() ),
            socketDisconnect: () => dispatch( socketDisconnect() ),
            socketGameFinish: () => dispatch( socketGameFinish() ),
            closeResults: () => dispatch( closeResults() ),
        }
    }
)(MultiPlayer);
