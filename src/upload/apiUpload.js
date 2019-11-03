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
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download')
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)
        })
        .catch(err => console.log(err));
};

export const singleUpload = (uploadId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/${uploadId}`, {
        method: "GET",
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

export const draftUploadByUser = (userId, token) => {
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

export const like = (userId, token, uploadId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, uploadId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unlike = (userId, token, uploadId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, uploadId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const comment = (userId, token, uploadId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, uploadId, comment})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uncomment = (userId, token, uploadId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/upload/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, uploadId, comment})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};