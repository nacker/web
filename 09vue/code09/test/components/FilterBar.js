import React, { Children, Component } from 'react';

export default class FilterBar extends Component {
  state = {
    titleContainer: null,
    activeIndex: -1
  };

  toggleActive = index => {
    this.setState({
      activeIndex: index === this.state.activeIndex ? -1 : index
    });
  };

  render() {
    const childrenWithProps = Children.map(this.props.children, (item, index) =>
      React.cloneElement(item, {
        container: this.state.titleContainer,
        isActive: index === this.state.activeIndex,
        toggleActive: this.toggleActive,
        index
      })
    );

    return (
      <div>
        <div
          className={
            this.state.activeIndex !== -1 ? 'filter-bar active' : 'filter-bar'
          }
          ref={c =>
            !this.state.titleContainer && this.setState({ titleContainer: c })
          }
        />
        {childrenWithProps}
      </div>
    );
  }
}
