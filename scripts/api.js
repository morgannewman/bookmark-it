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

  return {
    fetchItems,

    MOCK_DATA
  };
}());