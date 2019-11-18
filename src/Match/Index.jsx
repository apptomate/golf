import React, { Component } from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import Card from "../components/Card/Card.jsx";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import Loader from '../Common/Loader/Index';
import { getAllMatches } from '../_actions/Index.jsx';
class Teams extends Component {
    constructor(props) {
        super(props);
        this.reactTable = React.createRef();
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
                Header: 'Location',
                accessor: 'matchLocation',
                className: 'text-left'
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
    componentDidMount() {
        this.props.getAllMatches();
    }
    render() {
        const
            {
                MatchResponse: { data = [], loading = '' }
            } = this.props;
        const MyLoader = () => loading ? <Loader /> : ''; console.log(data)
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Match"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
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
        MatchResponse: state.getAllMatches
    }
}
export default connect(getState, {
    getAllMatches
})(Teams)