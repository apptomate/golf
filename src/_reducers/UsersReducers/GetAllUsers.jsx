import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllUsers(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLUSERS_LOADING:
            return { data: payload, loading: true, error: false };
        case types.ALLUSERS_SUCCESS:
            return { data: payload, loading: false, error: false };
        case types.ALLUSERS_ERROR:
            return { data: payload, loading: false, error: true }
        default:
            return state;
    }
}