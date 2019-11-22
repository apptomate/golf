import React, { Fragment, Component } from 'react';
import { Modal, Tab, Tabs, Button, Image, ListGroup, ListGroupItem, Badge, Checkbox, Radio } from "react-bootstrap";
import { FieldGroup } from '../../_helpers/Functions';
import DefaultUser from '../../assets/img/default_user.jpg';
export default class AddUpdateTeam extends Component {
    render() {
        const { teamModalProps: {
            toggle, toggleFunc, handleFieldChange, teamName, startingHole, addUpdateTeamDetails, uploadLogo, previewFile,
            handleTab, activeTab, playersData, isScoreKeeper, selectedPlayers, assignTeamPlayers
        } } = this.props; console.log('SP', selectedPlayers);
        const playersList = playersData.map((list, key) => {
            var userTypesArray = list.userType.split(',');
            var type_list = userTypesArray.map((value, key) => <Badge key={`user_type_${key}`}>{value}</Badge>);
            return (
                <Fragment key={`frag_${key}`}>
                    <ListGroupItem header={list.playerName} >
                        <Checkbox inline value={list.userId} name='selectedPlayers' onChange={handleFieldChange} checked={(selectedPlayers.includes(list.userId.toString()) && parseInt(isScoreKeeper) !== parseInt(list.userId))} />
                        {type_list}
                        {userTypesArray.includes('Score Keeper') &&
                            <Radio name="isScoreKeeper" value={list.userId} inline onChange={handleFieldChange} checked={(parseInt(isScoreKeeper) === parseInt(list.userId) && !selectedPlayers.includes(list.userId.toString()))} />}
                    </ListGroupItem>
                </Fragment>
            )
        });
        return (
            <Fragment>
                <Modal show={toggle} onHide={toggleFunc} backdrop={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Team</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs
                            activeKey={activeTab}
                            onSelect={handleTab}
                            id="controlled-tab-example"
                        >
                            <Tab eventKey={1} title="Team" >
                                <br />
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
                            </Tab>
                            <Tab eventKey={2} title="Players" disabled={parseInt(activeTab) !== 2}>
                                <br />
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
                                </ListGroup>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}