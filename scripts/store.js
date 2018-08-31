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

  const findById = function(id) {
    return state.items.find(((item) => item.id === id));
  };

  const findAndDelete = function(id) {
    const itemIndex = state.items.findIndex(((item) => item.id === id));
    console.log(itemIndex);
    state.items.splice(itemIndex, 1);
  }

  const populateStore = function() {
    api.MOCK_DATA.forEach((item) => store.addItem(item));
    list.render();
    // api.fetchItems((items) => {
    //   items.forEach((item) => {
    //     store.addItem(item);
    //   });
    //   list.render();
    // });
  };

  const toggleItemIsExpanded = function(item) {
    item.expanded = !item.expanded;
  };

  const toggleAddBookmarkForm = function() {
    state.displayAddBookmarkForm = !state.displayAddBookmarkForm;
  };

  const shouldDisplayAddForm = function() {
    return state.displayAddBookmarkForm === true;
  }

  return {
    state,
    toggleItemIsExpanded,
    populateStore,
    findById,
    findAndDelete,
    toggleAddBookmarkForm,
    shouldDisplayAddForm,
    addItem
  };
}());