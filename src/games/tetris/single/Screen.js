import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box } from "@material-ui/core";
import { Screen } from '../components';
import {COL_SIZE} from "../helpers/constants";

const styles = () => ({
    content: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    toolbar: {
        //alignSelf: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            marginLeft: COL_SIZE,
        },
    },
});

class Screen extends PureComponent {

    render() {
        const { field, toolbar, size } = this.props;
        return (
            <Screen
                field={field}
                toolbar={toolbar}
            />
        )
    }

}

export default withStyles(styles)(Screen);
