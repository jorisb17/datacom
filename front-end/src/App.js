import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable'
import LoadingComponent from "./Components/Loading/LoadingComponent";
import ResDrawer from './Components/Drawer/Drawer'
import SignIn from './SignIn/SignIn';
import {connect} from "react-redux";

const AsyncMain = Loadable({
    loader: () => import('./Modules/ModulePage'),
    loading: LoadingComponent
});

const AsyncModules = Loadable({
    loader: () => import('./Modules/ModulePage'),
    loading: LoadingComponent
});

const AsyncModuleDetailed = Loadable({
    loader: () => import('./Modules/Detailed/ModuleDetailedPage'),
    loading: LoadingComponent
});


class App extends Component{
    state = {
        auth: true
    };

    render(){
        return (
            <div>
                <Route
                    render={() => (
                        <div>
                            {this.props.auth?
                            <ResDrawer>
                                <Switch>
                                    <Route exact path="/" component={AsyncMain}/>
                                    <Route exact path="/modules" component={AsyncModules} />
                                    <Route path="/modules/:id" component={AsyncModuleDetailed}/>
                                </Switch>
                            </ResDrawer>
                            :<SignIn/>}
                        </div>
                    )}
                />
            </div>
        );
    }
}

const mapState = (state) =>({
    auth: state.auth.auth
})

export default connect(mapState)(App);
