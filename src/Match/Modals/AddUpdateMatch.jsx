import React, { Fragment, Component } from 'react';
import { Modal, Tab, Tabs, Button, FormGroup, ControlLabel, FormControl, Image, ListGroup, ListGroupItem, Badge, Checkbox, Radio } from "react-bootstrap";
import { FieldGroup } from '../../_helpers/Functions';
import DefaultUser from '../../assets/img/default_user.jpg';
export default class AddUpdateMatch extends Component {
    render() {
        const { matchModalProps: {
            toggle, toggleFunc, handleFieldChange, activeTab, handleTab, addUpdateMatchDetails,
            matchName, competitionTypeId
        } } = this.props;
        return (
            <Fragment>
                <Modal show={toggle} onHide={toggleFunc} backdrop={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Match</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs
                            activeKey={activeTab}
                            onSelect={handleTab}
                            id="controlled-tab-example"
                        >
                            <Tab eventKey={1} title="Match" >
                                <br />
                                <form onSubmit={addUpdateMatchDetails}>
                                    <FieldGroup
                                        id="matchName" name="matchName" type="text" label="Match Name" placeholder="Match Name" required
                                        onChange={handleFieldChange} value={matchName} />
                                    <FormGroup controlId="countryId">
                                        <ControlLabel>Competition Type</ControlLabel>
                                        <FormControl componentClass="select" placeholder="" required name='competitionTypeId' onChange={handleFieldChange} value={competitionTypeId} >
                                            <option value="">Select Competition Type</option>

                                        </FormControl>
                                    </FormGroup>
                                    {/* <FieldGroup
                                        id="startingHole" name="startingHole" min={0} type="number" label="Starting Hole" placeholder="Starting Hole" required
                                        onChange={handleFieldChange} value={startingHole} /> */}
                                    <center><hr />
                                        <Button bsStyle="danger" onClick={toggleFunc}>
                                            Discard
                                </Button>{' '}
                                        <Button type='submit' bsStyle="primary" >
                                            Save
                                </Button>
                                    </center>
                                </form>
                            </Tab>
                            <Tab eventKey={2} title="Teams" disabled={parseInt(activeTab) !== 2}>
                                {/* <br />
                                <ListGroup>
                                    {playersList}
                                    <center><hr />
                                        <Button bsStyle="danger" onClick={toggleFunc}>
                                            Discard
                                </Button>{' '}
                                        <Button bsStyle="success" onClick={assignTeamPlayers}>
                                            Assign Players
                                </Button>
                                    </center>
                                </ListGroup> */}
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}