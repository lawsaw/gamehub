import { PureComponent } from 'react';
import { connect } from "react-redux";
import { setApp } from '../actions/app';

class Page extends PureComponent {

    componentDidMount() {
        const { setApp, header } = this.props;
        setApp({ header });
    }

    componentWillUnmount() {
        const { setApp } = this.props;
        setApp({
            header: null,
        });
    }

    render() {
        const { component } = this.props;
        return component
    }

}

export default connect(
    null,
    dispatch => {
        return {
            setApp: obj => dispatch(setApp(obj)),
        }
    }
)(Page);
