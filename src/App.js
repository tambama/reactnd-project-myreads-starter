import React from 'react'
import {Route, Link} from 'react-router-dom'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books:books});
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({books:books});
      })
    })
  }


  render() {

    const {books} = this.state

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks onChangeShelf={this.changeShelf}/>
        )} />
          
          <Route exact path="/" render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                
                <CurrentlyReading onChangeShelf={this.changeShelf} books={books.filter((book) => book.shelf === "currentlyReading")}/>

                <WantToRead onChangeShelf={this.changeShelf} books={books.filter((book) => book.shelf === "wantToRead")}/>

                <Read onChangeShelf={this.changeShelf} books={books.filter((book) => book.shelf === "read")}/>
                
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
            </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
