const header = {  
    'Access-Control-Allow-Origin': `http://localhost:3000`,
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
}

const headerAuth = {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
    'Access-Control-Allow-Origin': `http://localhost:3000`,
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
}

export {header, headerAuth};