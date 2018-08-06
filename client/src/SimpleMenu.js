import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };
  static propTypes = {
      setView: PropTypes.func.isRequired,
      style: PropTypes.object,
      selectedView: PropTypes.string.isRequired
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = (view) => {
    this.setState({ anchorEl: null, view }, () => this.props.setView(view))
  };

  render() {
    const { anchorEl } = this.state
    const { selectedView, style } = this.props
    return (
      <div>
        <Button
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            style={style}
        >
            View
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
        >
            <MenuItem onClick={() => this.handleClose('map')} selected={'map' === selectedView} >Map</MenuItem>
            <MenuItem onClick={() => this.handleClose('list')} selected={'list' === selectedView}>List</MenuItem>
            <MenuItem onClick={() => this.handleClose('both')} selected={'both' === selectedView}>Both</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu