/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Button, Col, FormControl, FormGroup, Glyphicon, InputGroup, Panel, Row } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';

import { changeMessageForm, sendMessage, fetchMessages } from './actions';
import makeSelectHomePage from './selectors';

import Messages from './messages';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    if (!localStorage.getItem('chatId')) {
      localStorage.setItem('chatId', uuidv4());
    }
    this.props.onFetchMessages();
  }

  footerComponent = () => {
    const { onSendMessage, onChangeMessageForm, homePage: { sendingMessage, inputMessage } } = this.props;
    return (<div>
      <form onSubmit={(evt) => onSendMessage(evt, inputMessage)}>
        <FormGroup>
          <InputGroup>
            <FormControl required value={inputMessage} onChange={onChangeMessageForm} type="text" />
            <InputGroup.Button>
              <Button disabled={sendingMessage} type="submit">
                { sendingMessage ? <i className="fa fa-spin fa-spinner" /> : <Glyphicon glyph="send" />} Send Message
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </div>
    );
  };

  render() {
    const { homePage: { fetchingMessages, totalPages, currentPage }, onFetchMessages } = this.props;
    return (
      <div className="container" style={{ height: '100%' }}>
        <Helmet
          title="Anonymous Chat - Home"
          meta={[
            { name: 'description', content: 'Description of HomePage' },
          ]}
        />
        <Row >
          <Col xs={12} md={8} mdOffset={2}>
            <Panel style={{ backgroundColor: '#e5e5e5' }} header="Entire chat history" footer={this.footerComponent()} bsStyle="info">
              <center>
                {
                  totalPages < currentPage
                    ?
                      'No more messages.'
                    :
                      <Button onClick={onFetchMessages} disabled={fetchingMessages}>
                        {fetchingMessages ? <span><i className="fa fa-spin fa-spinner" /> Loading..</span> : 'Load more messages'}
                      </Button>
                }
              </center>
              <Messages />
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

HomePage.propTypes = {
  onChangeMessageForm: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  onFetchMessages: PropTypes.func.isRequired,
  homePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeMessageForm: (evt) => dispatch(changeMessageForm(evt.target.value)),
    onSendMessage: (evt, message) => {
      evt.preventDefault();
      dispatch(sendMessage(message));
    },
    onFetchMessages: () => dispatch(fetchMessages()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
