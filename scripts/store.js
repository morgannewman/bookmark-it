const store = (function() {
  const state = {
    items: [],
    displayAddBookmarkForm: false
  }

  const toggleAddBookmarkForm = function() {
    state.displayAddBookmarkForm = !state.displayAddBookmarkForm;
  };

  const shouldDisplayAddForm = function() {
    return state.displayAddBookmarkForm === true;
  }

  return {
    state,

    toggleAddBookmarkForm,
    shouldDisplayAddForm
  };
}());