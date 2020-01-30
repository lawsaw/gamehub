import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Preview as PreviewComponent } from '../components';

class Preview extends PureComponent {

    render() {
        const { preview } = this.props;
        return (
            <PreviewComponent
                preview={preview}
            />
        )
    }

}

export default connect(
    store => {
        return {
            preview: store.tetris.isGameRunning && store.tetris.figureNext[store.tetris.rotationNext],
        }
    },
)(Preview);
