import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable'
import LoadingComponent from "./Loading/LoadingComponent";
import ResDrawer from './Drawer/Drawer'

const AsyncMain = Loadable({
    loader: () => import('./Main/'),
    loading: LoadingComponent
});


function App() {
    return (
        <div>
            <Route
                render={() => (
                    <div>
                        <ResDrawer>
                            <Switch>
                                <Route exact path="/" component={AsyncMain}/>
                            </Switch>
                        </ResDrawer>
                    </div>
                )}
            />
        </div>
    );
}

export default App;
