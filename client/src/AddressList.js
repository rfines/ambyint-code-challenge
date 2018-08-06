import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Map from '@material-ui/icons/Map'
import Replay from '@material-ui/icons/Replay'

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
        bakcgroundColor: 'orange !important'
    }
});
class AddressList extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        showChecked: PropTypes.func.isRequired,
        resetChecked: PropTypes.func.isRequired,
    }
    state = {
        checked: [],
    }
    
    handleToggle = _id => () => {
        const { checked } = this.state
        const currentIndex = checked.indexOf(_id);
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(_id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({ checked: newChecked })
    }
    clearChecked = () => {
        this.setState({checked: []}, () => this.props.resetChecked())
    }
    render() {
        const { classes, addresses } = this.props
        return (
            <div className={classes.root}>
                <List subheader={<ListSubheader>
                    {this.state.checked && this.state.checked.length > 0 ? <div><Button variant="contained" className={classes.button} onClick={() => this.props.showChecked(this.state.checked)}>
                        <Map />
                        View Checked on Map
                    </Button>
                    <Button variant="contained" className={classes.button} onClick={() => this.clearChecked()}>
                        <Replay />
                        Reset
                    </Button></div> : <div></div>}
                    </ListSubheader>}
                >
                    {addresses.map(address => (
                        <ListItem
                            key={address._id}
                            role={undefined}
                            dense
                            button
                            onClick={this.handleToggle(address._id)}
                            className={classes.listItem}
                        >
                            <Checkbox
                                checked={this.state.checked.indexOf(address._id) !== -1}
                                tabIndex={-1}
                                color="default"
                            />
                            <ListItemText primary={`File Input Value: ${address.address}`} secondary={`Google Maps Response: ${address.formattedAddress} -- ${address.geo.location_type}, with coordinates of ${address.geo.location.lat}, ${address.geo.location.lng}`} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}


export default withStyles(styles)(AddressList)