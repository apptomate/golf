import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllTeams(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLTEAMS_LOADING:
            return { data: payload, loading: true };
        case types.ALLTEAMS_SUCCESS:
            return { data: payload, loading: false };
        case types.ALLTEAMS_ERROR:
            return { data: payload, loading: false }
        default:
            return state;
    }
}