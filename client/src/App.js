import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import Loader from 'react-loader-spinner'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import {Search, Replay } from '@material-ui/icons'
import { debounce } from 'lodash'

import Header from './Header'
import Container from './Container'
import AddressList from './AddressList'
import Map from './Map'
import './App.css'
import { IconButton } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

class App extends Component {
  state = {
    addresses: [],
    view: 'map',
    search: '',
    filter: {
      field: 'location_type',
      value: 'ROOFTOP'
    }
    
  }
  constructor(props) {
    super(props)
    this.debouncedSearch = debounce(this.doSearch, 500)
    
  }
  componentDidMount() {
    this.fetchAddresses()
  }
  fetchAddresses() {
    return fetch('/addresses', { accept: 'application/json' })
    .then(response => response.json())
    .then((data) => {
      this.setState({ addresses: data, allAddresses: data })
    })
  }
  setView = (view) => {
    this.setState({ view })
  }
  renderSearch = () => {
    return (
      <div style={{marginTop: '3vh', marginBottom: '3vh'}}>
        <TextField
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                      <Search />
                  </InputAdornment>
                ),
            }}
            onChange={this.search}
            value={this.state.search}
            helperText="Enter search term"
            label="Search"
            style={{maxWidth: '350vh', borderBottomColor: '#f26822'}}
        />
        <IconButton aria-label="Reset Search" color="primary" onClick={this.resetSearch}>
          <Replay />
        </IconButton>
      </div>
    )
  }
  resetSearch = () => {
    this.setState({search: '', addresses: this.state.allAddresses, checked: [] })
  }
  doSearch = (value) => {
      const addrs = this.state.addresses
      if (addrs && addrs.length > 0) {
          if(value === '' || !value) {
              this.setState({ addresses: this.state.allAddresses, filter: { field: undefined, value: undefined } })
          } else {
              let matches = addrs.filter((addr) => {
                  let address = addr.address
                  return address.toLowerCase().indexOf(value.toLowerCase()) >= 0
              })
              this.setState({ addresses: matches, filter: { field: 'address', value } })    
          }
      }
      return value
    }
  search = (event) => {
      event.persist()
      return this.setState({search: event.target.value}, () => {
          return this.debouncedSearch(event.target.value)
      })
  }
  
  resetChecked = () => {
    this.setState({ addresses: this.state.allAddresses })
  }
  showChecked = (checked) => {
    let { addresses } = this.state
    this.setState({ addresses: addresses.filter(a => checked.indexOf(a._id) >= 0), view: 'map' })
  }
  render() {
    const { view, addresses } = this.state
    let headline = 'Map View'
    if (view === 'list') {
      headline = 'Address List View'
    } else if (this.state.view === 'both') {
      headline = 'Combined View'
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header setView={this.setView} view={view} />
          <div style={{justifyContent: 'center'}}>
            {this.renderSearch()}
          </div>
          {addresses && addresses.length >  0 ? 
          
            <Container changeView={this.changeView} headline={headline}>
              {(view === 'map' || view === 'both') ?
                <Map
                  isMarkerShown={true}
                  addresses={this.state.addresses}>
                </Map> : <div></div>
              }
              {(view === 'list' || view === 'both' ) ? 
                <AddressList addresses={addresses} showChecked={this.showChecked} resetChecked={this.resetChecked}/>
              :<div></div>}
              
            </Container>
          : <Loader 
              type="Rings"
              color="orange"
              height="100"	
              width="100"
            />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
