import React, { PureComponent } from 'react';
import { withStyles } from "@material-ui/core";
import { TextInput } from '../../../components';
import { preventMultipleSubmit } from '../helpers/etc';
import { SOCKET_ON_NICKNAME_CHANGE } from '../helpers/constants';
import SocketContext from '../../../helpers/SocketContext';

const styles = () => ({

});

class Nickname extends PureComponent {

    constructor(props) {
        super(props);
        this.handleNicknameSubmitDecorator = preventMultipleSubmit();
        this.state = {
            nickname: '',
        }
    }

    handleNicknameChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({
            nickname: value,
        }));
    }

    submitNickname = () => {
        const socket = this.context;
        const { nickname } = this.state;
        socket.emit(SOCKET_ON_NICKNAME_CHANGE, {
            nickname,
        });
    }

    handleNicknameSubmit = () => {
        this.handleNicknameSubmitDecorator(this.submitNickname);
    }

    render() {
        const { nickname } = this.state;
        return (
            <TextInput
                onChange={this.handleNicknameChange}
                onSubmit={this.handleNicknameSubmit}
                placeholder="Enter your nickname"
                value={nickname}
            />
        )
    }
}

Nickname.contextType = SocketContext;

export default withStyles(styles)(Nickname);