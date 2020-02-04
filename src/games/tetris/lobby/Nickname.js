import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '../../../components';
import { preventMultipleSubmit } from '../../../helpers/etc';
import { socketValidateNickname} from '../../../socket/tetris';
import { updateConfig } from "../../../actions/tetris";
import ResponseContext from '../../../helpers/ResponseContext';

class Nickname extends PureComponent {

    constructor(props) {
        super(props);
        this.handleNicknameSubmitDecorator = preventMultipleSubmit();
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
        const { nickname, updateConfig, socketValidateNickname } = this.props;
        let response = await socketValidateNickname(nickname);
        validateResponse(response, data => {
            updateConfig(data);
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
            nickname: store.tetris.config.nickname,
        }
    },
    dispatch => {
        return {
            updateConfig: config => dispatch( updateConfig(config) ),
            socketValidateNickname: nickname => dispatch( socketValidateNickname(nickname) ),
        }
    }
)(Nickname);