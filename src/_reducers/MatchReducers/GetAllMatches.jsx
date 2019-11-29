import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllMatches(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLMATCHES_LOADING:
            return { data: payload, loading: true };
        case types.ALLMATCHES_SUCCESS:
            return { data: payload, loading: false };
        case types.ALLMATCHES_ERROR:
            return { data: payload, loading: false }
        default:
            return state;
    }
}