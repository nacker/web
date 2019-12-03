import React, { Component } from 'react';

export default class NameFilter extends Component {
  state = {
    title: ''
  };
  render() {
    return (
      <div>
        <h3>GenderFilter组件内容</h3>
        <input
          type="text"
          value={this.state.title}
          onChange={e => {
            this.setState({ title: e.target.value });
          }}
        />
        <button
          onClick={() => {
            this.props.changeTitle(this.state.title);
            this.props.setFilter({ gender: this.state.title });
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
