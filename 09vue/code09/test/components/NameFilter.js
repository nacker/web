import React, { Component } from 'react';

export default class NameFilter extends Component {
  render() {
    return (
      <div>
        <h3>NameFilter组件内容</h3>
        <select
          onChange={e => {
            this.props.changeTitle(e.target.value);
            this.props.setFilter({ name: e.target.value });
          }}
        >
          <option value="刘玺">刘玺</option>
          <option value="马文星">马文星</option>
          <option value="李涛涛">李涛涛</option>
          <option value="曹朱伟">曹朱伟</option>
        </select>
      </div>
    );
  }
}
