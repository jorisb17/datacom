import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable'
import LoadingComponent from "./Loading/LoadingComponent";
import ResDrawer from './Drawer/Drawer'
import SignIn from './SignIn/SignIn';
import {connect} from "react-redux";

const AsyncMain = Loadable({
    loader: () => import('./Main/'),
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
                            {this.state.auth?
                            <ResDrawer>
                                <Switch>
                                    <Route exact path="/" component={AsyncMain}/>
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
