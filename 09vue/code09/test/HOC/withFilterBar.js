import ReactDOM from 'react-dom';
import React, { Component } from 'react';
export default title => WrappedComponent => {
  return class WithFilterBar extends Component {
    state = {
      title
    };
    changeTitle = title => {
      this.setState({
        title: title
      });
    };

    getFilter = filter => {
      console.warn(
        'EventTriggered: \nFilterBar got new filter, need to request data again!\nThe filter is',
        filter
      );
      this.props.onFilterChange(filter);
    };

    render() {
      const { isActive, container, index, toggleActive } = this.props;
      return (
        <>
          {isActive && (
            <div className="filter-wrapper">
              <WrappedComponent
                changeTitle={this.changeTitle}
                setFilter={this.getFilter}
              />
            </div>
          )}
          {container &&
            ReactDOM.createPortal(
              <span
                onClick={() => {
                  toggleActive(index);
                }}
              >
                {this.state.title}
              </span>,
              container
            )}
        </>
      );
    }
  };
};
