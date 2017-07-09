import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

import WithProgressBar from 'components/ProgressBar';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Anonymous Chat</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

export default WithProgressBar(App);
