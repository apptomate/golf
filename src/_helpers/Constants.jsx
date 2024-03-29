export const BASE_URL = 'https://golfapp.azurewebsites.net/api/';
//Authentication
export const LOGIN_URL = BASE_URL + 'JWTAuthentication/login';
export const GENERATEEMAILOTP_URL = BASE_URL + 'User/generateOTP';
export const UPDATEPASSWORD_URL = BASE_URL + 'User/updatePassword';
//USERS
export const ALLUSERS_URL = BASE_URL + 'User/listUser';
export const REMOVEUSER_URL = BASE_URL + 'User/deleteUser';
export const ALLUSERTYPES_URL = BASE_URL + 'User/userType';
export const ADDUSER_URL = BASE_URL + 'User/createUser';
export const UPLOADUSERPROFILE_URL = BASE_URL + 'UploadFile/UploadFileBase64';
export const ALLPLAYERS_URL = BASE_URL + 'User/getPlayerList';
export const UPDATEUSER_URL = BASE_URL + 'User/updateUser';
//TEAM
export const ALLTEAMS_URL = BASE_URL + 'Team/listTeam';
export const ADDTEAM_URL = BASE_URL + 'Team/createTeam';
export const ADDTEAMPLAYERS_URL = BASE_URL + 'Team/createTeamPlayers';
//MATCH
export const ALLMATCHES_URL = BASE_URL + 'Match/getMatches';
export const ALLCOMPETITIONTYPES_URL = BASE_URL + 'Match/getCompetitionType';
export const ALLMATCHRULESLIST_URL = BASE_URL + 'Match/getMatchRulesList';
export const ADDMATCH_URL = BASE_URL + 'Match/createMatch';
export const ADDMATCHRULE_URL = BASE_URL + 'Match/matchRules';
//OTHERS
export const ALLCOUNTRIES_URL = BASE_URL + 'Country/GetCountryList';
export const COUNTRYSTATES_URL = BASE_URL + 'Country/GetStateList';
