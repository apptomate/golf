import React, { Component, Fragment } from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Profile from '../Common/Profile/Index.jsx';
import Loader from '../Common/Loader/Index.jsx';
import { getAllTeams } from '../_actions/Index.jsx';
import { dateFormat } from '../_helpers/Functions.jsx';
class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {}
        };
        this.reactTable = React.createRef();
        this.reset_expand_row = this.reset_expand_row.bind(this);
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
        this.setState(() => ({        //   
            expanded: expanded_row
        }));
    }
    //Initial Table Data 
    componentDidMount() {
        this.props.getAllTeams();
    }
    render() {
        const { expanded } = this.state;
        const
            {
                TeamsResponse: { data = [], loading = '' }
            } = this.props;
        const MyLoader = () => loading ? <Loader /> : '';
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Teams"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
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
        TeamsResponse: state.getAllTeams
    }
}
export default connect(getState, {
    getAllTeams
})(Teams)