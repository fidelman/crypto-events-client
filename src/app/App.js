import React, { Component } from 'react';
import axios from 'axios';
import Filter from './Filter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import moment from 'moment';
import '../styles/App.scss';
import Events from './Events';

class App extends Component {
  state = {
    accessToken: 'NWNlMjgyNjE2ZDM4Njc0MDI3ODQwMTVjMDZhNWFlNTZmMDM0ZjUxMjkwNDFjNGMzNjNiYzBiOTQ4MGViYzc1Mg',
    events: '',
    idealEvents: [],
    isEventsPending: false,
    page: 1,
    max: 150,
    filter: {
      coin: '',
      date_event: '',
      category: ''
    },
    sort: {
      id: '',
      by: ''
    }
  }

  handleFilterText = (field, value) => {
    const newState = value
      ? {
        filter: {
          ...this.state.filter,
          [field]: value
        }
      } : {
        sort: {
          id: `${this.state.sort.id}-${this.state.sort.by}` === field ? '' : field.split('-')[0],
          by: `${this.state.sort.id}-${this.state.sort.by}` === field ? '' : field.split('-')[1],
        }
      }

    this.setState(newState, () => {
      const { coin, date_event, category } = this.state.filter;

      const events = this.state.idealEvents.filter((event) => {
        return (
          event.coin.symbol.toUpperCase().includes(coin.toUpperCase())
          && event.category.name.toUpperCase().includes(category.toUpperCase())
          && moment(event.date_event).format('DD/MM/YY').includes(date_event)
        );
      }).sort((a, b) => {
        if (this.state.sort.id === 'coin') {
          if (this.state.sort.by === 'asc') {
            if (a.coin.symbol > b.coin.symbol) {
              return 1;
            } else if (a.coin.symbol < b.coin.symbol) {
              return -1;
            } else {
              return 0;
            }
          } else {
            if (a.coin.symbol < b.coin.symbol) {
              return 1;
            } else if (a.coin.symbol > b.coin.symbol) {
              return -1;
            } else {
              return 0;
            }
          }
        } else {
          if (this.state.sort.by === 'asc') {
            if (a[this.state.sort.id] > b[this.state.sort.id]) {
              return 1;
            } else if (a[this.state.sort.id] < b[this.state.sort.id]) {
              return -1;
            } else {
              return 0;
            }
          } else {
            if (a[this.state.sort.id] < b[this.state.sort.id]) {
              return 1;
            } else if (a[this.state.sort.id] > b[this.state.sort.id]) {
              return -1;
            } else {
              return 0;
            }
          }
        }
      });

      this.setState({ events });
    });
  };

  handleGetEvents = async (fields) => {
    this.setState({ isEventsPending: true });
    
    const url = `https://api.coinmarketcal.com/v1/events?access_token=${this.state.accessToken}&page=${this.state.page}&max=${this.state.max}&dateRangeStart=${moment(fields.dateRangeStart).format('l')}&dateRangeEnd=${moment(fields.dateRangeEnd).format('l')}&coins=${getListValues(fields.coins)}&categories=${getListValues(fields.categories)}&sortBy=${fields.sortBy}&showOnly=${fields.showOnly}&showMetadata=true`;

    function getListValues(list) {
      return Object.values(list).map(obj => obj.value).join(',');
    }
    
    const reponse = await axios.get(url); // { records, _metadata }

    // make a structure without lists
    const events = [];
    reponse.data.records.forEach((event) => { // one event can belong to several coins
      event.coins.forEach((coin) => {
        event.categories.forEach((category) => {
          events.push({
            ...event,
            coin,
            category
          })
        });
      });
    });

    this.setState({
      events,
      idealEvents: events,
      isEventsPending: false
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Filter
            accessToken={this.state.accessToken}
            handleGetEvents={this.handleGetEvents}
            isEventsPending={this.state.isEventsPending}
          />
          <Events
            events={this.state.events}
            isEventsPending={this.state.isEventsPending}
            handleFilterText={this.handleFilterText}
            filter={this.state.filter}
            sort={this.state.sort}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
