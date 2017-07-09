/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TimeAgo from 'react-timeago';
import { Col, Row } from 'react-bootstrap';

import makeSelectHomePage from './selectors';

export class Messages extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  renderMessages() {
    const { messages } = this.props.homePage;
    return messages.map((unitMessage, index) => {
      let offset = 0;
      if (unitMessage.chatId === localStorage.getItem('chatId')) {
        offset = 3;
      }
      return (
        <Col key={index} xs={9} xsOffset={offset}>
          <div className={offset > 0 ? 'pull-right talk-bubble tri-right right-top' : 'talk-bubble tri-right left-top'}>
            <div className="talktext">
              {unitMessage.message} <br />
              <small className={offset > 0 ? 'pull-right' : ''}><TimeAgo date={unitMessage.createdAt} /></small>
            </div>
          </div>
        </Col>
      );
    });
  }

  render() {
    return (
      <Row>
        {this.renderMessages()}
      </Row>
    );
  }
}

Messages.propTypes = {
  homePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});


export default connect(mapStateToProps)(Messages);
