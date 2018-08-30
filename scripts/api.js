const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/morgan/bookmarks';

  const fetchItems = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  return {
    fetchItems
  };
}());