import Axios from 'axios';
import { ALLUSERS_URL, ALLTEAMS_URL, ALLMATCHES_URL } from '../_helpers/Constants';
import { authHeader } from '../_helpers/AuthHeaders';
import {
    ALLUSERS_LOADING, ALLUSERS_SUCCESS, ALLUSERS_ERROR,
    ALLTEAMS_ERROR, ALLTEAMS_LOADING, ALLTEAMS_SUCCESS,
    ALLMATCHES_ERROR, ALLMATCHES_LOADING, ALLMATCHES_SUCCESS,
} from './ActionTypes';
import { handleResponse } from '../_helpers/HandleResponse';

//Users
//Get All Users
export function getAllUsers() {
    return dispatch => {
        dispatch({
            type: ALLUSERS_LOADING
        });
        Axios.get(ALLUSERS_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLUSERS_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: ALLUSERS_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}

//Teams
//Get All Teams
export function getAllTeams() {
    return dispatch => {
        dispatch({
            type: ALLTEAMS_LOADING
        });
        Axios.get(ALLTEAMS_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLTEAMS_SUCCESS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: ALLTEAMS_ERROR,
                        payload: error.response
                    });
                }
            });
    };
}

//Match
//Get All Matches
export function getAllMatches() {
    return dispatch => {
        dispatch({
            type: ALLMATCHES_LOADING
        });
        Axios.get(ALLMATCHES_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLMATCHES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: ALLMATCHES_ERROR,
                        payload: error.response
                    });
                }
            });
    };
}


