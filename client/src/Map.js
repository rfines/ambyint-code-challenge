import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

/*
    Using recompose to easily create a composed component with the appropriate props to build a GoogleMap
    The final component accepts the following props:
        addresses: array of addresses to show
        selectedIndex: index of selected address to open the info window on the marker automatically
        isMarkerShown: boolean to show markers or not, false === blank map, true === map with markers
*/
const ComposedMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAfxgBGZgaBNDlfm5S_2GON5GegfdUeqk0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={5}
        defaultCenter={props.addresses && props.addresses.length > 0 ?{ ...props.addresses[0].geo.location }: { lat: 51.1004866, lng: -114.0324557 }}
    >
        {props.isMarkerShown && props.addresses && props.addresses.length > 0 ?
            props.addresses.map((a, index) => {
                return (
                    <Marker key={index} position={{...a.geo.location}} onClick={(e) => props.onMarkerClick(a)}>
                    {props.selectedId && props.selectedId === a._id ? 
                      <InfoWindow onCloseClick={(e) => props.onInfoWindowCloseClick()} children={<div>{a.formattedAddress} -- {a.geo.location_type} , {a.geo.location.lat} , {a.geo.location.lng}</div>}></InfoWindow>
                      :<div></div>}
                    </Marker>
                )
            })
            : undefined}
    </GoogleMap>
);

class Map extends PureComponent {
    state = {
      isMarkerShown: false,
      selectedMarker: undefined
    }
    static propTypes = {
        addresses: PropTypes.array.isRequired,
        selectedIndex: PropTypes.number        
    }
    componentDidMount() {
      this.delayedShowMarker()
    }
  
    delayedShowMarker = () => {
      setTimeout(() => {
        this.setState({ isMarkerShown: true })
      }, 1000)
    }
  
    handleMarkerClick = (a) => {
      this.setState({ selectedMarker: a._id })
    }
    clearSelected = () => {
      this.setState({ selectedMarker: undefined })
    }
    render() {
      return (
        <ComposedMap
            addresses={this.props.addresses}
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
            onInfoWindowCloseClick={this.clearSelected}
            selectedId={this.state.selectedMarker}
        />
      )
    }
  }
  export default Map