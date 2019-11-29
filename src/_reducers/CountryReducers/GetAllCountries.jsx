import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllCountries(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLCOUNTRIES_SUCCESS:
            return { data: payload };
        case types.ALLCOUNTRIES_ERROR:
            return { data: payload }
        default:
            return state;
    }
}