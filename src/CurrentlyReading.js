import React from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'

class CurrentlyReading extends React.Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }
    render(){
        const {books, onChangeShelf} = this.props
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <BookList books={books} onChangeShelf={onChangeShelf} />
            </div>
          </div>
        )
    }
}

export default CurrentlyReading