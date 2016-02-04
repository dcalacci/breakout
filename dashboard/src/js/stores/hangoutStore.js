import _ from 'underscore';
//var EventEmitter = require('events').EventEmitter;
import MicroEvent from 'microevent';

import AppDispatcher from '../dispatcher/dispatcher';
import HangoutListConstants from '../constants/HangoutListConstants';


var ActionTypes = HangoutListConstants.ActionTypes;
var CHANGE_EVENT = 'change';



class _HangoutStore {
    constructor() {
        this.hangouts = {};
    }

    getAll() {
        return _.values(this.hangouts) || [];
//        return this.hangouts;
    }

    get(id) {
        return this.hangouts[id];
    }
}

MicroEvent.mixin(_HangoutStore);


var HangoutStore = new _HangoutStore();


function _addHangout(hangout) {
    if (!_.has(HangoutStore.hangouts, hangout.hangout_id)) {
        HangoutStore.hangouts[hangout.hangout_id] = hangout;
    }
}

function _addHangouts(hangouts) {
    _.each(hangouts, function(hangout) {
        _addHangout(hangout);
    });
}



AppDispatcher.register(function(payload) {
    switch( payload.type ) {
        case ActionTypes.RECEIVE_ALL_HANGOUTS:
            console.log('[hangoutStore] got all hangouts:', payload);
            _addHangouts(payload.hangouts);
            HangoutStore.trigger(CHANGE_EVENT);
            break;
        case ActionTypes.RECEIVE_NEW_HANGOUT:
            console.log('[hangoutStore] got new hangout:', payload);
            _addHangout(payload.hangout);
            console.log('[hangoutStore] hangouts now:', HangoutStore.getAll());
            HangoutStore.trigger(CHANGE_EVENT);
            break;
        default:
            
    }
    
    return true;
});

exports.HangoutStore = HangoutStore;
