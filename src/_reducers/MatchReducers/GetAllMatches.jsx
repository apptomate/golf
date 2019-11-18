import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllMatches(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLMATCHES_LOADING:
            return { data: payload, loading: true, error: false };
        case types.ALLMATCHES_SUCCESS:
            return { data: payload, loading: false, error: false };
        case types.ALLMATCHES_ERROR:
            return { data: payload, loading: false, error: true }
        default:
            return state;
    }
}