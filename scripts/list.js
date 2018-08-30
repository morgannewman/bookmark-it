const list = (function() {
  const page = {
    addBookmarkToggler: $('.js-add-bookmark-toggler'),
    addBookmarkFormContainer: $('.add-bookmark-container'),
    addBookmarkForm: $('.add-bookmark-form'),
    bookmarkListContainer: $('.js-bookmark-list')    
  };

  const handleBookmarkFormDisplay = function() {
    if (store.shouldDisplayAddForm()) {
      page.addBookmarkFormContainer.toggle(true);
    }
    else {
      page.addBookmarkFormContainer.toggle(false);
    }
  };
  // {
  //   "id": "8sdfbvbs65sd",
  //   "title": "Google",
  //   "url": "http://google.com",
  //   "desc": "An indie search engine startup",
  //   "rating": 4
  // }

  const renderStars = function(rating) {
    let result = '';
    // Generate `rating` colored stars
    for (let i = 0; i < rating; i++) {
      result += '<span class="star star-active">★</span>';
    }
    // Generate `5 - rating` gray stars
    for (let i = 0; i < (5 - rating); i++) {
      result += '<span class="star star-inactive">★</span>';
    }
    return result;
  };

  const generateCondensedCardHTML = function(bookmark) {
    return `
    <div data-id="${bookmark.id}" class="list-container list-container-condensed">
      <div class="list-item">
        <div class="fas fa-angle-down fa-lg list-item-expander"></div>
        <h3 class="list-item-title">${bookmark.title}</h3>
        <div class="list-item-container">
          <div class="list-item-stars">
            ${renderStars(bookmark.rating)}
          </div>
        </div>
      </div>
    </div>
    `;
  };

  const generateExpandedCardHTML = function(bookmark) {

  };

  const generateBookmarkCards = function() {
    return store.state.items.map((bookmark) => {
      if (bookmark.expanded) return generateExpandedCardHTML(bookmark);
      else return generateCondensedCardHTML(bookmark);
    }).join('');
  }

  const renderBookmarkCards = function() {
    // console.log(store.state.items)
    page.bookmarkListContainer.html(generateBookmarkCards());
  };

  //_____________________________________________
  // Render view layer
  //_____________________________________________

  const render = function() {
    handleBookmarkFormDisplay();
    renderBookmarkCards();
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

  const handleExpandBookmarkToggle = function() {
    page.bookmarkListContainer.on('click', '.list-container-condensed', (e) => {
      const domItem = $(e.currentTarget);
      const localItem = store.findById(domItem.data('id'));
      store.toggleItemIsExpanded(localItem);
      render();
    });
  };

  const bindEventListeners = function() {
    handleAddBookmarkToggle();
    handleExpandBookmarkToggle();
  };
  return {
    bindEventListeners,
    render
  };
}());