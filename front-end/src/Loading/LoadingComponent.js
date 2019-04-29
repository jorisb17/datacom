import React, {Component} from 'react';
import './LoadingComponent.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class LoadingComponent extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className="loading">
                <CircularProgress className={classes.progress} size={50} color="secondary"/>
            </div>
        );
    }
}

LoadingComponent.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoadingComponent);