var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var RouteStore = require('../stores/RouteStore');
var GTFSUtils = require('../utils/GTFSUtils');

var CHANGE_EVENT = 'change';

// FIXME: stops should just be a list
// each stop should have the list of route ids it is associated with
// do a lookup by that list when displaying stops
var _stops = {};

function _addStops(routeId, rawStops) {
    _stops[routeId] = rawStops.map(GTFSUtils.convertRawStop);
}


var StopStore = assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCurrent() {
        var currentStops = {};

        RouteStore.getCurrentIds().map((routeId) => {
            var stopsForRoute = _stops[routeId] || [];
            stopsForRoute.forEach((stop) => {
                currentStops[stop.stopId] = stop;
            });
        });

        return Object.keys(currentStops).map((key) => currentStops[key]);
    },

    getAll() {
        return _stops;
    }
});


StopStore.dispatchToken = AppDispatcher.register((payload) => {
    AppDispatcher.waitFor([
        RouteStore.dispatchToken,
    ]);

    var action = payload.action;

    switch(action.type) {
        case AppConstants.ActionTypes.RECEIVE_RAW_STOPS:
            _addStops(action.routeId, action.rawStops);
            StopStore.emitChange();
            break;

        default:
            // po op
    }
});

module.exports = StopStore;
