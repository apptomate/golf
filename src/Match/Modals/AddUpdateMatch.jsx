import React, { Fragment, Component } from 'react';
import { Modal, Tab, Tabs, Button, FormGroup, ControlLabel, FormControl, ListGroup, ListGroupItem, Row, Checkbox, Col } from "react-bootstrap";
import { FieldGroup } from '../../_helpers/Functions';
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
export default class AddUpdateMatch extends Component {
    render() {
        let { matchModalProps: {
            toggle, toggleFunc, handleFieldChange, activeTab, handleTab, addUpdateMatchDetails,
            matchName, competitionTypeId, competitionTypes, matchFee, matchStartDate, matchEndDate,
            matchRulesList, selectedRules, handleStartDate, handleEndDate, addNewRule, newMatchRule,
            addRuleToggleFunc, newRuleToggle
        } } = this.props;
        matchRulesList = matchRulesList.map((list, key) => (
            <Fragment key={`rule_${key}`}>
                <ListGroupItem >
                    <Checkbox inline value={list.matchRuleId} name='selectedRules' onChange={handleFieldChange} checked={(selectedRules.includes(list.matchRuleId.toString()))} />
                    {list.ruleName}
                </ListGroupItem>
            </Fragment>
        ));
        var today = Datetime.moment();
        const startDateValidate = (current) => {
            return current >= today;
        };
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
                                            {competitionTypes}
                                        </FormControl>
                                    </FormGroup>
                                    <ControlLabel>Rule</ControlLabel>
                                    <span style={{ float: 'right', cursor: 'pointer' }} onClick={addRuleToggleFunc}><i className='fas fa-plus-circle' /></span>
                                    {(newRuleToggle &&
                                        <Row>
                                            <Col md={9}>
                                                <FieldGroup
                                                    id="newMatchRule" name="newMatchRule" type="text" label="New Rule" placeholder="New Rule" required
                                                    onChange={handleFieldChange} value={newMatchRule} />
                                            </Col>
                                            <Col md={3}>
                                                {(newMatchRule &&
                                                    <Button style={{ marginTop: '2.5rem' }} bsStyle="primary" onClick={addNewRule}>
                                                        Save
                                                </Button>
                                                )}
                                            </Col>
                                        </Row>
                                    )}
                                    <ListGroup>
                                        {matchRulesList}
                                    </ListGroup>
                                    <FormGroup controlId="matchStartDate">
                                        <ControlLabel>Start Date</ControlLabel>
                                        <Datetime
                                            name="matchStartDate"
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat="HH:mm:ss"
                                            onChange={handleStartDate}
                                            value={matchStartDate}
                                            required
                                            placeholder='DD/MM/YYYY HH:mm:ss'
                                            isValidDate={startDateValidate}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="matchEndDate">
                                        <ControlLabel>End Date</ControlLabel>
                                        <Datetime
                                            name="matchEndDate"
                                            dateFormat="DD/MM/YYYY"
                                            timeFormat="HH:mm:ss"
                                            onChange={handleEndDate}
                                            value={matchEndDate}
                                            required
                                            placeholder='DD/MM/YYYY HH:mm:ss'
                                        />
                                    </FormGroup>
                                    <FieldGroup
                                        id="matchFee" name="matchFee" type="text" label="Match Fee ($)" placeholder="Match Fee" required
                                        onChange={handleFieldChange} value={matchFee} />
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