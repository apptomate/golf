import * as types from '../../_actions/ActionTypes';
import { stringInitial } from '../InitialState';
import { getAlertMessage } from '../../_helpers/Functions';
import Swal from 'sweetalert2';

export function uploadProfile(state = stringInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.UPLOADUSERPROFILE_SUCCESS:
            Swal.fire(getAlertMessage('success', 'Profile Uploaded Successfully'));
            return { data: payload, error: false };
        case types.UPLOADUSERPROFILE_ERROR:
            Swal.fire(getAlertMessage('error', payload.errorMessage));
            return { data: payload, error: true }
        default:
            return state;
    }
}