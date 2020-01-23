import React, { PureComponent } from 'react';
import { withStyles, Box, IconButton, Slider as SliderMaterial } from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Delete from '@material-ui/icons/Delete';
import { ColorPicker } from './';
import { Toolbar } from '../../../components';

const styles = theme => ({
    toolbar: {
        flexWrap: 'wrap',
    },
    colorPicker: {
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            flexGrow: 1,
        }
    },
    sizeSlider: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            order: 1,
        },
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            marginLeft: theme.spacing(2),
        }
    },
    iconButtons: {},
    iconButton: {
        [theme.breakpoints.down('xs')]: {
            '&:not(:first-child)': {
                marginLeft: theme.spacing(1),
            },
        },
    },
});

const BUTTON_MAP = [
    {
        id: 'undo',
        icon: <Undo />,
        action: 'onUndo',
    },{
        id: 'redo',
        icon: <Redo />,
        action: 'onRedo',
    },{
        id: 'clear',
        icon: <Delete />,
        action: 'onClear',
    }
];

class DeskToolbar extends PureComponent {

    renderButton = () => {
        const { classes, width } = this.props;
        let size = isWidthDown('xs', width) ? 'small' : 'medium';
        return (
            <Box
                className={classes.iconButtons}
            >
                {
                    BUTTON_MAP.map(({ id, icon, action }) => (
                        <IconButton
                            key={id}
                            onClick={this.props[action]}
                            size={size}
                            className={classes.iconButton}
                        >
                            {icon}
                        </IconButton>
                    ))
                }
            </Box>
        )
    }

    render() {
        const { classes, onColorSelect, onSizeChange, lineWidth } = this.props;
        return (
            <Toolbar
                variant="dense"
                className={classes.toolbar}
            >
                <ColorPicker
                    onColorSelect={onColorSelect}
                    className={classes.colorPicker}
                />
                <SliderMaterial
                    value={lineWidth}
                    onChange={onSizeChange}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={100}
                    className={classes.sizeSlider}
                />
                {
                    this.renderButton()
                }
            </Toolbar>
        )
    }
}

export default withWidth()(withStyles(styles)(DeskToolbar));