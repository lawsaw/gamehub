import React, { PureComponent, createRef, cloneElement } from 'react';
import cx from 'classnames';
import { withStyles, Box } from "@material-ui/core";

const styles = () => ({
    resizer: {
        position: 'absolute',
        minWidth: 50,
        minHeight: 50,
        transition: 'all 0.3s ease 0s',
    },
});

class Resizer extends PureComponent {

    constructor(props) {
        super(props);
        this.ref = createRef();
        this.getting = true;
        this.spacing = props.theme.spacing(2);
        this.state = {
            width: '100%',
            height: '100%',
        }
    }

    componentDidMount() {
        this.setSizeForce();
        window.addEventListener('resize', this.listener, false);
    }

    setSizeForce = () => {
        let size = this.getSize();
        this.setSize(size);
        setTimeout(() => {
            let size = this.getSize();
            this.setSize(size);
        }, 200);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.listener, false);
    }

    listener = () => {
        //console.log('listener');
        if(!this.getting) {
            clearTimeout(this.timer);
        };
        this.getting = false;
        this.timer = setTimeout(() => {
            this.getting = true;
            let size = this.getSize();
            //console.log(size);
            this.setSize(size);
        }, 250);
    }

    setType1 = (parentWidth) => {
        const { k } = this.props;
        let width = parentWidth - this.spacing;
        let height = width * k;
        return {
            width,
            height,
        }
    }

    setType2 = (parentHeight) => {
        const { k } = this.props;
        let height = parentHeight - this.spacing;
        let width = height / k;
        return {
            width,
            height,
        }
    }

    getSize = () => {
        if(!this.ref.current) return false;
        let { parentElement: { offsetWidth: parentOffsetWidth, offsetHeight: parentOffsetHeight } } = this.ref.current;
        let size;
        if(parentOffsetWidth < parentOffsetHeight) {
            //console.log('type 1');
            size = this.setType1(parentOffsetWidth);
            if(size.height > parentOffsetHeight) size = this.setType2(parentOffsetHeight);
        } else if(parentOffsetWidth > parentOffsetHeight) {
            //console.log('type 2');
            size = this.setType2(parentOffsetHeight);
            if(size.width > parentOffsetWidth) size = this.setType1(parentOffsetWidth);
        } else {
            console.log('type 3');
        }
        return size;
    }

    setSize = (size) => {
        if(!size) return false;
        let { width, height } = size;
        this.setState(() => ({
            width,
            height,
        }));
    }

    updateChildren = () => {
        const { children } = this.props;
        const { width, height } = this.state;
        return cloneElement(
            children,
            {
                resizer: {
                    width,
                    height,
                },
            },
        );
    }

    render() {
        const { classes, className } = this.props;
        const { width, height } = this.state;
        return (
            <Box
                className={cx(classes.resizer, className)}
                ref={this.ref}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
                {this.updateChildren()}
            </Box>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Resizer);