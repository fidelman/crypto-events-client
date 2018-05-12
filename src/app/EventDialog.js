import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
/* components */
import Dialog from 'material-ui/Dialog';
/* styles */
import '../styles/event-dialog.scss';

const EventDialog = ({
  event,
  open,
  onRequestClose
}) => {
  if (!Object.keys(event).length) return null;
  console.log(event);
  return (
    <Dialog
      title={event.title}
      modal={false}
      open={open}
      onRequestClose={onRequestClose}
      autoScrollBodyContent
    >
      <div className="event-dialog">
        <p>{`${event.coin.symbol} – ${event.coin.name} ${event.is_hot ? '🔥' : ''}`}</p>
        <p><strong>Created Date:</strong> {moment(event.date_event).format('DD/MM/YY')}</p>
        <p><strong>Event Date:</strong> {moment(event.created_date).format('DD/MM/YY')}</p>
        <p>{event.description}</p>
        <p><strong>Category:</strong> {event.category.name}</p>
        <p>Validity is {event.percentage}% of {event.vote_count} votes</p>
        <p><strong>Source:</strong> <a href={event.source} target="_blacnk">{event.title}</a></p>
        <p><strong>Twitter:</strong> {event.twitter_account ? <a href={`https://twitter.com/${event.twitter_account}`} target="_blank">{event.twitter_account}</a> : '🤷‍♀️'}</p>
        <p><strong>Proof:</strong> <a href={event.proof} target="_bkank">Picture</a></p>
      </div>
    </Dialog>
  );
};

EventDialog.propTypes = {
  event: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default EventDialog;

