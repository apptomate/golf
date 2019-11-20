import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllUserTypes(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLUSERTYPES_SUCCESS:
            return { data: payload, error: false };
        case types.ALLUSERTYPES_ERROR:
            return { data: payload, error: true }
        default:
            return state;
    }
}