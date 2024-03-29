
export function getAuthToken() {
    
    const authToken = localStorage.getItem("authToken")
    if(authToken){
        return authToken
    }else{
        return null
    }
}

// Function to get a specific cookie by name
export function getCookie(name) {
    // Split the cookies string into an array of individual cookies
    const cookies = document.cookie.split(";")

    // Loop through the cookies array to find the one with the specified name
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Check if the cookie starts with the specified name
        if (cookie.startsWith(name + "=")) {
            // Return the value of the cookie
            return cookie
        }
    }
    // If the cookie with the specified name is not found, return null
    return null
}

// Function to get a specific cookie value by name
export function getCookieValue(name) {
    // Split the cookies string into an array of individual cookies
    const cookies = document.cookie.split(";")

    // Loop through the cookies array to find the one with the specified name
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Check if the cookie starts with the specified name
        if (cookie.startsWith(name + "=")) {
            // Return the value of the cookie
            return cookie.substring(name.length + 1)
        }
    }
    // If the cookie with the specified name is not found, return null
    return null
}
