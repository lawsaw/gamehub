import React, { PureComponent } from 'react';
import cx from 'classnames';
import { withStyles, Box } from "@material-ui/core";
import { GithubPicker } from 'react-color';

const COLORS = [
    '#ffffff',
    '#000075',
    '#ffe119',
    '#3cb44b',
    '#4363d8',
    '#f032e6',
    '#42d4f4',
    '#f58231',
    '#e6beff',
    '#e6194B',
    '#fabebe',
    '#000000',
];

const styles = () => ({
    color: {},
    picker: {
        background: 'transparent !important',
        border: 'none !important',
        boxShadow: 'none !important',
        padding: '0 !important',
    },
});

class ColorPicker extends PureComponent {

    handleChange = (color, e) => {
        const { onColorSelect } = this.props;
        if(onColorSelect) onColorSelect(color.hex);
    }

    render() {
        const { classes, className } = this.props;
        return (
            <Box
                className={cx(classes.color, className)}
            >
                <GithubPicker
                    width={150}
                    color={COLORS[0]}
                    onChange={this.handleChange}
                    triangle="hide"
                    colors={COLORS}
                    className={classes.picker}
                />
            </Box>
        )
    }
}

export default withStyles(styles)(ColorPicker);