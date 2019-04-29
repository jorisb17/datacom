import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setRoute} from '../actions/NavActions'

class Index extends Component {

    componentDidMount() {
        this.props.onRouteChange("Dashboard")
    }


    render() {
        return (
            <div>
                Hello there
            </div>
        );
    }
}

const actions = (dispatch) => ({
    onRouteChange: (route) => dispatch(setRoute(route)),
});

export default connect(null, actions)(Index);