import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography } from "@material-ui/core";
import { Toolbar as ToolbarComponent } from '../components';
import { Score } from './';

class Toolbar extends PureComponent {

    render() {
        const { speed, nickname, previewComponent } = this.props;
        return (
            <ToolbarComponent
                data={[

                    <Typography
                        variant='h6'
                    >
                        {nickname}
                    </Typography>,

                    <Score />,

                    previewComponent,

                ]}
            />

        )
    }

}

export default connect(
    store => {
        const { nickname } = store.tetris.opponent;
        return {
            nickname,
        }
    }
)(Toolbar);
