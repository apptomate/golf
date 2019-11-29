import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllCompetitionTypes(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLCOMPETITIONTYPES_SUCCESS:
            return { data: payload };
        case types.ALLCOMPETITIONTYPES_ERROR:
            return { data: payload }
        default:
            return state;
    }
}