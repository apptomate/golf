import { combineReducers } from 'redux';
import { getAllUsers } from './UsersReducers/GetAllUsers';
import { getAllTeams } from './TeamsReducers/GetAllTeams';
import { getAllMatches } from './MatchReducers/GetAllMatches';
import { getAllCountries } from './CountryReducers/GetAllCountries';
import { getCountryStates } from './StateReducers/GetCountryStates';
import { removeUser } from './UsersReducers/RemoveUser';
import { getAllUserTypes } from './UsersReducers/UserTypes';
import { addUser } from './UsersReducers/AddUser';
import { uploadProfile } from './UsersReducers/UploadProfile';
import { addTeam } from './TeamsReducers/AddTeam';

const RootReducer = combineReducers({
    getAllUsers,
    getAllTeams,
    getAllMatches,
    getAllCountries,
    getCountryStates,
    removeUser,
    getAllUserTypes,
    addUser,
    uploadProfile,
    addTeam
});

export default RootReducer;