import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function generateEmailOTP(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.GENERATEEMAILOTP_SUCCESS:
            return { data: payload };
        case types.GENERATEEMAILOTP_ERROR:
            return { data: payload }
        default:
            return state;
    }
}