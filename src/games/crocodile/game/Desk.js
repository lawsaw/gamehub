import React, { PureComponent, forwardRef } from 'react';
import { withStyles, Paper } from "@material-ui/core";

const TIME_NEED_FOR_LAYOUT_BUILD = 100;

const styles = () => ({
    desk: {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    canvas: {
        // width: props => props.resizer.width,
        // height: props => props.resizer.height,
    }
});

class Desk extends PureComponent {

    constructor(props) {
        super(props);
        this.isInited = false;
    }

    componentDidMount() {
        this.props.saveUpdateSizeFunc(this.updateSize);
        setTimeout(() => {
            this.setInit();
        }, TIME_NEED_FOR_LAYOUT_BUILD);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.isInited && (prevProps.resizer.width !== this.props.resizer.width || prevProps.resizer.height !== this.props.resizer.height)) {
            this.updateSize();
        }
    }

    updateSize = () => {
        const { updateSize, resizer: { width, height } } = this.props;
        updateSize(width, height);
    }

    setInit = () => {
        const { init, resizer: { width, height } } = this.props;
        init(width, height);
        this.isInited = true;
    }

    render() {
        const { classes, innerRef } = this.props;
        return (
            <Paper
                elevation={5}
                square={true}
                className={classes.desk}
            >
                <canvas
                    ref={innerRef}
                    className={classes.canvas}
                />
            </Paper>
        )
    }
}

export default withStyles(styles)(
        forwardRef((props, ref) => <Desk
            innerRef={ref} {...props}
        />
    )
);

