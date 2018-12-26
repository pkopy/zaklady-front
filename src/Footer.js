import React, { Component } from 'react';

class Footer extends Component {
  render () {
    const {test} = this.props
    return (
      <footer className="Footer">
        {test}
      </footer>
    );
  };
};

export default Footer