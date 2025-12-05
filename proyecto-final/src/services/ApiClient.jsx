
const apiClient = {
  get: url => fetch(url).then(r => r.json()),
  post: (url, data) => fetch(url, { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }).then(r => r.json()),
  put: (url, data) => fetch(url, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }).then(r => r.json()),
  delete: url => fetch(url, { method: 'DELETE' })
};

export default apiClient;