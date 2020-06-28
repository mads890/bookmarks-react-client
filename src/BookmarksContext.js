import React from 'react';

const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: () => {},
    patchBookmark: () => {},
});

export default BookmarksContext;