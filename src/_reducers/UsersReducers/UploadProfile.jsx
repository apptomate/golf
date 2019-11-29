import * as types from '../../_actions/ActionTypes';
import { stringInitial } from '../InitialState';

export function uploadProfile(state = stringInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.UPLOADUSERPROFILE_SUCCESS:
            return { data: payload };
        case types.UPLOADUSERPROFILE_ERROR:
            return { data: payload }
        default:
            return state;
    }
}