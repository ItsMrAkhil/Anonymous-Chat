/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  MESSAGE_SEND_SUCCESS,
  SEND_MESSAGE,
  CHANGE_MESSAGE_FORM,
  SOCKET_CONNECT_SUCCESS,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
} from './constants';

const initialState = fromJS({
  inputMessage: '',
  messages: [],
  socketId: '',
  currentPage: 1,
  totalPages: 2,
});

function homePageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DEFAULT_ACTION:
      return state;
    case SEND_MESSAGE:
      return state
        .set('sendingMessage', true);
    case CHANGE_MESSAGE_FORM:
      return state
        .set('inputMessage', payload);
    case MESSAGE_SEND_SUCCESS:
      return state
        .set('sendingMessage', false)
        .set('inputMessage', '')
        .set('messages', state.get('messages').push(payload));
    case FETCH_MESSAGES:
      return state
        .set('fetchingMessages', true);
    case SOCKET_CONNECT_SUCCESS:
      return state
        .set('socketId', payload);
    case FETCH_MESSAGES_SUCCESS:
      return state
        .set('currentPage', payload.nextPage)
        .set('totalPages', payload.totalPages)
        .set('fetchingMessages', false)
        .set('messages', fromJS(payload.messages.reverse().concat(state.get('messages').toJS())));
    default:
      return state;
  }
}

export default homePageReducer;
