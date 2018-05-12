import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
/* components */
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
/* styles */
import '../styles/chips.scss';

class DropDownMultiSelect extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    handleChangeList: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
      symbol: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired
    })).isRequired
  }

  state = {
    searchText: '',
    options: []
  }

  async componentDidMount() {
    let { options } = this.props;

    if (typeof this.props.options === 'string') {
      const response = await axios.get(this.props.options);
      options = response.data;
    }

    options = options.map((option, index) => {
      if (option.symbol) {
        return {
          text: `${option.symbol} – ${option.name}`,
          value: option.id,
          symbol: option.symbol,
          index
        };
      } else {
        return {
          text: option.name,
          value: option.id,
          symbol: option.name,
          index
        };
      }
    });

    this.setState({ options });
  }

  handleChange = searchText => this.setState({ searchText });

  handleOnNewRequest = (coin) => {
    if (typeof coin !== 'object') return;
    const options = this.state.options.filter(option => option.value !== coin.value);
    this.props.handleChangeList(this.props.id, coin, 'add');
    this.setState({ options });
  };

  handleOnRequestDelete = (symbol) => {
    const coin = this.props.values.find(value => value.symbol === symbol);

    const options = [
      ...this.state.options.slice(0, coin.index),
      coin,
      ...this.state.options.slice(coin.index)
    ];

    this.props.handleChangeList(this.props.id, symbol, 'remove');
    this.setState({ options });
  };

  render() {
    if (!this.state.options.length) {
      return (
        <CircularProgress size={80} thickness={5} />
      );
    }

    const chips = this.props.values.map(value => (
      <Chip
        style={{ margin: 'inherit' }}
        key={value.symbol}
        onRequestDelete={() => this.handleOnRequestDelete(value.symbol)}
      >
        {value.symbol}
      </Chip>
    ));

    return (
      <div className={this.props.className}>
        <h2>{this.props.title}</h2>
        <div className="chips">
          {chips}
        </div>
        <AutoComplete
          floatingLabelText={this.props.placeholder}
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.options}
          dataSourceConfig={{ text: 'text', value: 'value'}}
          openOnFocus
          onClose={() => this.handleChange('')}
          onNewRequest={this.handleOnNewRequest}
          onUpdateInput={this.handleChange}
          searchText={this.state.searchText}
          listStyle={{ maxHeight: 500 }}
        />
      </div>
    );
  }
}

export default DropDownMultiSelect;