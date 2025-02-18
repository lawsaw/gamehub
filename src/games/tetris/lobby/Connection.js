import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Typography } from '@material-ui/core';
import SocketContext from '../../../helpers/SocketContext';
import { updateConfig } from "../../../actions/tetris";
import { TextInput, Stepper } from "../../../components";
import { preventMultipleSubmit } from "../../../helpers/etc";
import { socketMakeConnection } from '../../../socket/tetris';
import ResponseContext from '../../../helpers/ResponseContext';
import { LOBBY_STEP_TYPE_SELECTING } from "../helpers/constants";

const styles = theme => ({
    form: {
        margin: theme.spacing(2),
        width: 200,
    },
});

const TYPE_CLIENT = 'TYPE_CLIENT';
const TYPE_SERVER = 'TYPE_SERVER';

class Connection extends PureComponent {

    constructor(props) {
        super(props);
        this.handleNicknameSubmitDecorator = preventMultipleSubmit();
        this.step_type_map = {
            [TYPE_CLIENT]: this.renderStepTypeClient,
            [TYPE_SERVER]: this.renderStepTypeServer,
        };
        this.state = {
            server_id: '',
        }
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

    renderStepTypeServer = () => {
        return (
            <SocketContext.Consumer>
                {
                    socket => (
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
            </SocketContext.Consumer>
        )
    }

    handleClientChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            server_id: value,
        }));
    }

    submitClient = async () => {
        const validateResponse = this.context;
        const { server_id } = this.state;
        const { socketMakeConnection } = this.props;
        let response = await socketMakeConnection(server_id);
        validateResponse(response);
    }

    handleClientSubmit = () => {
        this.handleNicknameSubmitDecorator(this.submitClient);
    }

    handleBack = () => {
        const { updateConfig } = this.props;
        updateConfig({
            step: LOBBY_STEP_TYPE_SELECTING,
        })
    }

    render() {
        const { classes, type } = this.props;
        return (
            <Box className={classes.form}>
                {
                    this.step_type_map[type]()
                }
                <Stepper
                    onBack={this.handleBack}
                    onNext={this.submitClient}
                    isNext={false}
                />
            </Box>
        )
    }
}

Connection.contextType = ResponseContext;

export default connect(
    store => {
        return {
            type: store.tetris.config.type,
        }
    },
    dispatch => {
        return {
            updateConfig: config => dispatch( updateConfig(config) ),
            socketMakeConnection: server_id => dispatch( socketMakeConnection(server_id) ),
        }
    }
)(withStyles(styles)(Connection));