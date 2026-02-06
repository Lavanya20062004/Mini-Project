const API_URL = "http://localhost:5000/api";

// POST request helper
async function postData(url = '', data = {}) {
  const response = await fetch(API_URL + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

// GET request helper
async function getData(url = '') {
  const response = await fetch(API_URL + url);
  return response.json();
}
