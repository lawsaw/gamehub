import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from "@material-ui/core";
import { TextInput } from '../../../components';
import { ChatWindow } from './';
import { preventMultipleSubmit } from '../../../helpers/etc';
import { socketChat, socketMessageMark } from "../../../socket/crocodile";

const styles = (theme) => ({
    chat: {
        flexGrow: 1,
    },
    wrapChat: {
        position: 'relative',
        height: '100%',
        margin: 0,
    },
    wrapMessages: {
        position: 'relative',
        flexGrow: 1,
        padding: '0 !important',
    },
    wrapSubmit: {
        flexShrink: 0,
        padding: `${theme.spacing(1)}px 0 0 0 !important`,

    },
    textField: {
        width: '100%',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
});

class Chat extends PureComponent {

    constructor(props) {
        super(props);
        this.lockFuncChat = preventMultipleSubmit();
        this.state = {
            message: '',
        }
    }

    onChat = (message) => {
        const { socketChat } = this.props;
        socketChat(message);
    }

    handleChat = () => {
        const { message } = this.state;
        if(message.length > 0) {
            this.setState(() => ({
                message: '',
            }));
            this.lockFuncChat(() => this.onChat(message));
        }
    }

    handleMessageChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            message: value,
        }));
    }

    handleLikeMessage = id => value => {
        const { socketMessageMark } = this.props;
        socketMessageMark(id, value);
    }

    render() {
        const { classes, painterMode } = this.props;
        const { message } = this.state;
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                className={classes.wrapChat}
            >
                <Grid
                    item
                    className={classes.wrapMessages}
                >
                    <ChatWindow
                        painterMode={painterMode}
                        onLikeMessage={this.handleLikeMessage}
                    />
                </Grid>
                {
                    !painterMode ? (
                        <Grid
                            item
                            className={classes.wrapSubmit}
                        >
                            <TextInput
                                onChange={this.handleMessageChange}
                                onSubmit={this.handleChat}
                                placeholder="Message"
                                value={message}
                                className={classes.textField}
                                elevation={5}
                            />
                        </Grid>
                    ) : null
                }
            </Grid>
        )
    }
}

export default connect(
    null,
    dispatch => {
        return {
            socketChat: message => dispatch( socketChat(message) ),
            socketMessageMark: (id, value) => dispatch( socketMessageMark(id, value) ),
        }
    }
)(withStyles(styles)(Chat));