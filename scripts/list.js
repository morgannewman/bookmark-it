const list = (function() {
  const page = {
    addBookmarkToggler: $('.js-add-bookmark-toggler'),
    addBookmarkFormContainer: $('.add-bookmark-container'),
    addBookmarkForm: $('.add-bookmark-form'),
    bookmarkListContainer: $('.js-bookmark-list')    
  };

  //_____________________________________________
  // CONSTRUCT VIEW LAYER
  //_____________________________________________


  const generateStars = function(rating) {
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
            ${generateStars(bookmark.rating)}
          </div>
        </div>
      </div>
    </div>
    `;
  };

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
              ${generateStars(bookmark.rating)}
          </div>
          <span data-id="${bookmark.id}" class="js-delete-item list-item-delete fas fa-trash-alt fa-lg"></span>
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
  };

  //_____________________________________________
  // RENDER VIEW LAYER
  //_____________________________________________

  const renderBookmarkFormDisplay = function() {
    if (store.shouldDisplayAddForm()) {
      page.addBookmarkFormContainer.toggle(true);
    }
    else {
      page.addBookmarkFormContainer.toggle(false);
    }
  };
  
  const renderBookmarkCards = function() {
    // console.log(store.state.items)
    page.bookmarkListContainer.html(generateBookmarkCards());
  };

  const render = function() {
    console.log('rendering!~');
    renderBookmarkFormDisplay();
    renderBookmarkCards();
  };

  //_____________________________________________
  // EVENT LISTENERS
  //_____________________________________________

  const handleAddBookmarkFormToggle = function() {
    page.addBookmarkToggler.on('click', (e) => {
      // Toggle the display state in storage
      store.toggleAddBookmarkForm();
      // Render new view
      render();
    });
  };
  // Buttons
    // js-add-cancel
    // js-add-submit
 
  const grabInput = function(inputForm) {
    const result = {};
    result.title = inputForm.title.val();
    result.url = inputForm.url.val();
    result.desc = inputForm.desc.val();
    result.rating = inputForm.rating.val();
    return result;
  };

  const handleAddBookmarkSubmit = function() {
    page.addBookmarkForm.on('submit', (e) => {
      e.preventDefault();
      const inputForm = {
        title: $('.js-add-bookmark-title'),
        url: $('.js-add-bookmark-url'),
        desc: $('.js-add-bookmark-desc'),
        rating: $('.js-add-bookmark-rating input:checked')
      };
      const userInput = grabInput(inputForm);
    });
  };

  const handleDeleteBookmark = function() {
    $(page.bookmarkListContainer).on('click', '.js-delete-item', (e) => {
      // Grab the ID of the bookmark
      const id = $(e.currentTarget).data('id');
      // delete the item from our API
      api.deleteItem(id, (r) => {
        
      });
      // delete the item from our store
      store.findAndDelete(id);
      // render new view
      render();
    });
  };

  const handleExpandBookmark = function() {
    page.bookmarkListContainer.on('click', '.list-container-condensed', (e) => {
      // Grab the ID of the clicked bookmark
      const container = $(e.currentTarget);
      const storeItem = store.findById(container.data('id'));
      // Toggle the expanded state of the item in storage
      store.toggleItemIsExpanded(storeItem);
      // Render new view
      render();
    });
  };

  const handleCollapseBookmark = function() {
    page.bookmarkListContainer.on('click', ' .list-item-title-expanded', (e) => {
      // Grab the ID of the clicked bookmark
      const container = $(e.currentTarget).parents('.list-container-expanded');
      const storeItem = store.findById(container.data('id'));
      // Toggle the expanded state of the item in storage
      store.toggleItemIsExpanded(storeItem);
      // Render new view
      render();
    });
  };

  const bindEventListeners = function() {
    handleAddBookmarkFormToggle();
    handleDeleteBookmark();
    handleExpandBookmark();
    handleCollapseBookmark();
    handleAddBookmarkSubmit();
  };
  return {
    bindEventListeners,
    render
  };
}());