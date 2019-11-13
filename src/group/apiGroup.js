export const create = (userId, token, group) => {
    return fetch(`${process.env.REACT_APP_API_URL}/group/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: group
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleGroup = (groupId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/group/${groupId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (groupId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/group/${groupId}`, {
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

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/groups`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (groupId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/group/${groupId}`, {
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

export const update = (groupId, token, group) => {
    return fetch(`${process.env.REACT_APP_API_URL}/group/${groupId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: group
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const joinGroup = (userId, token, groupId) => {
    console.log(groupId)
    return fetch(`${process.env.REACT_APP_API_URL}/user/joingroup`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, groupId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const leaveGroup = (userId, token, groupId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/leavegroup`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, groupId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};