import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'

  
/*
    Container element is the main surface for other elements
*/
class Container extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    }
    render() {
        const {children } = this.props
        return (
            <div>
                <Paper elevation={1}>
                    {children}
                </Paper>
            </div>
        )
    }
}

export default Container