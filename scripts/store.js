const store = (function() {
  const state = {
    items: [],
    displayAddBookmarkForm: false
  };

  // {
  //   "id": "8sdfbvbs65sd",
  //   "title": "Google",
  //   "url": "http://google.com",
  //   "desc": "An indie search engine startup",
  //   "rating": 4
  // }
  const addItem = function(bookmarkObj) {
    state.items.push(Object.assign(
      bookmarkObj, 
      {expanded: false}
    ));
  };

  const populateStore = function() {
    api.fetchItems((items) => {
      items.forEach((item) => store.addItem(item));
    });
  };

  const toggleAddBookmarkForm = function() {
    state.displayAddBookmarkForm = !state.displayAddBookmarkForm;
  };

  const shouldDisplayAddForm = function() {
    return state.displayAddBookmarkForm === true;
  }

  return {
    state,

    populateStore,
    toggleAddBookmarkForm,
    shouldDisplayAddForm,
    addItem
  };
}());