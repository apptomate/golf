import React, { Component, Fragment } from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { getAllUsers } from '../_actions/Index.jsx';
import Profile from '../Common/Profile/Index.jsx';
import Loader from '../Common/Loader/Index.jsx';
import { dateFormat } from '../_helpers/Functions.jsx';
class Users extends Component {
    constructor(props) {
        super(props);
        this.reactTable = React.createRef();
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
                Header: 'First Name',
                accessor: 'firstName',
                className: 'text-left'
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                className: 'text-left'
            },
            {
                Header: 'Gender',
                accessor: 'gender',
                className: 'text-left'
            },
            {
                Header: 'DOB',
                accessor: 'dob',
                className: 'text-left',
                Cell: ({ row }) => {
                    let con_date = dateFormat(row['_original'].dob, 'DD/MM/YYYY');
                    return con_date;
                }
            },
            {
                Header: 'Email',
                accessor: 'email',
                className: 'text-left'
            },
            {
                Header: 'Phone No',
                accessor: 'phoneNumber',
                className: 'text-left'
            },
            {
                Header: 'Role',
                accessor: 'userType',
                className: 'text-left'
            }
        ];
    }
    componentDidMount() {
        this.props.getAllUsers();
    }
    render() {
        const
            {
                UsersResponse: { data = [], loading = '' }
            } = this.props;
        const MyLoader = () => loading ? <Loader /> : '';
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Users"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <ReactTable
                                        id="users_table"
                                        ref={r => (this.reactTable = r)}
                                        LoadingComponent={MyLoader}
                                        data={data}
                                        columns={this.users_columns}
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
        UsersResponse: state.getAllUsers
    }
}
export default connect(getState, {
    getAllUsers,
})(Users)