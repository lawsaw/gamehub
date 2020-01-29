import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Stepper, Step, StepLabel, StepContent, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { preventMultipleSubmit } from '../../helpers/etc';
//import { socketValidateNickname } from '../../socket/common_emit';
import { listenStepChange, listenLobby } from '../../socket/tetris_listen';
import { makeConnection, socketValidateNickname } from '../../socket/tetris_emit';
import { TextInput } from '../../components';
import { SOCKET_ON_LOBBY_STEP_CHANGE } from "../../helpers/constants";
import SocketContext from '../../helpers/SocketContext'

const TYPE_CLIENT = 'TYPE_CLIENT';
const TYPE_SERVER = 'TYPE_SERVER';

const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    form: {
        margin: theme.spacing(2),
        width: 200,
    },
});

class Lobby extends PureComponent {

    constructor(props) {
        super(props);
        this.handleNicknameSubmitDecorator = preventMultipleSubmit();
        this.steps = [
            {
                label: 'Authorization',
                layout: this.renderStep1,
            },{
                label: 'Client / Server',
                layout: this.renderStep2,
            },{
                label: 'Connection',
                layout: this.renderStep3,
            },
        ];
        this.step_type_map = {
            [TYPE_CLIENT]: this.renderStepTypeClient,
            [TYPE_SERVER]: this.renderStepTypeServer,
        };
        this.lobby_action_map = {
            'LOBBY_GO_TO_STEP_TYPE_SELECT': ({ step_number }) => {
                this.setState(() => ({
                    step_number: step_number,
                }));
            },
        }
        this.state = {
            step_number: 0,
            type: TYPE_CLIENT,
            nickname: '',
            server_id: '',
        }
    }

    componentDidMount() {
        const { startListenLobby } = this.props;
        startListenLobby(this.handleLobby);
    }

    componentWillUnmount() {
        const { stopListenLobby } = this.props;
        stopListenLobby(this.handleLobby);
    }

    handleLobby = ({ action, ...props }) => {
        if (action in this.lobby_action_map) this.lobby_action_map[action](props);
    }

    renderStep1 = () => {
        const { classes } = this.props;
        const { nickname } = this.state;
        return (
            <Box className={classes.form}>
                <TextInput
                    onChange={this.handleNicknameChange}
                    onSubmit={this.handleNicknameSubmit}
                    placeholder="Enter your nickname"
                    value={nickname}
                />
            </Box>
        )
    }

    renderStep2 = () => {
        const { classes } = this.props;
        const { type } = this.state;
        return (
            <Box className={classes.form}>
                <RadioGroup value={type} onChange={this.handleType}>
                    <FormControlLabel value={TYPE_CLIENT} control={<Radio />} label="Client" />
                    <FormControlLabel value={TYPE_SERVER} control={<Radio />} label="Server" />
                </RadioGroup>
            </Box>
        )
    }

    renderStep3 = () => {
        const { classes } = this.props;
        const { type } = this.state;
        return (
            <Box className={classes.form}>
                {
                    this.step_type_map[type]()
                }
            </Box>
        )
    }

    renderStepTypeClient = () => {
        const { server_id } = this.state;
        return (
            <Fragment>
                <Typography>
                    Your friend is ought to be server. Ask him to provide you his ID
                </Typography>
                <TextInput
                    onChange={this.handleClientChange}
                    onSubmit={this.handleClientSubmit}
                    placeholder="Enter your friend's id"
                    value={server_id}
                />
            </Fragment>
        )
    }

    handleClientChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            server_id: value,
        }));
    }

    handleClientSubmit = () => {
        this.handleNicknameSubmitDecorator(this.submitClient);
    }

    renderStepTypeServer = () => {
        const socket = this.context;
        return (
            <Fragment>
                <Typography>
                    Share your ID with your friend
                </Typography>
                <Typography>
                    <code>
                        {socket.id}
                    </code>
                </Typography>
            </Fragment>
        )
    }

    handleNicknameChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            nickname: value,
        }));
    }

    handleType = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            type: value,
        }));
    }

    handleBack = () => {
        this.setState(state => ({
            step_number: state.step_number - 1,
        }));
    }

    handleNext = () => {
        const { step_number } = this.state;
        if(step_number === 0) this.handleNicknameSubmit();
        else if(step_number === 2) this.handleClientSubmit();
        else {
            this.setState(state => ({
                step_number: state.step_number + 1,
            }));
        }
    }

    handleNicknameSubmit = () => {
        this.handleNicknameSubmitDecorator(this.submitNickname);
    }

    submitNickname = () => {
        const { nickname } = this.state;
        const { socketValidateNickname } = this.props;
        socketValidateNickname({
            nickname,
        });
    }

    submitClient = () => {
        const { server_id } = this.state;
        const { makeConnection } = this.props;
        makeConnection({
            server_id
        });
    }

    render() {
        const { step_number, type } = this.state;
        const { classes } = this.props;
        return (
            <Fragment>
                <Stepper activeStep={step_number} orientation="vertical">
                    {
                        this.steps.map(({ label, layout }, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        {layout()}
                                        <Box className={classes.actionsContainer}>
                                            <Button
                                                disabled={step_number === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            {
                                                step_number === 2 ? null : (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.handleNext}
                                                        className={classes.button}
                                                    >
                                                        {step_number === this.steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                )
                                            }
                                        </Box>
                                    </StepContent>
                                </Step>
                            )
                        })
                    }
                </Stepper>
            </Fragment>
        )
    }

}

Lobby.contextType = SocketContext;

export default connect(
    store => {
        return {
            isConnected: store.socket.isConnected,
        }
    },
    dispatch => {
        return {
            socketValidateNickname: data => dispatch(socketValidateNickname(data)),
            makeConnection: data => dispatch(makeConnection(data)),
            startListenLobby: callback => dispatch(listenLobby(true, callback)),
            stopListenLobby: callback => dispatch(listenLobby(false, callback)),
        }
    }
)(withStyles(styles)(Lobby));
