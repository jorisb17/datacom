import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setRoute} from '../actions/NavActions'
import Chart from '../Components/Chart/Chart'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import {apiCall} from "../api";
import LoadingComponent from "../Components/Loading/LoadingComponent";

const styles = {
    chartContainer: {
        marginLeft: -22,
    },
};

class Index extends Component {
    state = {
        modules: [],
        isPending: true
    };

    componentDidMount() {
        this.props.onRouteChange("Dashboard");
        apiCall('http://localhost:3000/modules')
            .then(data => this.setState({modules: data, isPending: false}))
            .catch(err => console.log(err))
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.state.isPending ?
                        <LoadingComponent/>
                        :
                    this.state.modules.map(module => {
                        return (
                            <div key={module.id}>
                                <Typography variant="h4" gutterBottom component="h2">
                                    {module.name}
                                </Typography>
                                <div className={classes.chartContainer}>
                                    <Chart data={module.data}/>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        );
    }
}

const actions = (dispatch) => ({
    onRouteChange: (route) => dispatch(setRoute(route)),
});

export default connect(null, actions)(withStyles(styles)(Index));