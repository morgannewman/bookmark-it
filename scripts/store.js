const store = (function() {
  const state = {
    items: [],
    displayAddBookmarkForm: false,
    displayRatingFilterMenu: false,
    ratingsFilterLevel: 0
  };

  // UTILS

  const findById = function(id) {
    return state.items.find(((item) => item.id === id));
  };

  const populateStore = function() {
    // api.MOCK_DATA.forEach((item) => store.addItem(item));
    // list.render();
    api.fetchItems((items) => {
      items.forEach((item) => {
        store.addItem(item);
      });
      list.render();
    });
  };

  // ADDING

  const addItem = function(bookmarkObj) {
    state.items.unshift(Object.assign(
      bookmarkObj, 
      {expanded: false}
    ));
  };

  const toggleAddBookmarkForm = function() {
    state.displayAddBookmarkForm = !state.displayAddBookmarkForm;
  };

  const shouldDisplayAddForm = function() {
    return state.displayAddBookmarkForm === true;
  }

  // REMOVING

  const findAndDelete = function(id) {
    const itemIndex = state.items.findIndex(((item) => item.id === id));
    state.items.splice(itemIndex, 1);
  };

  // FILTERING
  const setFilterLevel = function(level) {
     state.ratingsFilterLevel = level;
  };

  const toggleRatingsFilterMenu = function() {
    state.displayRatingFilterMenu = !state.displayRatingFilterMenu;
  };

  const shouldDisplayFilterMenu = function() {
    return state.displayRatingFilterMenu === true;
  };

  // EXPANDING/CONTRACTING CARDS
  
  const toggleItemIsExpanded = function(item) {
    item.expanded = !item.expanded;
  };

  return {
    state,

    // Utils
    findById,
    populateStore,
    // Adding
    toggleAddBookmarkForm,
    shouldDisplayAddForm,
    addItem,
    // Removing
    findAndDelete,
    // Filtering
    shouldDisplayFilterMenu,
    toggleRatingsFilterMenu,
    setFilterLevel,
    // Expand/Contract cards
    toggleItemIsExpanded
  };
}());