import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllTeams(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLTEAMS_LOADING:
            return { data: payload, loading: true, error: false };
        case types.ALLTEAMS_SUCCESS:
            return { data: payload, loading: false, error: false };
        case types.ALLTEAMS_ERROR:
            return { data: payload, loading: false, error: true }
        default:
            return state;
    }
}