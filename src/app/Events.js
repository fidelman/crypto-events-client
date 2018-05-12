import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
/* components */
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EventDialog from './EventDialog';
/* styles */
import '../styles/events.scss';

class Events extends Component {
  static propTypes = {
    events: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    isEventsPending: PropTypes.bool.isRequired,
    handleFilterText: PropTypes.func.isRequired,
    filter: PropTypes.shape({
      coin: PropTypes.string,
      date_event: PropTypes.string,
      category: PropTypes.string
    }).isRequired,
    sort: PropTypes.shape({
      id: PropTypes.string.isRequired,
      by: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    openDialog: false,
    event: {}
  }

  handleOpenDialog = event => this.setState({ openDialog: true, event });

  handleCloseDialog = () => this.setState({ openDialog: false, event: {} });

  isActiveSort = id => id === `${this.props.sort.id}-${this.props.sort.by}`;

  render() {
    if (this.props.isEventsPending) {
      return (
        <div className="events events--center">
          <CircularProgress size={100} thickness={5} />
        </div>
      );
    }

    if (!this.props.events) return null;

    const tableBody = this.props.events.map((event, i) => { // event is is not unique
      return (
        <TableRow selectable={false} key={i} className="events__row">
          <TableRowColumn>{event.id}</TableRowColumn>
          <TableRowColumn>{event.coin.symbol}</TableRowColumn>
          <TableRowColumn>{moment(event.date_event).format('DD/MM/YY')}</TableRowColumn>
          <TableRowColumn>{moment(event.created_date).format('DD/MM/YY')}</TableRowColumn>
          <TableRowColumn>{event.category.name}</TableRowColumn>
          <TableRowColumn>{event.is_hot ? '🔥' : ''}</TableRowColumn>
          <TableRowColumn>{`${event.percentage}%`}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton label="More Info" onClick={() => this.handleOpenDialog(event)} />
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
     <div className="events">
        <EventDialog
          event={this.state.event}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
        />
        <Paper className="paper" zDepth={2}>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow selectable={false}>
                <TableHeaderColumn>Event ID</TableHeaderColumn>
                <TableHeaderColumn>
                  <span>Coin</span>
                  <FloatingActionButton onClick={() => this.props.handleFilterText('coin-asc')} secondary={this.isActiveSort('coin-asc')} mini={true}>
                    <span aria-label="no-filter" role="img">👆</span>
                  </FloatingActionButton>
                  <FloatingActionButton onClick={() => this.props.handleFilterText('coin-desc')} secondary={this.isActiveSort('coin-desc')} mini={true}>
                    <span aria-label="no-filter" role="img">👇</span>
                  </FloatingActionButton>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Event Date
                  <FloatingActionButton onClick={() => this.props.handleFilterText('date_event-asc')} secondary={this.isActiveSort('date_event-asc')} mini={true}>
                    <span aria-label="no-filter" role="img">👆</span>
                  </FloatingActionButton>
                  <FloatingActionButton onClick={() => this.props.handleFilterText('date_event-desc')} secondary={this.isActiveSort('date_event-desc')} mini={true}>
                    <span aria-label="no-filter" role="img">👇</span>
                  </FloatingActionButton>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Created Date
                  <FloatingActionButton onClick={() => this.props.handleFilterText('created_date-asc')} secondary={this.isActiveSort('created_date-asc')} mini={true}>
                    <span aria-label="no-filter" role="img">👆</span>
                  </FloatingActionButton>
                  <FloatingActionButton onClick={() => this.props.handleFilterText('created_date-desc')} secondary={this.isActiveSort('created_date-desc')} mini={true}>
                    <span aria-label="no-filter" role="img">👇</span>
                  </FloatingActionButton>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Categories
                  <FloatingActionButton onClick={() => this.props.handleFilterText('category-asc')} secondary={this.isActiveSort('category-asc')} mini={true}>
                    <span aria-label="no-filter" role="img">👆</span>
                  </FloatingActionButton>
                  <FloatingActionButton onClick={() => this.props.handleFilterText('category-desc')} secondary={this.isActiveSort('category-desc')} mini={true}>
                    <span aria-label="no-filter" role="img">👇</span>
                  </FloatingActionButton>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Hot
                  <FloatingActionButton onClick={() => this.props.handleFilterText('is_hot-asc')} secondary={this.isActiveSort('is_hot-asc')} mini={true}>
                    <span aria-label="no-filter" role="img">👆</span>
                  </FloatingActionButton>
                  <FloatingActionButton onClick={() => this.props.handleFilterText('is_hot-desc')} secondary={this.isActiveSort('is_hot-desc')} mini={true}>
                    <span aria-label="no-filter" role="img">👇</span>
                  </FloatingActionButton>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Validation
                  <FloatingActionButton onClick={() => this.props.handleFilterText('percentage-asc')} secondary={this.isActiveSort('percentage-asc')} mini={true}>
                    <span aria-label="no-filter" role="img">👆</span>
                  </FloatingActionButton>
                  <FloatingActionButton onClick={() => this.props.handleFilterText('percentage-desc')} secondary={this.isActiveSort('percentage-desc')} mini={true}>
                    <span aria-label="no-filter" role="img">👇</span>
                  </FloatingActionButton>
                </TableHeaderColumn>
                <TableHeaderColumn>More Info</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow selectable={false} className="events__row">
                <TableRowColumn><span aria-label="no-filter" role="img">🤷‍</span></TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name="coin"
                    value={this.props.filter.coin}
                    onChange={e => this.props.handleFilterText('coin', e.target.value)}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name="date_event"
                    value={this.props.filter.date_event}
                    onChange={e => this.props.handleFilterText('date_event', e.target.value)}
                  />
                </TableRowColumn>
                <TableRowColumn><span aria-label="no-filter" role="img">🤷‍</span></TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name="category"
                    value={this.props.filter.category}
                    onChange={e => this.props.handleFilterText('category', e.target.value)}
                  />
                </TableRowColumn>
                <TableRowColumn><span aria-label="no-filter" role="img">🤷‍</span></TableRowColumn>
                <TableRowColumn><span aria-label="no-filter" role="img">🤷‍</span></TableRowColumn>
                <TableRowColumn><span aria-label="no-filter" role="img">🤷‍</span></TableRowColumn>
              </TableRow>
              {tableBody}
            </TableBody>
          </Table>
        </Paper>
     </div>
    );
  }
}

export default Events;