import Axios from 'axios';
import {
    ALLUSERS_URL, ALLTEAMS_URL, ALLMATCHES_URL, ALLCOUNTRIES_URL,
    COUNTRYSTATES_URL, REMOVEUSER_URL, ALLUSERTYPES_URL, ADDUSER_URL, UPLOADUSERPROFILE_URL,
    ADDTEAM_URL
} from '../_helpers/Constants';
import { authHeader } from '../_helpers/AuthHeaders';
import {
    ALLUSERS_LOADING, ALLUSERS_SUCCESS, ALLUSERS_ERROR,
    ALLTEAMS_ERROR, ALLTEAMS_LOADING, ALLTEAMS_SUCCESS,
    ALLMATCHES_ERROR, ALLMATCHES_LOADING, ALLMATCHES_SUCCESS,
    ALLCOUNTRIES_SUCCESS, ALLCOUNTRIES_ERROR,
    COUNTRYSTATES_SUCCESS, COUNTRYSTATES_ERROR,
    REMOVEUSER_SUCCESS, REMOVEUSER_ERROR,
    ALLUSERTYPES_SUCCESS, ALLUSERTYPES_ERROR,
    ADDUSER_SUCCESS, ADDUSER_ERROR,
    UPLOADUSERPROFILE_SUCCESS, UPLOADUSERPROFILE_ERROR,
    ADDTEAM_SUCCESS, ADDTEAM_ERROR
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
//Get All User Types
export function getAllUserTypes() {
    return dispatch => {
        Axios.get(ALLUSERTYPES_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLUSERTYPES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: ALLUSERTYPES_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}
//Add Users
export function addUser(formData) {
    return dispatch => {
        dispatch({
            type: ALLUSERS_LOADING
        });
        Axios.post(ADDUSER_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ADDUSER_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllUsers());
            })
            .catch(error => {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: ADDUSER_ERROR,
                        payload: error.response.data
                    });
                }
            })
    };
}
//Upload User Profile
export function uploadProfile(formData) {
    return dispatch => {
        Axios.post(UPLOADUSERPROFILE_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: UPLOADUSERPROFILE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: UPLOADUSERPROFILE_ERROR,
                        payload: error.response.data
                    });
                }
            })
    };
}
//Remove User
export function removeUser(userId) {
    return dispatch => {
        dispatch({
            type: ALLUSERS_LOADING
        });
        Axios.delete(REMOVEUSER_URL + '/' + userId, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: REMOVEUSER_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllUsers());
            })
            .catch(error => {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: REMOVEUSER_ERROR,
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
//Add Team
export function addTeam(formData) {
    return dispatch => {
        Axios.post(ADDTEAM_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLTEAMS_LOADING
                });
                dispatch({
                    type: ADDTEAM_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllTeams());
            })
            .catch(error => {
                if (error.response) {
                    //handleResponse(error.response);
                    dispatch({
                        type: ADDTEAM_ERROR,
                        payload: error.response.data
                    });
                }
            })
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

//Get All Countries
export function getAllCountries() {
    return dispatch => {
        Axios.get(ALLCOUNTRIES_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLCOUNTRIES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: ALLCOUNTRIES_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}
//Get States List
export function getCountryStates(countryId) {
    return dispatch => {
        Axios.get(COUNTRYSTATES_URL + '/' + countryId, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: COUNTRYSTATES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    handleResponse(error.response);
                    dispatch({
                        type: COUNTRYSTATES_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}





