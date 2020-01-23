import React, { createRef, PureComponent } from 'react';
import UndoCanvas from 'undo-canvas';
import { withStyles, Grid } from "@material-ui/core";
import { Desk, DeskToolbar } from './';
import { DESK_WIDTH, DESK_HEIGHT } from '../helpers/constants';
import { Resizer } from '../../../components';

const MOUSE_MAIN_BUTTON = 0;

let context = null;

const styles = () => ({
    desk: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    canvas: {

    },
    paint: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    toolbar: {

    },
    screen: {
        position: 'relative',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class Paint extends PureComponent {

    constructor(props) {
        super(props);
        this.canvas = createRef();
        this.isDrawing = false;
        this.doUpdateSize = null;
        this.savedSize = {};
    }

    state = {
        lineOptions: {
            lineWidth: 2,
            lineJoin: 'round',
            lineCap: 'round',
            strokeStyle: '#ffffff',
        },
    }

    componentDidMount() {
        //this.handleInit();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    handlerColorSelect = (color) => {
        this.setState(state => ({
            lineOptions: {
                ...state.lineOptions,
                strokeStyle: color,
            }
        }));
    }

    getCoords = (e) => {
        const { target, changedTouches } = e;
        const { left, top } = target.getBoundingClientRect();
        const { clientX, clientY } = changedTouches ? changedTouches[0] : e;
        // console.log({
        //     target,
        //     left, top,
        //     clientX, clientY,
        //     e
        // });
        return {
            x: clientX - left,
            y: clientY - top,
        };
    }

    updateLine = () => {
        const { lineOptions } = this.state;
        for(let option in lineOptions) context[option] = lineOptions[option];
    }

    makeStep = (e) => {
        const { onConvertToImage } = this.props;
        const { x, y } = this.getCoords(e);
        context.lineTo(x, y);
        context.stroke();
        onConvertToImage(this.canvas);
        return {x, y};
    }

    init = (width, height) => {
        console.log(width, height);
        //let dpr = window.devicePixelRatio || 1;
        //let rect = canvas.getBoundingClientRect();
        this.canvas.current.width = width;
        this.canvas.current.height = height;
        context = this.canvas.current.getContext("2d");
        //context.scale(dpr, dpr);
        UndoCanvas.enableUndo(context);
        this.setListeners();
    }

    saveUpdateSizeFunc = (f) => {
        this.doUpdateSize = f;
    }

    updateSize = (width, height) => {
        UndoCanvas.disableUndo(context);
        let temp = context.getImageData(0, 0, width, height);
        //let dpr = window.devicePixelRatio || 1;
        this.canvas.current.width = width;
        this.canvas.current.height = height;
        context.putImageData(temp, 0, 0);
        this.savedSize.width = width;
        this.savedSize.height = height;
        UndoCanvas.enableUndo(context);
    }

    setListeners = () => {
        this.canvas.current.addEventListener('mousedown', this.handleMouseDown, false);
        this.canvas.current.addEventListener('mouseup', this.handleMouseUp, false);
        this.canvas.current.addEventListener('mousemove', this.handleMouseMove, false);
        this.canvas.current.addEventListener('touchstart', this.handleTouchStart, false);
        this.canvas.current.addEventListener('touchend', this.handleTouchEnd, false);
        this.canvas.current.addEventListener('touchmove', this.handleTouchMove, false);
    }

    removeListeners = () => {
        this.canvas.current.removeEventListener('mousedown', this.handleMouseDown, false);
        this.canvas.current.removeEventListener('mouseup', this.handleMouseUp, false);
        this.canvas.current.removeEventListener('mousemove', this.handleMouseMove, false);
        this.canvas.current.removeEventListener('touchstart', this.handleTouchStart, false);
        this.canvas.current.removeEventListener('touchend', this.handleTouchEnd, false);
        this.canvas.current.removeEventListener('touchmove', this.handleTouchMove, false);
    }

    handleTouchStart = (e) => {
        this.pointStart(e);
    }

    handleTouchEnd = (e) => {
        this.pointEnd(e);
    }

    handleTouchMove = (e) => {
        this.handleMouseMove(e);
    }

    pointStart = (e) => {
        this.isDrawing = true;
        const { onConvertToImage } = this.props;
        context.putTag();
        this.updateLine();
        context.beginPath();
        const { x, y } = this.getCoords(e);
        context.moveTo(x, y);
        onConvertToImage(this.canvas);
    }

    pointEnd = (e) => {
        this.isDrawing = false;
        this.makeStep(e);
        context.putTag();
    }

    pointMove = (e) => {
        if(this.isDrawing) this.makeStep(e);
    }

    handleMouseDown = (e) => {
        const { button } = e;
        if(button === MOUSE_MAIN_BUTTON) {
            this.pointStart(e);
        }
    }

    handleMouseUp = (e) => {
        const { button } = e;
        if(button === MOUSE_MAIN_BUTTON) {
            this.pointEnd(e);
        }
    }

    handleMouseMove = (e) => {
        if(this.isDrawing) this.makeStep(e);
    }

    handleUndo = () => {
        const { onConvertToImage } = this.props;
        //console.log(this.savedSize);
        let reg = /^(?!.*(width|height|size|fillRect))/;
        console.log(this.savedSize);
        context.undoTag(reg, 1);
        //this.updateSize(this.savedSize.width, this.savedSize.height);
        //context.undoTag(reg, 1);
        onConvertToImage(this.canvas);
    }

    handleRedo = () => {
        const { onConvertToImage } = this.props;
        context.redoTag();
        onConvertToImage(this.canvas);
    }

    handleClear = () => {
        const { onConvertToImage } = this.props;
        context.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
        onConvertToImage(this.canvas);
    }

    handleSizeChange = (e, lineWidth) => {
        this.setState(state => ({
            lineOptions: {
                ...state.lineOptions,
                lineWidth,
            },
        }));
    }

    render() {
        const { classes } = this.props;
        const { lineOptions: { lineWidth } } = this.state;
        return (
            <Grid
                container
                className={classes.paint}
            >
                <Grid
                    item
                    className={classes.toolbar}
                >
                    <DeskToolbar
                        onColorSelect={this.handlerColorSelect}
                        onUndo={this.handleUndo}
                        onRedo={this.handleRedo}
                        onClear={this.handleClear}
                        onSizeChange={this.handleSizeChange}
                        lineWidth={lineWidth}
                    />
                </Grid>
                <Grid
                    item
                    className={classes.screen}
                >
                    <Resizer
                        k={DESK_HEIGHT/DESK_WIDTH}
                    >
                        <Desk
                            innerRef={this.canvas}
                            init={this.init}
                            updateSize={this.updateSize}
                            saveUpdateSizeFunc={this.saveUpdateSizeFunc}
                        />
                    </Resizer>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Paint);