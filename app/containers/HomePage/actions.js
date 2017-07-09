/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  SEND_MESSAGE,
  CHANGE_MESSAGE_FORM,
  FETCH_MESSAGES,
  FETCH_MESSAGES_ERROR,
  FETCH_MESSAGES_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeMessageForm(value) {
  return {
    type: CHANGE_MESSAGE_FORM,
    payload: value,
  };
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    payload: { message, chatId: localStorage.getItem('chatId') },
  };
}

export function fetchMessages() {
  return {
    type: FETCH_MESSAGES,
  };
}

export function fetchMessagesSuccess(response) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: response,
  };
}

export function fetchMessagesError(response) {
  return {
    type: FETCH_MESSAGES_ERROR,
    payload: response,
  };
}
