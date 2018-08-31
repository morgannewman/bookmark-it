const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/morgan/bookmarks';

  const MOCK_DATA = [
    {
        "id": "cjlh6ahg0007g0ky8tyiawfdb",
        "title": "Google",
        "url": "http://google.com",
        "desc": "An indie search engine startup",
        "rating": 4
    },
    {
        "id": "cjlh7wgkx00830ky8ipf5zv4n",
        "title": "Another website",
        "url": "http://google.com",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, dolores. Possimus, molestias nostrum voluptatum deserunt facilis officiis aperiam eius libero.",
        "rating": 3
    },
    {
        "id": "cjlh7wxt800840ky82i75ah1p",
        "title": "Cat vidoes galore!",
        "url": "http://google.com",
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, dolores. Possimus, molestias nostrum voluptatum deserunt facilis officiis aperiam eius libero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, dolores. Possimus, molestias nostrum voluptatum deserunt facilis officiis aperiam eius libero.",
        "rating": 5
    }
];

  const fetchItems = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  const deleteItem = function(id, callback) {
    const query = {
      url: `${BASE_URL}/${id}`,
      type: 'DELETE'
    };
    $.ajax(query, callback);
  };

  const addItem = function(bookmark, callback) {
    const query = {
      url: BASE_URL,
      type: 'POST',
      data: JSON.stringify(bookmark),
      contentType: 'application/json',
      success: callback
    };
    $.ajax(query);
      // .done(success)
      // .fail(error);
  };

  return {
    fetchItems,
    addItem,
    deleteItem,

    MOCK_DATA
  };
}());