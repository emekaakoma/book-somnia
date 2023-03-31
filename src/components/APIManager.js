//used in BookList.js, BookSession.js
export const getAllBooks = () => {
    return fetch("http://localhost:8088/books")
        .then(response => response.json())
}

export const getAllCustomers = () => {
    return fetch("http://localhost:8088/customers")
        .then(respose => respose.json())
}

//used in CustomerProfile.js
export const getCurrentCustomer = (bookUserObject) => {
    return fetch(`http://localhost:8088/users?isStaff=false&_embed=customers&id=${bookUserObject.id}`)
        .then(response => response.json())
}

//used in CustomerProfile.js
export const getAllSymptoms = () => {
    return fetch("http://localhost:8088/symptoms")
        .then(res => res.json())
}

//used in CustomerProfile.js
export const updateCustomerProfile = (customerToSendToAPI) => {
    return fetch(`http://localhost:8088/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customerToSendToAPI)
    })
        .then(response => response.json())
}

//used in BookSessions.js, EmployeeList.js
export const getAllEmployeesFromUsers = () => {
    return fetch('http://localhost:8088/employees?_expand=user')
        .then(res => res.json())
}

//used in BookSessions.js, SessionsList.js
export const getAllSessions = () => {
    return fetch('http://localhost:8088/sessions')
        .then(res => res.json())
}

//Used in BookSessions.js
export const submitSessionRequest = (sessionsToSendToAPI) => {
    return fetch(`http://localhost:8088/sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionsToSendToAPI)
    })
        .then(response => response.json())
}

//Used in BookSessions.js
export const updateEmployeeSessions = (employeeSessToSendToAPI) => {
    return fetch(`http://localhost:8088/employeeSessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeSessToSendToAPI)
    })
        .then(response => response.json())
}

//Used in SessionsList.js
export const deleteSession = (sessionsId) => {
    return fetch(`http://localhost:8088/sessions/${sessionsId}`, {
        method: "DELETE"
    })
}

//SessionsList.js
export const getAllEmployees = () => {
    return fetch('http://localhost:8088/employees')
    .then(res => res.json())
}

//SessionsList.js
export const getSessionsAndBooks = () => {
    return fetch('http://localhost:8088/sessions?_expand=book&_expand=employee')
    .then (res => res.json())
}

//EmployeeDetails.js
export const getEmployeeDetails = (employeeId) => {
    return fetch(`http://localhost:8088/employees?_expand=user&id=${employeeId}`)
    .then(res => res.json())
}

//BookForm.js
export const addBooks = (booksToSendToAPI) => {
    return fetch(`http://localhost:8088/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booksToSendToAPI)
    })
        .then(response => response.json())
}

//BookForm.js
export const deleteBook = (bookId) => {
    return fetch(`http://localhost:8088/books/${bookId}`, {
        method: "DELETE"
    })
}

//EditSesison.js
export const getExactSession = (sessionId) => {
    return fetch(`http://localhost:8088/sessions?id=${sessionId}`)
    .then(res => res.json())
}

//EditSession.js
export const updateSession = (session) => {
    return fetch(`http://localhost:8088/sessions/${session.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(session)
        })
            .then(response => response.json())
}

//Profile.js
export const getAllUserCustomers = () => {
    return fetch('http://localhost:8088/users?isStaff=false&_embed=customers')
    .then(res => res.json())
}

//CustomerList.js
export const getAllCustomersFromUsers = () => {
    return fetch ('http://localhost:8088/customers?_expand=user')
    .then(res => res.json())
}

//SessionList.js
export const updateSessionList = (sessions, copy) => {
    return fetch(`http://localhost:8088/sessions/${sessions.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
}

//CustomerDetails.js
export const getCustomerDetails = (customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
    .then(res => res.json())
}