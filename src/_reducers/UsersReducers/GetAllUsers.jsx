import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllUsers(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLUSERS_LOADING:
            return { data: payload, loading: true };
        case types.ALLUSERS_SUCCESS:
            return { data: payload, loading: false };
        case types.ALLUSERS_ERROR:
            return { data: payload, loading: false }
        default:
            return state;
    }
}