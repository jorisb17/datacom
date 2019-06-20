import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import Divider from '@material-ui/core/Divider/index';
import Drawer from '@material-ui/core/Drawer/index';
import Hidden from '@material-ui/core/Hidden/index';
import IconButton from '@material-ui/core/IconButton/index';
import TimelineIcon from '@material-ui/icons/TimelineRounded';
import MenuIcon from "@material-ui/icons/MenuRounded"
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index'
import ListItemText from '@material-ui/core/ListItemText/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Typography from '@material-ui/core/Typography/index';
import { withStyles } from '@material-ui/core/styles/index';

import LoadingComponent from "../Loading/LoadingComponent";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class ResDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme, children } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <Link style={{"textDecoration": "none"}} to={`/`}>
                        <ListItem button>
                            <ListItemIcon><TimelineIcon /></ListItemIcon>
                            <ListItemText primary={"Module lijst"} />
                        </ListItem>
                    </Link>
                </List>
            </div>
        );

        return (
            <div>
            {this.state.isPending ?
                <LoadingComponent/>
                :
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                {this.props.route}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={this.props.container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </div>
            }
            </div>
        );
    }
}

ResDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

const mapState = (state) => {
    return{
        route: state.changeRoute.route
    }
};


export default connect(mapState)(withStyles(styles, { withTheme: true })(ResDrawer));