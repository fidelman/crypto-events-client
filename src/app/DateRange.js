import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* components */
import DatePicker from 'material-ui/DatePicker';

class DateRange extends Component {
  static propTypes = {
    dateRangeStart: PropTypes.object.isRequired,
    dateRangeEnd: PropTypes.object.isRequired,
    /* func */
    handleChangePrimitive: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="date-range">
        <h2>Data Range</h2>
        <DatePicker
            onChange={(event, date) => this.props.handleChangePrimitive('dateRangeStart', date)}
            autoOk
            floatingLabelText="Date From"
            value={this.props.dateRangeStart}
          />
          <DatePicker
            onChange={(event, date) => this.props.handleChangePrimitive('dateRangeEnd', date)}
            autoOk
            floatingLabelText="Date To"
            value={this.props.dateRangeEnd}
          />
      </div>
    );
  }
}

export default DateRange;