import React, { Component, Fragment } from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Loader from '../Common/Loader/Index';
import { getAllMatches, getAllCompetitionTypes, getAllMatchRulesList, addMatch, addMatchRule } from '../_actions/Index.jsx';
import AddUpdateMatch from './Modals/AddUpdateMatch.jsx';
import { loggedUserDetails } from '../_helpers/Functions.jsx';
import moment from 'moment';
class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1, matchModal: false, matchName: '', competitionTypeId: '', matchFee: '', matchStartDate: '',
            matchEndDate: '', selectedRules: [], newMatchRule: '', newRuleToggle: false
        };
        this.reactTable = React.createRef();
        this.matchAddModal = this.matchAddModal.bind(this);
        this.matchAddModal = this.matchAddModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.addUpdateMatchDetails = this.addUpdateMatchDetails.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.addNewRule = this.addNewRule.bind(this);
        this.addRuleToggleFunc = this.addRuleToggleFunc.bind(this);
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
    //Add Rule Toggle Func
    addRuleToggleFunc = () => {
        this.setState(prevState => ({ newRuleToggle: !prevState.newRuleToggle }));
    }
    //Add Match Rule
    addNewRule = () => {
        let { newMatchRule } = this.state;
        var formData = {
            matchRules: newMatchRule
        };
        this.props.addMatchRule(formData);
    }
    //Add Update Match
    addUpdateMatchDetails = (e) => {
        e.preventDefault();
        const { userWithTypeId } = loggedUserDetails();
        let { matchName, selectedRules, matchStartDate, matchEndDate, matchFee, competitionTypeId } = this.state;
        let formData = {
            matchName: matchName,
            matchRuleId: selectedRules.toString(),
            matchStartDate: moment(matchStartDate).format('YYYY/MM/DD HH:mm:ss'),
            matchEndDate: moment(matchEndDate).format('YYYY/MM/DD HH:mm:ss'),
            matchFee: parseFloat(matchFee),
            createdBy: parseInt(userWithTypeId),
            competitionTypeId: parseInt(competitionTypeId),
        };
        this.props.addMatch(formData);
        this.setState({ activeTab: 2 });
    }
    //Handle Tab
    handleTab = (key) => {
        this.setState({ activeTab: key });
    }
    //Start Date Change
    handleStartDate = event => {
        this.setState({ matchStartDate: event._d });
    };
    //End Date Change
    handleEndDate = event => {
        this.setState({ matchEndDate: event._d });
    };
    //Field Change
    handleFieldChange = (event) => {
        const { name, value, type, checked } = event.target;
        let { selectedRules } = this.state;
        switch (type) {
            case 'checkbox':
                if (checked) selectedRules.push(value)
                else selectedRules = selectedRules.filter(list => parseInt(list) !== parseInt(value))
                this.setState({ [name]: selectedRules });
                break;
            default:
                this.setState({ [name]: value });
                break;
        }
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
            activeTab: 1, matchName: '', competitionTypeId: '', matchFee: '', matchFee: '', matchStartDate: '',
            matchEndDate: '', selectedRules: [], newMatchRule: '', newRuleToggle: false
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
        this.props.getAllMatchRulesList();
    }
    render() {
        const { matchModal, activeTab, matchName, competitionTypeId, matchFee, matchStartDate, matchEndDate,
            selectedRules, newMatchRule, newRuleToggle } = this.state;
        let
            {
                MatchResponse: { data = [], loading = '' },
                CompetitionTypesResponse: { data: competitionTypes = [] },
                MatchRulesListResponse: { data: matchRulesList = [] },
                //AddMatchResponse: { data: { matchId = '' } }
            } = this.props;
        if (!Array.isArray(data)) data = [];
        competitionTypes = competitionTypes.map((list, key) => (
            <option value={list.competitionTypeId} key={'compt_types_' + key}>
                {list.competitionName}
            </option>
        ));
        const matchModalProps = {
            toggle: matchModal, toggleFunc: this.matchAddModal, handleFieldChange: this.handleFieldChange,
            activeTab, handleTab: this.handleTab, addUpdateMatchDetails: this.addUpdateMatchDetails,
            matchName, competitionTypeId, competitionTypes, matchFee, matchStartDate, matchEndDate,
            matchRulesList, selectedRules, handleStartDate: this.handleStartDate, handleEndDate: this.handleEndDate,
            addNewRule: this.addNewRule, newMatchRule, newRuleToggle, addRuleToggleFunc: this.addRuleToggleFunc
        };
        const MyLoader = () => loading ? <Loader /> : '';
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
        CompetitionTypesResponse: state.getAllCompetitionTypes,
        MatchRulesListResponse: state.getAllMatchRulesList,
        AddMatchResponse: state.addMatch
    }
}
export default connect(getState, {
    getAllMatches,
    getAllCompetitionTypes,
    getAllMatchRulesList,
    addMatch,
    addMatchRule
})(Teams)