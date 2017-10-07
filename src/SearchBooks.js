import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends React.Component{
    static propTypes = {
      onChangeShelf: PropTypes.func.isRequired
    }

    state = {
      query: '',
      books: []
    }

    componentDidMount(){
      if(this.state.query){
        BooksAPI.search(this.query).then((data) => {
          console.log("tapinda")
          if(data.error){
            console.log("hapana")
            this.setState({books:[]})
          } else{
            console.log(data);
            this.setState({books:data});
          }
        })
      }
    }

    updateQuery = (query) => {
      this.setState({query:query.trim()})
    }

    clearQuery = () => {
        this.setState({query: '', books:[]})

    }

    render(){
      const {onChangeShelf} = this.props
      const {query, books} = this.state

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                       placeholder="Search by title or author"
                       onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        onChange={event =>
                          onChangeShelf(book, event.target.value)}
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors.map((author, index) => (
                      <span key={index}>{author}. </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks