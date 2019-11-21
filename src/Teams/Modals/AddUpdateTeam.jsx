import React, { Fragment, Component } from 'react';
import { Modal, FormGroup, Radio, ControlLabel, FormControl, Checkbox, Button, Image } from "react-bootstrap";
import { FieldGroup } from '../../_helpers/Functions';
import DefaultUser from '../../assets/img/default_user.jpg';
export default class AddUpdateTeam extends Component {
    render() {
        const { teamModalProps: {
            toggle, toggleFunc, handleFieldChange, teamName, startingHole, addUpdateTeamDetails, uploadLogo, previewFile
        } } = this.props;
        return (
            <Fragment>
                <Modal show={toggle} onHide={toggleFunc} backdrop={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={addUpdateTeamDetails}>
                            <center>
                                <Image src={previewFile || DefaultUser} rounded width='100px' height='100px' />
                                <FieldGroup
                                    id="teamIcon"
                                    name='teamIcon'
                                    accept='.png, .jpg, .jpeg, .mp4'
                                    onChange={handleFieldChange}
                                    type="file"
                                    label="Logo"
                                />
                                {(previewFile) &&
                                    <Button bsStyle="primary" onClick={uploadLogo}>
                                        <i className='fas fa-upload' />
                                    </Button>
                                }
                            </center>
                            <FieldGroup
                                id="teamName" name="teamName" type="text" label="Team Name" placeholder="Team Name" required
                                onChange={handleFieldChange} value={teamName} />
                            <FieldGroup
                                id="startingHole" name="startingHole" min={0} type="number" label="Starting Hole" placeholder="Starting Hole" required
                                onChange={handleFieldChange} value={startingHole} />
                            <center><hr />
                                <Button bsStyle="danger" onClick={toggleFunc}>
                                    Discard
                                </Button>{' '}
                                <Button type='submit' bsStyle="primary" >
                                    Save
                                </Button>
                            </center>
                        </form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}