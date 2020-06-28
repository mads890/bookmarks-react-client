import React, { Component } from 'react';
import BookmarksContext from './BookmarksContext';
import BookmarkListItem from './BookmarkItem';

class BookmarkList extends Component {
    static defaultProps = {
        bookmarks: []
    }
    static contextType = BookmarksContext;
    render() {
        const { bookmarks } = this.context
        const bookmarksList = bookmarks.map(bookmark => {
            <BookmarkListItem key={bookmark.id} {...bookmark} />
        })
        return (
            <section className="BookmarkList">
                <h2>Bookmarks:</h2>
                <ul>
                    {bookmarksList}
                </ul>
            </section>
        );
    }
}

export default BookmarkList;