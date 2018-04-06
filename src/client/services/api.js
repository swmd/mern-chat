const getRequest = (url, params) => {
  let query = ''
  for (let key in params) {
    query += key + '=' + params[key] + '&'
  }
  if (query !== '') {
    query = query.slice(0, -1)
    query = '?' + query
  }

  return new Promise((resolve, reject) => {
    fetch(url + query, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const postRequest = (url, body) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  get: getRequest,
  post: postRequest,
}
