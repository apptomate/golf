import React, { Component, Fragment } from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Profile from '../Common/Profile/Index.jsx';
import Loader from '../Common/Loader/Index.jsx';
import { getAllTeams, addTeam, uploadProfile, getAllPlayers, addTeamPlayers } from '../_actions/Index.jsx';
import { loggedUserDetails } from '../_helpers/Functions.jsx';
import AddUpdateTeam from './Modals/AddUpdateTeam.jsx';
class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {},
            teamModal: false,
            teamName: '', startingHole: '',
            uploadFile: '', previewFile: '',
            activeTab: 1, isScoreKeeper: '', selectedPlayers: []
        };
        this.reactTable = React.createRef();
        this.reset_expand_row = this.reset_expand_row.bind(this);
        this.teamAddModal = this.teamAddModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.addUpdateTeamDetails = this.addUpdateTeamDetails.bind(this);
        this.uploadLogo = this.uploadLogo.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.assignTeamPlayers = this.assignTeamPlayers.bind(this);
        this.teams_columns = [
            {
                Header: 'Profile',
                filterable: false,
                className: 'text-center',
                Cell: ({ row }) => (
                    <Fragment>
                        <Profile url={row['_original'].teamIcon} className='list-user-profile' />
                    </Fragment>)
            },
            {
                Header: 'Team Name',
                accessor: 'teamName',
                className: 'text-left'
            },
            {
                Header: 'No.of Players',
                accessor: 'noOfPlayers',
                className: 'text-center'
            },
            {
                Header: 'Created Name',
                accessor: 'createdName',
                className: 'text-left'
            }
        ];
        this.users_columns = [
            {
                Header: 'Profile',
                filterable: false,
                className: 'text-center',
                Cell: ({ row }) => (
                    <Fragment>
                        <Profile url={row['_original'].profileImage} className='list-user-profile' />
                    </Fragment>)
            },
            {
                Header: 'User Name',
                accessor: 'username',
                className: 'text-left'
            },
            {
                Header: 'Gender',
                accessor: 'gender',
                className: 'text-left'
            },
            {
                Header: 'User Type',
                accessor: 'userType',
                className: 'text-left'
            }
        ];
    }
    //Assign Team Players
    assignTeamPlayers = () => {
        let { AddTeamResponse: { data: { teamID = '' } } } = this.props;
        let { isScoreKeeper, selectedPlayers } = this.state;
        const formData = {
            teamId: parseInt(teamID),
            scoreKeeperID: parseInt(isScoreKeeper),
            playerId: selectedPlayers.toString()
        };
        this.props.addTeamPlayers(formData);
        this.teamAddModal();
    }
    //Handle Tab
    handleTab = (key) => {
        this.setState({ activeTab: key });
    }
    //Upload Logo
    uploadLogo = () => {
        let { uploadFile } = this.state;
        const reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        reader.onload = (event) => {
            const processed_file_base64 = (event.target.result).split(',')[1];
            let data = {
                file: processed_file_base64,
                fileName: uploadFile.name
            };
            this.props.uploadProfile(data);
        }
    }
    //Add Update Team
    addUpdateTeamDetails = (e) => {
        e.preventDefault();
        const { userWithTypeId } = loggedUserDetails();
        let {
            teamName, startingHole
        } = this.state;
        let { UploadProfileResponse: { data: profileUrl = '' } } = this.props;
        let formData = {
            teamName: teamName,
            teamIcon: profileUrl,
            createdBy: parseInt(userWithTypeId),
            startingHole: parseInt(startingHole)
        };
        this.props.addTeam(formData);
        this.setState({ activeTab: 2 });
    }
    //Field Change
    handleFieldChange = (event) => {
        const { name, value, type, checked } = event.target;
        let { selectedPlayers, isScoreKeeper } = this.state;
        switch (type) {
            case 'file':
                var file = event.target.files[0];
                if (file) {
                    var preview = URL.createObjectURL(file);
                    this.setState({ uploadFile: file, previewFile: preview });
                }
                break;
            case 'checkbox':
                if (checked) selectedPlayers.push(value)
                else selectedPlayers = selectedPlayers.filter(list => parseInt(list) !== parseInt(value))
                if (parseInt(value) === parseInt(isScoreKeeper)) this.setState({ isScoreKeeper: '' });
                this.setState({ [name]: selectedPlayers });
                break;
            case 'radio':
                selectedPlayers = selectedPlayers.filter(list => parseInt(list) !== parseInt(value));
                this.setState({ selectedPlayers: selectedPlayers, [name]: value });
                break;
            default:
                this.setState({ [name]: value });
                break;
        }
    }
    //resetStateValues
    resetStateValues = () => {
        this.setState({
            teamName: '', startingHole: '', previewFile: '', uploadFile: '', selectedPlayers: [], isScoreKeeper: '', activeTab: 1
        });
    }
    //Team Add Modal
    teamAddModal = () => {
        this.resetStateValues();
        this.setState(prevState => ({
            teamModal: !prevState.teamModal
        }));
    }
    //Reset
    reset_expand_row() {
        this.setState({ expanded: {} });
    }
    //Users List
    expand_row(row) {
        const { expanded } = this.state;
        var expanded_row = { ...expanded };
        Object.keys(expanded_row).map(key => {
            expanded_row[key] = row.nestingPath === key ? true : false;
        });
        expanded_row[row.nestingPath] = !expanded_row[row.nestingPath];

        if (expanded[row.nestingPath]) {
            expanded_row[row.nestingPath] = false;
        }
        this.setState(() => ({
            expanded: expanded_row
        }));
    }
    //Initial Table Data 
    componentDidMount() {
        this.props.getAllTeams();
        this.props.getAllPlayers();
    }
    render() {
        const { expanded, teamModal, teamName, startingHole, previewFile, activeTab, isScoreKeeper, selectedPlayers } = this.state;
        const
            {
                TeamsResponse: { data = [], loading = '' },
                AllPlayersResponse: { data: playersData = [] }
            } = this.props;
        const MyLoader = () => loading ? <Loader /> : '';
        const teamModalProps = {
            toggle: teamModal, toggleFunc: this.teamAddModal,
            handleFieldChange: this.handleFieldChange,
            teamName, startingHole,
            addUpdateTeamDetails: this.addUpdateTeamDetails,
            uploadLogo: this.uploadLogo,
            previewFile,
            activeTab, handleTab: this.handleTab,
            playersData,
            isScoreKeeper,
            selectedPlayers,
            assignTeamPlayers: this.assignTeamPlayers
        };
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Fragment>
                                        <div className='title-bg'>
                                            <span className='title-left'>
                                                <h4>Teams</h4>
                                            </span>
                                            <span className='title-right'>
                                                <Button
                                                    className='cus-btn info'
                                                    variant='outline-info'
                                                    onClick={this.teamAddModal}
                                                >
                                                    <i className='fas fa-users' />
                                                </Button>
                                            </span>
                                        </div>
                                        <ReactTable
                                            expanded={expanded}
                                            onPageChange={this.reset_expand_row}
                                            onPageSizeChange={this.reset_expand_row}
                                            onSortedChange={this.reset_expand_row}
                                            onFilteredChange={this.reset_expand_row}
                                            getTdProps={(state, rowInfo) => {
                                                if (rowInfo === undefined) {
                                                    return {};
                                                }
                                                return {
                                                    'data-qnt': rowInfo.original.noOfPlayers,
                                                    onClick: () => {
                                                        this.expand_row(rowInfo);
                                                    }
                                                };
                                            }}
                                            id="teams_table"
                                            ref={r => (this.reactTable = r)}
                                            LoadingComponent={MyLoader}
                                            data={data}
                                            columns={this.teams_columns}
                                            defaultPageSize={10}
                                            pageSizeOptions={[5, 10, 15, 20]}
                                            noDataText="No Record Found.."
                                            filterable
                                            HeaderClassName="text-bold"
                                            defaultFilterMethod={(filter, row) =>
                                                String(row[filter.id])
                                                    .toLowerCase()
                                                    .includes(filter.value.toLowerCase())
                                            }
                                            SubComponent={row => {
                                                let users_list = row.original.teamplayerList || [];
                                                if (users_list.length) users_list = JSON.parse(users_list);
                                                return (
                                                    <div style={{ padding: "10px" }}>
                                                        <center>
                                                            <h5>Team Players</h5>
                                                        </center>
                                                        <ReactTable
                                                            ref={r => (this.reactTableUsers = r)}
                                                            data={users_list || []}
                                                            columns={this.users_columns}
                                                            pageSize={users_list.length}
                                                            showPagination={false}
                                                            noDataText="No Record Found.."
                                                            filterable
                                                            HeaderClassName="text-bold"
                                                            defaultFilterMethod={(filter, row) =>
                                                                String(row[filter.id])
                                                                    .toLowerCase()
                                                                    .includes(filter.value.toLowerCase())
                                                            }
                                                        />
                                                    </div>
                                                );
                                            }}
                                        />
                                        {/* Team Modal */}
                                        <AddUpdateTeam teamModalProps={teamModalProps} />
                                        {/* Team Modal */}
                                    </Fragment>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
const getState = state => {
    return {
        TeamsResponse: state.getAllTeams,
        UploadProfileResponse: state.uploadProfile,
        AllPlayersResponse: state.getAllPlayers,
        AddTeamResponse: state.addTeam
    }
}
export default connect(getState, {
    getAllTeams,
    addTeam,
    uploadProfile,
    getAllPlayers,
    addTeamPlayers

})(Teams)