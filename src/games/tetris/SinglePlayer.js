import React, { PureComponent, Fragment } from 'react';
import { withStyles } from "@material-ui/core";
import { Arena } from './';

const styles = () => ({

});

class SinglePlayer extends PureComponent {

    render() {
        return (
            <Fragment>
               <Arena isOpponent={false} />
            </Fragment>
        )
    }

}

export default withStyles(styles)(SinglePlayer);
