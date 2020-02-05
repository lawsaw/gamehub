import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '../../../components';
import { preventMultipleSubmit } from '../helpers/etc';
import { updateConfig, updateRoomList } from "../../../actions/crocodile";
import { socketValidateNickname } from "../../../socket/crocodile";
import ResponseContext from '../../../helpers/ResponseContext';

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
        const { updateConfig } = this.props;
        updateConfig({
            nickname: value,
        });
    }

    submitNickname = async () => {
        const validateResponse = this.context;
        const { nickname, updateConfig, socketValidateNickname, updateRoomList } = this.props;
        let response = await socketValidateNickname(nickname);
        validateResponse(response, ({ config, rooms }) => {
            updateConfig(config);
            updateRoomList(rooms);
        });
    }

    handleNicknameSubmit = () => {
        this.handleNicknameSubmitDecorator(this.submitNickname);
    }

    render() {
        const { nickname } = this.props;
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

Nickname.contextType = ResponseContext;

export default connect(
    store => {
        return {
            nickname: store.crocodile.config.nickname,
        }
    },
    dispatch => {
        return {
            updateConfig: config => dispatch( updateConfig(config) ),
            updateRoomList: rooms => dispatch( updateRoomList(rooms) ),
            socketValidateNickname: nickname => dispatch( socketValidateNickname(nickname) ),
        }
    }
)(Nickname);