import React, {Component} from "react";
import {connect} from "react-redux";
import {requestAllModules} from "../actions/ModuleActions";
import {setRoute} from "../actions/NavActions";

import LoadingComponent from "../Components/Loading/LoadingComponent";
import ModulesList from "./ModulesList";


class ModulePage extends Component {

    componentDidMount() {
        this.props.requestAllModules();
        this.props.setRoute("Modules");
    }

    render() {
        return (
            <div>
                {this.props.isPending ?
                    <LoadingComponent />
                    :
                    <ModulesList modules={this.props.modules}/>
                }
            </div>
        );
    }
}

const mapState = state =>({
    modules: state.requestAllModules.modules,
    isPending: state.requestAllModules.isPending
});

const actions = (dispatch) => ({
    requestAllModules: () => dispatch(requestAllModules),
    setRoute: (route) => dispatch(setRoute(route))
});

export default connect(mapState, actions)(ModulePage);