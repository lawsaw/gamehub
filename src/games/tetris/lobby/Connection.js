import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles, Box, Typography } from '@material-ui/core';
import SocketContext from '../../../helpers/SocketContext';
import { updateConfig } from "../../../actions/tetris";
import { TextInput, Stepper } from "../../../components";
import { preventMultipleSubmit } from "../../../helpers/etc";
import { makeConnection } from '../../../socket/tetris';

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

    handleClientChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            server_id: value,
        }));
    }

    handleClientSubmit = () => {
        this.handleNicknameSubmitDecorator(this.submitClient);
    }

    submitClient = () => {
        const { server_id } = this.state;
        const { makeConnection } = this.props;
        makeConnection(server_id);
    }

    handleBack = () => {
        const { updateConfig } = this.props;
        updateConfig({
            step: 'LOBBY_STEP_TYPE_SELECTING',
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

Connection.contextType = SocketContext;

export default connect(
    store => {
        return {
            type: store.tetris.config.type,
        }
    },
    dispatch => {
        return {
            updateConfig: config => dispatch( updateConfig(config) ),
            makeConnection: server_id => dispatch( makeConnection(server_id) ),
        }
    }
)(withStyles(styles)(Connection));