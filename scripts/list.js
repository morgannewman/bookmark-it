const list = (function() {
  const page = {
    addBookmarkToggler: $('.js-add-bookmark-toggler'),
    addBookmarkFormContainer: $('.add-bookmark-container'),
    addBookmarkForm: $('.add-bookmark-form')
  };

  const handleBookmarkFormDisplay = function() {
    if (store.shouldDisplayAddForm()) {
      page.addBookmarkFormContainer.toggle(true);
    }
    else {
      page.addBookmarkFormContainer.toggle(false);
    }
  };

  //_____________________________________________
  // View layer logic
  //_____________________________________________

  const render = function() {
    handleBookmarkFormDisplay();
  };

  //_____________________________________________
  // EVENT LISTENERS
  //_____________________________________________

  const handleAddBookmarkToggle = function() {
    page.addBookmarkToggler.on('click', (e) => {
      store.toggleAddBookmarkForm();
      render();
    });
  };

  const bindEventListeners = function() {
    handleAddBookmarkToggle();
  };
  return {
    bindEventListeners,
    render
  };
}());