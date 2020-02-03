import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core";
import { Toolbar as ToolbarComponent } from '../components';
import { Score } from './';
import { Nickname } from '../components';

const styles = () => ({

});

class Toolbar extends PureComponent {

    render() {
        const { speed, nickname, previewComponent, classes, labelClassName, ...props } = this.props;
        return (
            <ToolbarComponent
                data={[

                    <Nickname
                        name={nickname}
                        className={labelClassName}
                    />,

                    <Score
                        className={labelClassName}
                    />,

                    previewComponent,

                ]}
                {...props}
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
)(withStyles(styles)(Toolbar));
