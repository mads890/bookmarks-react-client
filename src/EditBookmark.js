import { React, Component } from 'react';
import BookmarksContext from './BookmarksContext';
import PropTypes from 'prop-types';
import config from '../config'

class EditBookmark extends Component {

    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
    };

    state = {
        id: '',
        title: '',
        url: '',
        description: '',
        rating: 1,
        error: null,
    };

    static contextType = BookmarksContext;

    handleEditBookmark = (e) => {
        const { id } = this.props.match.params
        const { title, url, description, rating } = this.state
        const updatedBookmark = { title, url, description, rating }
        e.preventDefault();

        fetch(`/api/bookmarks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'API_TOKEN'
            },
            body: JSON.stringify(updatedBookmark),
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(err => Promise.reject(err))
            }
        })
        .then(() => {
            this.resetForm(id, updatedBookmark)
            this.context.patchBookmark(id, updatedBookmark)
            this.props.history.push('/')
        })
        .catch(err => {
            console.error(err)
            this.setState({
                error: err,
            })
        })
    }

    resetForm = (id, newData) => {
        this.setState({
            id: id || '',
            title: newData.title || '',
            url: newData.url || '',
            description: newData.description || '',
            rating: newData.rating || '',
        })
    }

    handleUpdateTitle = (title) => {
        this.setState({
            title
        })
    }

    handleUpdateUrl = (url) => {
        this.setState({
            url
        })
    }

    handleUpdateDescription = (description) => {
        this.setState({
            description
        })
    }

    handleUpdateRating = (rating) => {
        this.setState({
            rating
        })
    }

    validateUrl = (url) => {

    }

    validateRating = (rating) => {
        if(Number.isNaN(rating)) {
            return <p>rating must be a number</p>
        }
        if(rating > 5 || rating < 1) {
            return <p>rating must be a number between 1-5</p>
        }
    }

    handleCancel = () => {
        this.props.history.push('/')
    }

    componentDidMount() {
        const { id } = this.props.match.params
        fetch(`/api/bookmarks/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`,
                'Content-Type': 'application/json'
            }
        }) 
        .then(response => {
            if (!response.ok) {
                return res.json().then(err => Promise.reject(err));
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                id: data.id,
                title: data.title,
                url: data.url,
                description: data.description,
                rating: data.rating,
            });
        })
        .catch(err => {
            console.error(err)
            this.setState({
            error: err.message
        });
        })
    }

    render() {
        return (
            <section>
                <h2>Edit Bookmark:</h2>
                <form onSubmit={e => this.handleEditBookmark(e)}>
                    <input required type='text' value={this.state.title} onChange={e => this.handleUpdateTitle(e.target.value)} aria-label='Title' />
                    <input required type='text' value={this.state.url} onChange={e => this.handleUpdateUrl(e.target.value)} aria-label='Bookmark URL' />
                    <textarea required value={this.state.description} onChange={e => this.handleUpdateDescription(e.target.value)} aria-label='Description' />
                    <input required type='number' min='1' max='5' value={this.state.rating} onChange={e => this.handleUpdateRating(e.target.value)} />
                    <button type='submit'>Update Bookmark</button>{' '}<button type='button' onClick={this.handleCancel}>Cancel</button>
                </form>
            </section>
        );
    }
}

export default EditBookmark;