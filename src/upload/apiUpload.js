export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const create = (userId, token, upload) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: upload
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/uploads`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleUpload = (uploadId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/${uploadId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uploadByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/uploads/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (uploadId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/${uploadId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (uploadId, token, upload) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/${uploadId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: upload
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};