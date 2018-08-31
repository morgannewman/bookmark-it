const list = (function() {
  const page = {
    addBookmarkToggler: $('.js-add-bookmark-toggler'),
    addBookmarkFormContainer: $('.add-bookmark-container'),
    addBookmarkForm: $('.add-bookmark-form'),
    bookmarkListContainer: $('.js-bookmark-list'),
    menuFilterContainer: $('.js-dropdown')    
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
        <div class="list-item-expander"><svg aria-hidden="true" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg></div>
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
        <div class="list-item-condenser"><svg aria-hidden="true" data-prefix="fas" data-icon="angle-up" class="svg-inline--fa fa-angle-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg></div>
        <h3 class="list-item-title list-item-title-expanded">${bookmark.title}</h3>
        <div class="list-item-container list-item-container-expanded">
          <p class="list-item-description">${bookmark.desc}</p>
          <div class="list-item-expanded-bottom-items">
            <a href="${bookmark.url}" target="_blank" class="button-primary button-primary-link">Visit Site</a>
            <div class="list-item-stars list-item-stars-expanded">
              ${generateStars(bookmark.rating)}
          </div>
          <div data-id="${bookmark.id}" class="js-delete-item list-item-delete"><svg aria-hidden="true" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"></path></svg></div>
        </div>
      </div>
    </div>
`;
  };

  const generateBookmarkCards = function() {
    return store.state.items.reduce((bookmarks, item) => {
      // If the item is at the current filter level or higher...
      if (store.currentFilterLevel() === 0 || item.rating === store.currentFilterLevel()) {
        // Render the correct expanded/condensed state
        if (item.expanded) bookmarks.push( generateExpandedCardHTML(item));
        else bookmarks.push(generateCondensedCardHTML(item));
      }
      return bookmarks;
    }, []).join('');
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

  const renderFilterMenuDisplay = function() {
    if (store.shouldDisplayFilterMenu()) {
      $('.js-dropdown-items').toggle(true);
      $('.js-button-filter').addClass('button-filter-active');
    }
    else {
      $('.js-dropdown-items').toggle(false);
      $('.js-button-filter').removeClass('button-filter-active');
    }
  };
  
  const renderBookmarkCards = function() {
    page.bookmarkListContainer.html(generateBookmarkCards());
  };

  const render = function() {
    console.log('rendering!~');
    renderBookmarkFormDisplay();
    renderFilterMenuDisplay();
    renderBookmarkCards();
  };

  //_____________________________________________
  // EVENT LISTENERS
  //_____________________________________________

  // ADDING ITEMS

  // const inputForm = {
  //   title: $('.js-add-bookmark-title'),
  //   url: $('.js-add-bookmark-url'),
  //   desc: $('.js-add-bookmark-desc'),
  //   stars: $('.js-add-bookmark-rating input:checked')
  // };

  const handleAddBookmarkFormToggle = function() {
    page.addBookmarkToggler.on('click', (e) => {
      // Toggle the display state in storage
      store.toggleAddBookmarkForm();
      // Render new view
      render();
    });
  };

  const grabInput = function() {
    const input = {};
    input.title = $('.js-add-bookmark-title').val();
    input.url = $('.js-add-bookmark-url').val();
    input.desc = $('.js-add-bookmark-desc').val();
    input.rating = $('.js-add-bookmark-rating input:checked').val();
    return input;
  };

  const resetForm = function() {
    $('.js-add-bookmark-title').val('');
    $('.js-add-bookmark-url').val('');
    $('.js-add-bookmark-desc').val('');
    $('.js-add-bookmark-rating input:checked').prop('checked', false);
    };
  
  const handleAddBookmarkFormCancel = function() {
    page.addBookmarkFormContainer.on('click','.js-add-cancel', (e) => {
      // clear form
      resetForm();
      store.toggleAddBookmarkForm();
      renderBookmarkFormDisplay();
    });
  };

  const handleAddBookmarkSubmit = function() {
    page.addBookmarkForm.on('submit', (e) => {
      e.preventDefault();
      const userInput = grabInput();
      // clear form
      resetForm();
      store.toggleAddBookmarkForm();
      renderBookmarkFormDisplay();
      // send new item to API
      api.addItem(userInput, (response) => {
        // add item to store
        store.addItem(response);
        // render new view
        render();
      });
      
    });
  };

  // FILTERING ITEMS
  const handleFilterButtonToggle = function() {
    page.menuFilterContainer.on('click', '.js-button-filter', (e) => {
      // Toggle the display state in storage
      store.toggleRatingsFilterMenu();
      // Render new view
      render();
    });
  };

  const handleFilterLevelClick = function() {
    page.menuFilterContainer.on('click', '.dropdown-item', (e) => {
      // Grab the filter level selected
      const filterLevel = $(e.currentTarget).data('filter');
      // Set the new filter level state
      store.setFilterLevel(filterLevel);
      // Close the filter menu
      store.toggleRatingsFilterMenu();
      // Render new view
      render();
    });
  };
 
  // DELETING ITEMS

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

  // COLLAPSE/EXPAND BOOKMARK CARDS

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

  /////////////////////////////////////////////////

  const bindEventListeners = function() {
    handleAddBookmarkFormToggle();
    handleDeleteBookmark();
    handleExpandBookmark();
    handleCollapseBookmark();
    handleAddBookmarkSubmit();
    handleAddBookmarkFormCancel();
    handleFilterButtonToggle();
    handleFilterLevelClick();
  };
  return {
    bindEventListeners,
    render
  };
}());