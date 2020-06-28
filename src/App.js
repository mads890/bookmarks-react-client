import React, { Component } from 'react';
import './App.css';
import BookmarkApp from './BookmarkApp';
import BookmarksContext from './BookmarksContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      showAddForm: false
    };
  }

componentDidMount() {
  const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
  const options = {
    method: 'GET',
    headers: {
      "Authorization": "Bearer {apikey}",
      "Content-Type": "application/json"
    }
  };

  fetch(url, options) 
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        bookmarks: data,
        error: null
      });
    })
    .catch(err => {
      this.setState({
        error: err.message
      });
    })
}

setShowAddForm = (show) => {
  this.setState({
    showAddForm: show;
  })
}

addBookmark = (bookmark) => {
  this.setState({
    bookmarks: [...this.state.bookmarks, bookmark],
    showAddForm: false
  });
}

patchBookmark = (id, newData) => {
  let newBookmark = this.state.bookmarks.find(bookmark => bookmark.id === id)
  newBookmark = {
    ...newBookmark,
    ...newData,
  }
  let newList = this.state.bookmarks.splice(newBookmark.id, 1)
  // ??? newList.insert(newBookmark, newBookmark.id - 1)
  newList.push(newBookmark)
  this.setState({
    bookmarks: newList
  })
}

  render() {
    const page = this.state.showAddForm
      ? <AddBookmark handleAdd={bookmark => this.addBookmark(bookmark)} hideForm={show => this.setShowAddForm(show)}/>
      : <BookmarkApp bookmarks={this.state.bookmarks} showForm={show => this.setShowAddForm(show)} />
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      patchBookmark: this.patchBookmark,
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route path='/add-bookmark' component={AddBookmark} />
            <Route exact path='/bookmark' component={BookmarkList} />
            <Route path='/edit-bookmark/:id' component={EditBookmark} />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
