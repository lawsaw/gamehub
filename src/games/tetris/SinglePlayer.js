import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Results } from '../../components';
import { closeResults } from '../../actions/tetris';
import { Arena } from './';

class SinglePlayer extends PureComponent {

    render() {
        const { results, closeResults } = this.props;
        return (
            <Fragment>
               <Arena isOpponent={false} />
                {
                    results ? <Results data={results} onClose={closeResults} /> : null
                }
            </Fragment>
        )
    }

}

export default connect(
    store => {
        const { isResultModalOpen, score } = store.tetris;
        return {
            results: isResultModalOpen ? [{label: 'Your score', value: score}] : null,
        }
    },
    dispatch => {
        return {
            closeResults: () => { dispatch(closeResults()) },
        }
    }
)((SinglePlayer));
