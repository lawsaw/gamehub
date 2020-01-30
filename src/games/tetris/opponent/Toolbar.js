import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography } from "@material-ui/core";
import { Toolbar as ToolbarComponent } from '../components';
import { Score, Preview } from './';

class Toolbar extends PureComponent {

    render() {
        const { speed, nickname } = this.props;
        return (
            <ToolbarComponent
                data={[

                    <Typography
                        variant='h5'
                    >
                        {nickname}
                    </Typography>,

                    <Fragment>
                        <Score />
                        Speed: {speed}
                    </Fragment>,

                    <Preview />,

                ]}
            />

        )
    }

}

export default connect(
    store => {
        const { speed, nickname } = store.tetris.opponent;
        return {
            speed,
            nickname,
        }
    }
)(Toolbar);
