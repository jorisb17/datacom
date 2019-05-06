import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setRoute} from '../actions/NavActions'
import Chart from '../Components/Chart/Chart'
import Table from '../Components/Table/Table'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    tableContainer: {
        height: 320,
    }
};

class Index extends Component {

    componentDidMount() {
        this.props.onRouteChange("Dashboard")
    }


    render() {
        const data = [
            { name: '0:00', Temperatuur: 20},
            { name: '0:20', Temperatuur: 22},
            { name: '0:25', Temperatuur: 25},
            { name: '0:40', Temperatuur: 18},
            { name: '0:54', Temperatuur: 30},
            { name: '1:40', Temperatuur: 31},
            { name: '1:50', Temperatuur: 34},
        ];
        const {classes} = this.props;
        return (
            <div>
                <Chart data={data} />
                <br/>
                <div className={classes.tableContainer}>
                    <Table />
                </div>
            </div>
        );
    }
}

const actions = (dispatch) => ({
    onRouteChange: (route) => dispatch(setRoute(route)),
});

export default connect(null, actions)(withStyles(styles)(Index));