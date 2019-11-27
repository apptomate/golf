import React, { Fragment, Component } from 'react';
import { Modal, FormGroup, Radio, ControlLabel, FormControl, Checkbox, Button, Image } from "react-bootstrap";
import { FieldGroup } from '../../_helpers/Functions';
import DefaultUser from '../../assets/img/default_user.jpg';
export default class AddUpdateUser extends Component {
    render() {
        const { userModalProps: { toggle, toggleFunc, handleFieldChange, firstName, lastName, dob, email, password, phoneNumber, address, pinCode, countryId,
            stateId, gender, isEmailNotification, isPublicProfile, isSMSNotification, city, countryList, stateList, userTypesList, userTypeId,
            addUpdateUserDetails, uploadProfile, previewFile, saveType } } = this.props;
        const user_types_array = userTypesList.map((list, key) => (
            <Checkbox inline value={list.userTypeId} name='userTypeId' checked={userTypeId.includes(list.userTypeId.toString())} onChange={handleFieldChange} key={'user_type_' + key}>
                {list.userType}</Checkbox>
        ));
        return (
            <Fragment>
                <Modal show={toggle} onHide={toggleFunc} backdrop={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{(saveType === 'create') ? 'New ' : 'Update '}User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={addUpdateUserDetails}>
                            <center>
                                <Image src={previewFile || DefaultUser} rounded width='100px' height='100px' />
                                <FieldGroup
                                    id="profileImage"
                                    name='profileImage'
                                    accept='.png, .jpg, .jpeg, .mp4'
                                    onChange={handleFieldChange}
                                    type="file"
                                    label="Profile"
                                />
                                {(previewFile) &&
                                    <Button bsStyle="primary" onClick={uploadProfile}>
                                        <i className='fas fa-upload' />
                                    </Button>
                                }
                            </center>
                            <FieldGroup
                                id="firstName" name="firstName" type="text" label="First Name" placeholder="First Name" required
                                onChange={handleFieldChange} value={firstName} />
                            <FieldGroup
                                id="lastName" name="lastName" type="text" label="Last Name" placeholder="Last Name" required
                                onChange={handleFieldChange} value={lastName} />
                            {/* <FieldGroup
                                id="dob" name="dob" dateformat="DD/MM/YYYY" type="date" label="DOB" placeholder="DOB" required
                                onChange={handleFieldChange} value={dob} /> */}
                            <FormGroup>
                                <ControlLabel>Gender</ControlLabel><br />
                                <Radio name="gender" value='Male' inline onChange={handleFieldChange} checked={(gender === 'Male') ? true : false}>
                                    Male
                                </Radio>{' '}
                                <Radio name="gender" value='Female' inline onChange={handleFieldChange} checked={(gender === 'Female') ? true : false}>
                                    Female
                                </Radio>{' '}
                            </FormGroup>
                            <FieldGroup
                                id="email" name="email" type="email" label="Email" placeholder="Email" required
                                onChange={handleFieldChange} value={email} disabled={(saveType === 'update')} />
                            <FieldGroup
                                id="password" name="password" type="password" label="Password" placeholder="Password" required
                                onChange={handleFieldChange} value={password} disabled={(saveType === 'update')} />
                            <FieldGroup
                                id="phoneNumber" name="phoneNumber" type="text" label="Phone Number" placeholder="Phone Number" required
                                onChange={handleFieldChange} value={phoneNumber} />
                            <FormGroup controlId="countryId">
                                <ControlLabel>Country</ControlLabel>
                                <FormControl componentClass="select" placeholder="" required name='countryId' onChange={handleFieldChange} value={countryId} >
                                    <option value="">Select Country</option>
                                    {countryList}
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="stateId">
                                <ControlLabel>State</ControlLabel>
                                <FormControl componentClass="select" placeholder="" required name='stateId' onChange={handleFieldChange} value={stateId}>
                                    <option value="">Select State</option>
                                    {stateList}
                                </FormControl>
                            </FormGroup>
                            <FieldGroup
                                id="city" name="city" type="text" label="City" placeholder="City" required
                                onChange={handleFieldChange} value={city} />
                            <FormGroup controlId="address">
                                <ControlLabel>Address</ControlLabel>
                                <FormControl componentClass="textarea" name='address' placeholder="Address" required onChange={handleFieldChange} value={address} />
                            </FormGroup>
                            {/* <FieldGroup
                                id="pinCode" name="pinCode" type="text" label="Pincode" placeholder="Pincode" required
                                onChange={handleFieldChange} value={pinCode} /> */}
                            <FormGroup>
                                <ControlLabel>Send Participant Tournament Information</ControlLabel><br />
                                <Checkbox inline value='email' name='isEmailNotification' onChange={handleFieldChange} checked={isEmailNotification}>E-mail</Checkbox>
                                <Checkbox inline value='sms' name='isSMSNotification' onChange={handleFieldChange} checked={isSMSNotification}>SMS</Checkbox>{' '}
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>is Public Profile</ControlLabel><br />
                                <Radio name="isPublicProfile" value='true' inline onChange={handleFieldChange} checked={isPublicProfile}>
                                    Yes
                                </Radio>{' '}
                                <Radio name="isPublicProfile" value='false' inline onChange={handleFieldChange} checked={isPublicProfile === false}>
                                    No
                                </Radio>{' '}
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>User Type</ControlLabel><br />
                                {user_types_array}
                            </FormGroup>
                            <center><hr />
                                <Button bsStyle="danger" onClick={toggleFunc}>
                                    Discard
                                </Button>{' '}
                                <Button type='submit' bsStyle="primary" >
                                    {(saveType === 'create') ? 'Save ' : 'Update '}
                                </Button>
                            </center>
                        </form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}