import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';

class Page404 extends PureComponent {

    render() {
        console.log(this.props);
        return (
            <Typography
                variant="h1"
            >
                404
            </Typography>
        )
    }

}

export default Page404;

