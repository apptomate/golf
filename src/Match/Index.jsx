import React, { Component, Fragment } from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Loader from '../Common/Loader/Index';
import { getAllMatches, getAllCompetitionTypes } from '../_actions/Index.jsx';
import AddUpdateMatch from './Modals/AddUpdateMatch.jsx';
import { loggedUserDetails } from '../_helpers/Functions.jsx';
class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1, matchModal: false, matchName: '', competitionTypeId: ''
        };
        this.reactTable = React.createRef();
        this.matchAddModal = this.matchAddModal.bind(this);
        this.matchAddModal = this.matchAddModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.addUpdateMatchDetails = this.addUpdateMatchDetails.bind(this);
        this.match_columns = [
            {
                Header: 'Match Code',
                accessor: 'matchCode',
                className: 'text-left'
            },
            {
                Header: 'Match Name',
                accessor: 'matchName',
                className: 'text-center'
            },
            {
                Header: 'Location',
                accessor: 'matchLocation',
                className: 'text-left'
            },
            {
                Header: 'Start Date',
                accessor: 'matchStartDate',
                className: 'text-left'
            }, {
                Header: 'End Date',
                accessor: 'matchEndDate',
                className: 'text-left'
            }, {
                Header: 'Fee ($)',
                accessor: 'matchFee',
                className: 'text-center'
            }, {
                Header: 'Status',
                accessor: 'matchStatus',
                className: 'text-left'
            }
        ];
    }
    //Add Update Match
    addUpdateMatchDetails = (e) => {
        e.preventDefault();
        // const { userWithTypeId } = loggedUserDetails();
        // let {
        // } = this.state;
        // let { UploadProfileResponse: { data: profileUrl = '' } } = this.props;
        // let formData = {
        //     {
        //   matchName: string,
        //   matchCode: string,
        //   matchRuleId: string,
        //   matchStartDate: string,
        //   matchEndDate: string,
        //   matchFee: 0,
        //   createdBy: 0,
        //   competitionTypeId: 0,
        //   matchId: 0,
        //   matchStatus: string,
        //   isSaveAndNotify: true
        // };
        // this.props.addTeam(formData);
        // this.setState({ activeTab: 2 });
    }
    //Handle Tab
    handleTab = (key) => {
        this.setState({ activeTab: key });
    }
    //Field Change
    handleFieldChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({ [name]: value });
        // let { selectedPlayers, isScoreKeeper } = this.state;
        // switch (type) {
        //     case 'file':
        //         var file = event.target.files[0];
        //         if (file) {
        //             var preview = URL.createObjectURL(file);
        //             this.setState({ uploadFile: file, previewFile: preview });
        //         }
        //         break;
        //     case 'checkbox':
        //         if (checked) selectedPlayers.push(value)
        //         else selectedPlayers = selectedPlayers.filter(list => parseInt(list) !== parseInt(value))
        //         if (parseInt(value) === parseInt(isScoreKeeper)) this.setState({ isScoreKeeper: '' });
        //         this.setState({ [name]: selectedPlayers });
        //         break;
        //     case 'radio':
        //         selectedPlayers = selectedPlayers.filter(list => parseInt(list) !== parseInt(value));
        //         this.setState({ selectedPlayers: selectedPlayers, [name]: value });
        //         break;
        //     default:
        //         this.setState({ [name]: value });
        //         break;
        // }
    }
    //Match Add Modal
    matchAddModal = () => {
        this.resetStateValues();
        this.setState(prevState => ({
            matchModal: !prevState.matchModal
        }));
    }
    //resetStateValues
    resetStateValues = () => {
        this.setState({
            activeTab: 1, matchName: '', competitionTypeId: ''
        });
    }
    //Match Add Modal
    matchAddModal = () => {
        this.resetStateValues();
        this.setState(prevState => ({
            matchModal: !prevState.matchModal
        }));
    }
    componentDidMount() {
        this.props.getAllMatches();
        this.props.getAllCompetitionTypes();
    }
    render() {
        const { matchModal, activeTab, matchName, competitionTypeId } = this.state;

        let
            {
                MatchResponse: { data = [], loading = '' },
                CompetitionTypesResponse: { data: competitionTypes = [] }
            } = this.props;
        console.log(competitionTypes)
        if (!Object.keys(data).length) data = [];
        const MyLoader = () => loading ? <Loader /> : '';
        const matchModalProps = {
            toggle: matchModal, toggleFunc: this.matchAddModal, handleFieldChange: this.handleFieldChange,
            activeTab, handleTab: this.handleTab, addUpdateMatchDetails: this.addUpdateMatchDetails,
            matchName, competitionTypeId
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
                                                <h4>Match</h4>
                                            </span>
                                            <span className='title-right'>
                                                <Button
                                                    className='cus-btn info'
                                                    variant='outline-info'
                                                    onClick={this.matchAddModal}
                                                >
                                                    <i className='fas fa-golf-ball' />
                                                </Button>
                                            </span>
                                        </div>
                                        <ReactTable
                                            id="match_table"
                                            ref={r => (this.reactTable = r)}
                                            LoadingComponent={MyLoader}
                                            data={data}
                                            columns={this.match_columns}
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
                                        />
                                        {/* Match Modal */}
                                        <AddUpdateMatch matchModalProps={matchModalProps} />
                                        {/* Match Modal */}
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
        MatchResponse: state.getAllMatches,
        CompetitionTypesResponse: state.getAllCompetitionTypes
    }
}
export default connect(getState, {
    getAllMatches,
    getAllCompetitionTypes
})(Teams)