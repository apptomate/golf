import React, { Component, Fragment } from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { getAllUsers, getAllCountries, getCountryStates, removeUser, getAllUserTypes, addUser } from '../_actions/Index.jsx';
import Profile from '../Common/Profile/Index.jsx';
import Loader from '../Common/Loader/Index.jsx';
import { dateFormat } from '../_helpers/Functions.jsx';
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import AddUpdateUser from './Modals/AddUpdateUser.jsx';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userModal: false,
            firstName: '', lastName: '', dob: '', email: '', password: '', phoneNumber: '', address: '', pinCode: '', countryId: '',
            stateId: '', gender: '', isEmailNotification: '', isPublicProfile: '', isSMSNotification: '', city: '', userTypeId: []
        };
        this.reactTable = React.createRef();
        this.userUpdateModal = this.userUpdateModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.addUpdateUserDetails = this.addUpdateUserDetails.bind(this);
        this.userAddModal = this.userAddModal.bind(this);
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
            },
            {
                Header: 'Actions',
                filterable: false,
                className: 'text-center',
                width: 130,
                Cell: ({ row }) => (
                    <Fragment>
                        <Button
                            bsStyle="info"
                            data-user_id={row['_original'].userId}
                            onClick={e => this.userUpdateModal(e, row)}
                            bsSize="small"
                        ><i
                                className="fas fa-pencil-alt"
                            />
                        </Button>{' '}
                        <Button
                            bsStyle="danger"
                            data-user_id={row['_original'].userId}
                            onClick={this.removeUser}
                            bsSize="small"
                        ><i
                                className="fas fas fa-trash"
                            />
                        </Button>
                    </Fragment>
                )
            }
        ];
    }
    //resetStateValues
    resetStateValues = () => {
        this.setState({
            firstName: '', lastName: '', dob: '', email: '', password: '', phoneNumber: '', address: '', pinCode: '', countryId: '',
            stateId: '', gender: '', isEmailNotification: '', isPublicProfile: '', isSMSNotification: '', city: '', userTypeId: []
        });
    }
    //Add Update User
    addUpdateUserDetails = (e) => {
        e.preventDefault();
        let {
            firstName, lastName, dob, email, password, phoneNumber, address, pinCode,
            countryId, stateId, gender, isEmailNotification, isPublicProfile, isSMSNotification,
            city, userTypeId
        } = this.state;
        let formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            dob: dob,
            profileImage: '',
            phoneNumber: phoneNumber,
            password: password,
            countryId: parseInt(countryId),
            stateId: parseInt(stateId),
            city: city,
            address: address,
            pinCode: pinCode,
            isEmailNotification: isEmailNotification,
            isSMSNotification: isSMSNotification,
            isPublicProfile: isPublicProfile,
            userTypeId: userTypeId
        }
        this.props.addUser(formData);
        this.userAddModal();
    }
    //Remove User
    removeUser = (event) => {
        let userId = parseInt(event.currentTarget.dataset.user_id);
        Swal
            .fire({
                title: 'Are you sure?',
                text: 'You want to delete this user?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            })
            .then(result => {
                if (result.value) {
                    this.props.removeUser(userId);
                }
            });
    }
    //Field Change
    handleFieldChange = (event) => {
        const { name, value, checked, type } = event.target;
        if (name === 'countryId' && value) {
            this.props.getCountryStates(value);
        }
        if (type === 'checkbox') {
            if (name === ' userTypeId') {
                console.log('Val:', value);
            }
            this.setState({ [name]: checked });
        } else {
            this.setState({ [name]: value });
        }
    }
    //Add User Modal
    userAddModal = () => {
        this.resetStateValues();
        this.setState(prevState => ({
            userModal: !prevState.userModal
        }));
    }
    //Edit User Modal
    userUpdateModal = (event, row) => {
        let userId = event.currentTarget.dataset.user_id;
        let dob = dateFormat(row['_original'].dob, 'DD/MM/YYYY');
        this.setState({
            userId: userId,
            firstName: row['_original'].firstName,
            lastName: row['_original'].lastName,
            email: row['_original'].email,
            gender: row['_original'].gender,
            dob: dob,
            //profileImage:row['_original'].profileImage '',
            phoneNumber: row['_original'].phoneNumber,
            password: row['_original'].password,
            countryId: row['_original'].countryId,
            stateId: row['_original'].stateId,
            city: row['_original'].city,
            address: row['_original'].address,
            pinCode: row['_original'].pinCode,
            isEmailNotification: row['_original'].isEmailNotification,
            isSMSNotification: row['_original'].isSMSNotification,
            isPublicProfile: row['_original'].isPublicProfile,
            userTypeId: row['_original'].userTypeId
        });
        this.setState(prevState => ({
            userModal: !prevState.userModal
        }));
    }
    //Mount
    componentDidMount() {
        this.props.getAllUsers();
        this.props.getAllCountries();
        this.props.getAllUserTypes();
    }
    render() {
        const
            {
                UsersResponse: { data = [], loading = '' },
                CountriesResponse: { data: countryList = [] },
                StatesResponse: { data: stateList = [] },
                UserTypesResponse: { data: userTypesList = [] },
                RemoveResponse,
            } = this.props;
        const {
            userModal, firstName, lastName, dob, email, password, phoneNumber, address, pinCode,
            countryId, stateId, gender, isEmailNotification, isPublicProfile, isSMSNotification,
            city, userTypeId
        } = this.state;
        const country_list_array = countryList.map((list, key) => (
            <option value={list.countryId} key={'country_' + key}>
                {list.countryName}
            </option>
        ));
        const state_list_array = stateList.map((list, key) => (
            <option value={list.stateId} key={'state_' + key}>
                {list.stateName}
            </option>
        ));
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
                                    <Fragment>
                                        <span className='add-user-style' >
                                            <Button onClick={this.userAddModal}><i className="fas fa-user-plus" /></Button>
                                        </span><br /><br />
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
                                        {/* User Modal */}
                                        <AddUpdateUser toggle={userModal} toggleFunc={this.userAddModal} handleFieldChange={this.handleFieldChange} firstName={firstName} lastName={lastName} dob={dob} email={email}
                                            password={password} phoneNumber={phoneNumber} address={address} pinCode={pinCode}
                                            countryId={countryId} stateId={stateId} gender={gender} isEmailNotification={isEmailNotification}
                                            isPublicProfile={isPublicProfile} isSMSNotification={isSMSNotification} city={city} userTypeId={userTypeId} countryList={country_list_array}
                                            stateList={state_list_array} userTypesList={userTypesList} addUpdateUserDetails={this.addUpdateUserDetails} />
                                        {/* User Modal */}
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
        UsersResponse: state.getAllUsers,
        CountriesResponse: state.getAllCountries,
        StatesResponse: state.getCountryStates,
        RemoveResponse: state.removeUser,
        UserTypesResponse: state.getAllUserTypes,
        AddUserResponse: state.addUser
    }
}
export default connect(getState, {
    getAllUsers,
    getAllCountries,
    getCountryStates,
    removeUser,
    getAllUserTypes,
    addUser
})(Users)