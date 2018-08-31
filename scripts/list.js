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

    // {
  //   "id": "8sdfbvbs65sd",
  //   "title": "Google",
  //   "url": "http://google.com",
  //   "desc": "An indie search engine startup",
  //   "rating": 4
  // }

  const generateExpandedCardHTML = function(bookmark) {
    // TODO: Change button over to link. Must fix styling.
    return `
      <div data-id="${bookmark.id}" class="list-container list-container-expanded">
        <div class="fas fa-angle-up fa-lg list-item-condenser"></div>
        <h3 class="list-item-title list-item-title-expanded">${bookmark.title}</h3>
        <div class="list-item-container list-item-container-expanded">
          <p class="list-item-description">${bookmark.desc}</p>
          <div class="list-item-expanded-bottom-items">
            <button href="${bookmark.url}" target="_blank" class="button-primary">Visit Site</button>
            <div class="list-item-stars list-item-stars-expanded">
              ${renderStars(bookmark.rating)}
          </div>
          <i class="list-item-delete fas fa-trash-alt fa-lg"></i>
        </div>
      </div>
    </div>
`;
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
    console.log('rendering!~');
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

  const handleExpandBookmark = function() {
    page.bookmarkListContainer.on('click', '.list-container-condensed', (e) => {
      const container = $(e.currentTarget);
      const storeItem = store.findById(container.data('id'));
      store.toggleItemIsExpanded(storeItem);
      render();
    });
  };

  const handleCollapseBookmark = function() {
    page.bookmarkListContainer.on('click', ' .list-item-title-expanded', (e) => {
      const container = $(e.currentTarget).parents('.list-container-expanded');
      const storeItem = store.findById(container.data('id'));
      store.toggleItemIsExpanded(storeItem);
      render();
    });
  };

  const bindEventListeners = function() {
    handleAddBookmarkToggle();
    handleExpandBookmark();
    handleCollapseBookmark();
  };
  return {
    bindEventListeners,
    render
  };
}());