export const fetchApi = (action) => {
    return fetch(action.url,action.param)
      .then(response => response.json())
      .then(data => {
        return data;
      })
};
