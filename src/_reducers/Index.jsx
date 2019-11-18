import { combineReducers } from 'redux';
import { getAllUsers } from './UsersReducers/GetAllUsers';
import { getAllTeams } from './TeamsReducers/GetAllTeams';
import { getAllMatches } from './MatchReducers/GetAllMatches';

const RootReducer = combineReducers({
    getAllUsers,
    getAllTeams,
    getAllMatches
});

export default RootReducer;