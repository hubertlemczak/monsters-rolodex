import { Component } from 'react';
import CardList from './components/card-list/card-list-component';
import SearchBox from './components/search-bar/search-box-component';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      filterSearch: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) =>
        this.setState(() => {
          return { monsters: data };
        })
      );
  }

  onSearchChange = (e) => {
    const filterSearch = e.target.value.toLowerCase();
    this.setState(() => {
      return { filterSearch };
    });
  };

  render() {
    const { onSearchChange } = this;
    const { monsters, filterSearch } = this.state;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(filterSearch)
    );
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          className="monsters-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
