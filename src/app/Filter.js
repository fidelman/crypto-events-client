import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* components */
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DateRange from './DateRange';
import DropDownField from './DropDownField';
import DropDownMultipleSelect from './DropDownMultipleSelect';
/* styles */
import '../styles/paper.scss';
import '../styles/filter.scss';

class Filter extends Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    handleGetEvents: PropTypes.func.isRequired,
    isEventsPending: PropTypes.bool.isRequired
  }

  state = {
    fields: {
      dateRangeStart: new Date(),
      dateRangeEnd: new Date(),
      coins: [],
      categories: [],
      sortBy: '',
      showOnly: ''
    }
  };

  handleChangePrimitive = (field, value) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value
      }
    });
  };

  handleChangeList = (list, symbol, action) => {
    const { fields } = this.state;
    const oldList = fields[list];
    if (!oldList) return;

    let newList = oldList;

    if (action === 'add') {
      newList.push(symbol);
    } else if (action === 'remove') {
      newList = oldList.filter(item => item.symbol !== symbol);
    }

    this.setState({
      fields: {
        ...this.state.fields,
        [list]: newList
      }
    });
  };

  render() {
    const { fields } = this.state;

    return (
      <Paper className="paper filter" zDepth={2}>
        <DateRange
          dateRangeStart={fields.dateRangeStart}
          dateRangeEnd={fields.dateRangeEnd}
          handleChangePrimitive={this.handleChangePrimitive}
        />
        <DropDownMultipleSelect
          id="coins 💰"
          className="coin-picker"
          title="Pick a coin"
          placeholder="Start typing..."
          options={`https://api.coinmarketcal.com/v1/coins?access_token=${this.props.accessToken}`}
          handleChangeList={this.handleChangeList}
          values={fields.coins}
        />
        <DropDownMultipleSelect
          id="categories"
          className="category-picker"
          title="Pick a category"
          placeholder="Start typing..."
          options={`https://api.coinmarketcal.com/v1/categories?access_token=${this.props.accessToken}`}
          handleChangeList={this.handleChangeList}
          values={fields.categories}
        />
        <DropDownField
          title="Show Only"
          placeholder="what?"
          value={fields.showOnly}
          handleChangePrimitive={this.handleChangePrimitive}
          className="show-only"
          id="showOnly"
          options={[
            { value: ' ', primaryText: 'All' },
            { value: 'hot_events', primaryText: 'Hot Events' }
          ]}
        />
        <DropDownField
          title="Sort By"
          placeholder="by what?"
          value={fields.sortBy}
          handleChangePrimitive={this.handleChangePrimitive}
          className="sort-by"
          id="sortBy"
          options={[
            { value: null, primaryText: '' },
            { value: 'created_desc', primaryText: 'Last Added' },
            { value: 'hot_events', primaryText: 'Hot Events' }
          ]}
        />
        <RaisedButton
          label="Get Events 🚀"
          fullWidth
          primary
          disabled={this.props.isEventsPending}
          onClick={() => this.props.handleGetEvents(this.state.fields)}
        />
      </Paper>
    );
  }
}

export default Filter;