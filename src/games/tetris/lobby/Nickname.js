import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '../../../components';
import { preventMultipleSubmit } from '../../../helpers/etc';
import { socketValidateNickname} from '../../../socket/tetris';
import { updateConfig } from "../../../actions/tetris";

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

    submitNickname = () => {
        const { nickname } = this.props;
        const { socketValidateNickname } = this.props;
        socketValidateNickname(nickname);
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