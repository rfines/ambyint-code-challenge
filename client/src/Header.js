import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SimpleMenu from './SimpleMenu'
import IconButton from '@material-ui/core/IconButton'
import Map from '@material-ui/icons/Map'

const styles = {
    root: {
      flexGrow: 1,
      backgroundColor:'#f26822 !important',
      color: 'white'
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },

  };

class Header extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        setView: PropTypes.func.isRequired,
        view: PropTypes.string.isRequired,
        hasChecked: PropTypes.bool
    }
   
    render() {
        const { classes, view, hasChecked } = this.props
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>

                        <SimpleMenu style={{marginRight: '5vh'}} setView={this.props.setView} selectedView={view} />
                        {(view === 'list' || view === 'both') && hasChecked && <IconButton style={{marginRight: '5vh'}} onClick={this.props.showChecked} ><Map /></IconButton>}
                        <img src="https://uploads-ssl.webflow.com/595da6bcf2c0484f28955b95/595da932af14213ee1b98233_logo.png" alt="Ambyint company logo" height='40'/>
                    
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);