import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '../../../components';
import { preventMultipleSubmit } from '../helpers/etc';
import { updateConfig } from "../../../actions/crocodile";
import { socketValidateNickname } from "../../../socket/crocodile_emit";

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
            nickname: store.crocodile.config.nickname,
        }
    },
    dispatch => {
        return {
            updateConfig: config => dispatch( updateConfig(config) ),
            socketValidateNickname: nickname => dispatch( socketValidateNickname(nickname) ),
        }
    }
)(Nickname);