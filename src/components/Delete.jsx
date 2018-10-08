import React, { Component } from 'react';
import axios from 'axios';

class Delete extends Component {
  state = { activeUser: '5b9bc4254c18302d443a6330' };
  render() {
    return (
      <button
        onClick={() => {
          this.props.deleteFunction(this.props.commentId);
        }}
      >
        Delete
      </button>
    );
  }
}

export default Delete;
