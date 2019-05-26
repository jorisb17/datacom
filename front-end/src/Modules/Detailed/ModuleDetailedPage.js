import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestModule} from "../../actions/ModuleActions";
import {setRoute} from "../../actions/NavActions";
import LoadingComponent from "../../Components/Loading/LoadingComponent";


class ModuleDetailedPage extends Component {

    componentDidMount() {
        this.props.requestModule(this.props.match.params.id);
    }

    component = () =>{
        return(
            <div>
                {this.props.module.name}
            </div>
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
})

export default connect(mapState, actions)(ModuleDetailedPage);