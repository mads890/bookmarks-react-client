import {React, Component} from 'react';
import BookmarksContext from './BookmarksContext';
import {Link} from 'react-router-dom'

class BookmarkListItem extends Component {

    static contextType = BookmarksContext;

    handleDeleteBookmark = (id, func) => {
        fetch(`/api/bookmarks/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': 'API_TOKEN'
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
        })
        .then(() => {
            func(id)
        })
        .catch(err => {
            console.error(err)
        })
    }

    render() {
        return (
            <li>
                <h3>{this.props.title}</h3>
                <p>Rating: {this.props.rating}</p>
                <p>{this.props.description}</p>
                <button><Link to={`/edit-bookmark/${this.props.id}`}>Edit</Link></button> 
                <button onclick={() => this.handleDeleteBookmark(this.props.id, this.context.deleteBookmark))}>Delete</button>
            </li>
        )
    }
}

export default BookmarkListItem;