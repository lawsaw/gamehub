import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { updateConfig } from "../../../actions/tetris";
import { Stepper } from "../../../components";

const styles = theme => ({
    form: {
        margin: theme.spacing(2),
        width: 200,
    },
});

const TYPE_CLIENT = 'TYPE_CLIENT';
const TYPE_SERVER = 'TYPE_SERVER';

class TypeSelecting extends PureComponent {

    handleType = (e) => {
        const { value } = e.target;
        const { updateConfig } = this.props;
        updateConfig({
            type: value,
        });
    }

    handleBack = () => {
        const { updateConfig } = this.props;
        updateConfig({
            step: 'LOBBY_STEP_NICKNAME',
        })
    }

    handleNext = () => {
        const { updateConfig } = this.props;
        updateConfig({
            step: 'LOBBY_STEP_CONNECTION',
        })
    }

    render() {
        const { classes, type } = this.props;
        return (
            <Box className={classes.form}>
                <RadioGroup value={type} onChange={this.handleType}>
                    <FormControlLabel value={TYPE_CLIENT} control={<Radio />} label="Client" />
                    <FormControlLabel value={TYPE_SERVER} control={<Radio />} label="Server" />
                </RadioGroup>
                <Stepper
                    onBack={this.handleBack}
                    onNext={this.handleNext}
                />
            </Box>
        )
    }
}

export default connect(
    store => {
        return {
            type: store.tetris.config.type,
        }
    },
    dispatch => {
        return {
            updateConfig: config => dispatch( updateConfig(config) ),
        }
    }
)(withStyles(styles)(TypeSelecting));