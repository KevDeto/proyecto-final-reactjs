
const apiClient = {
  get: (url) => fetch(url).then(res => res.json()),
  post: (url, data) => fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  put: (url, data) => fetch(url, {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  delete: (url) => fetch(url, { method: 'DELETE' }).then(res => res.json())
};

export default apiClient;