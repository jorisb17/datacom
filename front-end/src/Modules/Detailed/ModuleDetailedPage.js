import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestModule} from "../../actions/ModuleActions";
import {setRoute} from "../../actions/NavActions";
import LoadingComponent from "../../Components/Loading/LoadingComponent";
import DetailCard from '../../Components/Card/DetailCard';

import Grid from '@material-ui/core/Grid';


class ModuleDetailedPage extends Component {

    componentDidMount() {
       this.props.requestModule(this.props.match.params.id);
       this.props.setRoute("Module");
    }

    component = () =>{
        module = this.props.module;
        return(
            <Grid container spacing={8}>
                <Grid item md={12} sm={12}>
                    <DetailCard name={"Temperatuur"} min={module.mintemp} gem={module.gemtemp} max={module.maxtemp} tijd={module.tijd} moduleId={module.ModuleId}/>
                </Grid>
                <Grid item md={12} sm={12}>
                    <DetailCard name={"Licht"} min={module.minlicht} gem={module.gemlicht} max={module.maxlicht} tijd={module.tijd} moduleId={module.ModuleId}/>
                </Grid>
                <Grid item md={12} sm={12}>
                    <DetailCard name={"Sensor 3"} min={module.minsensor} gem={module.gemsensor} max={module.maxsensor} tijd={module.tijd} moduleId={module.ModuleId}/>
                </Grid>
            </Grid>
        )
    };

    render() {
        return (
            <div>
                {this.props.isPending ?
                    <LoadingComponent/>
                    :
                    this.component()
                }
            </div>
        );
    }
}

const mapState = state => ({
    module: state.requestModule.module,
    isPending: state.requestModule.isPending
});

const actions = (dispatch) =>({
    requestModule: (id) => dispatch(requestModule(id)),
    setRoute: (route) => dispatch(setRoute(route))
});

export default connect(mapState, actions)(ModuleDetailedPage);