import React, { Component, Fragment } from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import {
    getAllUsers, getAllCountries, getCountryStates, removeUser, getAllUserTypes, addUser, uploadProfile,
    updateUser
} from '../_actions/Index.jsx';
import Profile from '../Common/Profile/Index.jsx';
import Loader from '../Common/Loader/Index.jsx';
import { dateFormat } from '../_helpers/Functions.jsx';
import Swal from 'sweetalert2';
import AddUpdateUser from './Modals/AddUpdateUser.jsx';
import PropTypes from 'prop-types';
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userModal: false,
            firstName: '', lastName: '', dob: '', email: '', password: '', phoneNumber: '', address: '', pinCode: '', countryId: '',
            stateId: '', gender: '', isEmailNotification: '', isPublicProfile: '', isSMSNotification: '', city: '', userTypeId: [], uploadFile: '',
            previewFile: '', saveType: '', userWithTypeId: '', profileImage: ''
        };
        this.reactTable = React.createRef();
        this.userUpdateModal = this.userUpdateModal.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.addUpdateUserDetails = this.addUpdateUserDetails.bind(this);
        this.userAddModal = this.userAddModal.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
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
                        <i
                            onClick={e => this.userUpdateModal(e, row)}
                            className='fas fa-pencil-alt edit-icon'
                        />
                        <i
                            data-user_id={row['_original'].userId}
                            onClick={this.removeUser}
                            className='fas fas fa-trash delete-icon'
                        />
                    </Fragment>
                )
            }
        ];
    }
    //Upload Profile
    uploadProfile = () => {
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
    //resetStateValues
    resetStateValues = () => {
        this.setState({
            firstName: '', lastName: '', dob: '', email: '', password: '', phoneNumber: '', address: '', pinCode: '', countryId: '',
            stateId: '', gender: '', isEmailNotification: '', isPublicProfile: '', isSMSNotification: '', city: '', userTypeId: [],
            previewFile: '', uploadFile: '', saveType: '', userWithTypeId: '', profileImage: ''
        });
    }
    //Add Update User
    addUpdateUserDetails = (e) => {
        e.preventDefault();
        let {
            firstName, lastName, dob, email, password, phoneNumber, address, pinCode,
            countryId, stateId, gender, isEmailNotification, isPublicProfile, isSMSNotification,
            city, userTypeId, saveType, userId, userWithTypeId, profileImage
        } = this.state;
        let { UploadProfileResponse: { data: profileUrl = '' } } = this.props;
        let formData = {
            userId: (saveType === 'update') ? parseInt(userId) : undefined,
            userWithTypeId: (saveType === 'update') ? parseInt(userWithTypeId) : undefined,
            countryId: parseInt(countryId),
            stateId: parseInt(stateId),
            userTypeId: userTypeId.toString(),
            city, address, pinCode, isEmailNotification, isSMSNotification, phoneNumber, password,
            isPublicProfile, firstName, lastName, email, gender,
            dob: dateFormat(dob, 'YYYY/MM/DD'),
            profileImage: profileUrl || profileImage
        };
        if (saveType === 'create') this.props.addUser(formData);
        else this.props.updateUser(formData);
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
        switch (type) {
            case 'checkbox':
                if (name === 'userTypeId') {
                    var previous_values = this.state.userTypeId;
                    if (checked) previous_values.push(value)
                    else previous_values = previous_values.filter(list => list.toString() !== value.toString())
                    this.setState({ [name]: previous_values });
                } else {
                    this.setState({ [name]: checked });
                }
                break;
            case 'file':
                var file = event.target.files[0];
                if (file) {
                    var preview = URL.createObjectURL(file);
                    this.setState({ uploadFile: file, previewFile: preview });
                }
                break;
            case 'radio':
                if (name === 'isPublicProfile') {
                    var tempValue = false;
                    if (value === 'true') tempValue = true;
                    this.setState({ [name]: tempValue });
                } else {
                    this.setState({ [name]: value });
                }
                break;
            default:
                this.setState({ [name]: value });
                break;
        }
    }
    //Add User Modal
    userAddModal = () => {
        this.resetStateValues();
        this.setState(prevState => ({
            userModal: !prevState.userModal,
            saveType: 'create'
        }));
    }
    //Edit User Modal
    userUpdateModal = (event, row) => {
        let dob = dateFormat(row['_original'].dob, 'DD/MM/YYYY');
        let { userId, firstName, lastName, email, gender, profileImage, phoneNumber, password,
            countryId, stateId, city, address, pinCode, isEmailNotification, isSMSNotification,
            isPublicProfile, userTypeId, userWithTypeId } = row['_original'];
        userTypeId = userTypeId.split(',');
        this.props.getCountryStates(countryId);
        this.setState(prevState => ({
            userModal: !prevState.userModal,
            userId, firstName, lastName, email, gender, dob,
            previewFile: profileImage, phoneNumber, password,
            countryId, stateId, city, address, pinCode, isEmailNotification,
            isSMSNotification, isPublicProfile, userTypeId, userWithTypeId,
            saveType: 'update', profileImage
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
            } = this.props;
        const {
            userModal, firstName, lastName, dob, email, password, phoneNumber, address, pinCode,
            countryId, stateId, gender, isEmailNotification, isPublicProfile, isSMSNotification,
            city, userTypeId, previewFile, saveType
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
        const userModalProps = {
            toggle: userModal, toggleFunc: this.userAddModal, handleFieldChange: this.handleFieldChange, firstName, lastName, dob, email,
            password, phoneNumber, address, pinCode, countryId, stateId, gender, isEmailNotification, isPublicProfile, isSMSNotification,
            city, userTypeId, countryList: country_list_array, stateList: state_list_array, userTypesList,
            addUpdateUserDetails: this.addUpdateUserDetails, uploadProfile: this.uploadProfile, previewFile, saveType
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
                                                <h4>Users</h4>
                                            </span>
                                            <span className='title-right'>
                                                <Button
                                                    className='cus-btn info'
                                                    variant='outline-info'
                                                    onClick={this.userAddModal}
                                                >
                                                    <i className='fas fa-user-plus' />
                                                </Button>
                                            </span>
                                        </div>
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
                                        <AddUpdateUser userModalProps={userModalProps} />
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
};
//Prop Types
Users.propTypes = {
    data: PropTypes.object,
    countryList: PropTypes.object,
    stateList: PropTypes.object,
    userTypesList: PropTypes.object
};
const getState = state => {
    return {
        UsersResponse: state.getAllUsers,
        CountriesResponse: state.getAllCountries,
        StatesResponse: state.getCountryStates,
        UserTypesResponse: state.getAllUserTypes,
        UploadProfileResponse: state.uploadProfile
    }
}
export default connect(getState, {
    getAllUsers,
    getAllCountries,
    getCountryStates,
    removeUser,
    getAllUserTypes,
    addUser,
    uploadProfile,
    updateUser
})(Users)
