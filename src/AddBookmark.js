import React, { Component } from 'react';
import BookmarksContext from './BookmarksContext';

class AddBookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            url: "",
            description: "",
            rating: 1
        };
    }

    static contextType = BookmarksContext;

    titleChange = (title) => {
        this.setState({
            title
        });
    }

    urlChange = (url) => {
        this.setState({
            url
        });
    }

    descriptionChange = (description) => {
        this.setState({
            description
        });
    }

    ratingChange = (rating) => {
        this.setState({
            rating
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {title, url, description, rating} = this.state;
        const bookmark = {title, url, description, rating};
        const url='https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
        const options = {
            method: 'POST',
            body: JSON.stringify(bookmark),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer {apikey}"
            }
        };
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    title: "",
                    url: "",
                    description: "",
                    rating: 1
                });
                this.context.addBookmark(data);
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const error = this.state.error
            ? <div className="error">{this.state.error}</div>
            : "";
        return (
            <div classNmae="addbookmark">
                <h2>Add Bookmark</h2>
                <form className="addbookmark__form">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" placeholder="Title" value={this.state.title} onChange={e => this.titleChange(e.target.value)}/>
                    <label htmlFor="url">Url:</label>
                    <input type="text" name="url" id="url" placeholder="Url" value={this.state.url} onChange={e => this.urlChange(e.target.value)}/>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" placeholder="Description" value={this.state.description} onChange={e => this.descriptionChange(e.target.value)}/>
                    <label htmlFor="rating">Rathing:</label>
                    <input type="number" name="rating" id="rating" min="1" max="5" value={this.state.rating} onChange={e => this.ratingChange(e.target.value)}/>

                    <div className="addbookmark__buttons">
                        <button onClick={this.handleClickCancel}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddBookmark;