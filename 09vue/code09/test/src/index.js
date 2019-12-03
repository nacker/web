import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FilterBar from '../components/FilterBar';
import NameFilter from '../components/NameFilter';
import AgeFilter from '../components/AgeFilter';
import GenderFilter from '../components/GenderFilter';

import './styles.css';
import withFilterBar from '../HOC/withFilterBar';

const NameFilterWithFilterBar = withFilterBar('name')(NameFilter);

const AgeFilterWithFilterBar = withFilterBar('age')(AgeFilter);

const GenderFilterWithFilterBar = withFilterBar('gender')(GenderFilter);

class App extends Component {
  onFilterChange = filter => {
    alert('根组件接收到新的filter了');
  };
  render() {
    return (
      <div className="App">
        <h1>Filter Bar</h1>
        <h3>
          在链家上看到如图的筛选效果,每个筛选项展开的内容都不一样，所以就尝试封装一下，看看能不能让这个组件实现起来更灵活。
        </h3>
        <img src="./1.png" width={200} />
        <img src="./2.png" width={200} />
        <img src="./3.png" width={200} />
        <img src="./4.png" width={200} />

        <FilterBar>
          <NameFilterWithFilterBar onFilterChange={this.onFilterChange} />
          <GenderFilterWithFilterBar onFilterChange={this.onFilterChange} />
          <AgeFilterWithFilterBar onFilterChange={this.onFilterChange} />
        </FilterBar>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
