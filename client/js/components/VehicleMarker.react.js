var React = require("react");
var Leaflet = require("leaflet");
<<<<<<< Updated upstream:client/js/components/VehicleMarker.react.js
var latlngType = require("react-leaflet").PropTypes.latlng;
var popupContainerMixin = require("react-leaflet").mixins.popupContainer;
require('leaflet.label');
=======
var {Marker} = require('react-leaflet');
>>>>>>> Stashed changes:client/js/components/Leaflet.AnimatedMarker.react.js

function easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
}

function animateMarker(marker, i, steps, startLatLng, deltaLatLng) {
    var x = easeInOutCubic(i, startLatLng[0], deltaLatLng[0], steps),
        y = easeInOutCubic(i, startLatLng[1], deltaLatLng[1], steps);

    marker.setLatLng([x, y]);

    if (i < steps) {
        Leaflet.Util.requestAnimFrame(animateMarker.bind(null, marker, i + 1, steps, startLatLng, deltaLatLng), null, false, marker._container);
    }
}
window.Marker = Marker;

<<<<<<< Updated upstream:client/js/components/VehicleMarker.react.js

// Based on https://github.com/PaulLeCam/react-leaflet/blob/ba19dfc3db363b3b38a1d4131186d9168efc9504/src/Marker.js
module.exports = React.createClass({
  displayName: "VehicleMarker",

  mixins: [popupContainerMixin],

  propTypes: {
    position: latlngType.isRequired,
    animateSteps: React.PropTypes.number.isRequired,
    label: React.PropTypes.string,
  },

  componentWillMount() {
    var {map, position, ...props} = this.props;
    this._leafletElement = Leaflet.marker(position, props);

    if (this.props.label) {
        this._leafletElement.bindLabel(this.props.label, {
            noHide: true,
            direction: 'left',
            className: 'vehicle-leaflet-label',
            offset: [25, -10],
       });
    }
  },
=======
var AnimatedMarker = React.createClass({
  displayName: "AnimatedMarker",

  mixins: [Marker.mixins],

  componentWillMount: Marker.componentWillMount,
>>>>>>> Stashed changes:client/js/components/Leaflet.AnimatedMarker.react.js

  componentDidUpdate(prevProps) {
    if (this.props.position.lat !== prevProps.position.lat && this.props.position.lng !== prevProps.position.lng) {
        var marker = this.getLeafletElement();
        var deltaLatLng = [this.props.position.lat - prevProps.position.lat, this.props.position.lng - prevProps.position.lng];
<<<<<<< Updated upstream:client/js/components/VehicleMarker.react.js
        animateMarker(marker, 0, this.props.animateSteps, [ prevProps.position.lat,  prevProps.position.lng], deltaLatLng);
=======
        var steps = 200;
        animateMarker(marker, 0, steps, [ prevProps.position.lat,  prevProps.position.lng], deltaLatLng);
>>>>>>> Stashed changes:client/js/components/Leaflet.AnimatedMarker.react.js
    }
  }
});

module.exports = AnimatedMarker;