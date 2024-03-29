import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getCountryStates(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.COUNTRYSTATES_SUCCESS:
            return { data: payload };
        case types.COUNTRYSTATES_ERROR:
            return { data: payload }
        default:
            return state;
    }
}