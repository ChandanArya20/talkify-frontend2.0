
export function getAuthToken() {
    
    const authToken = localStorage.getItem("authToken")
    if(authToken){
        return authToken
    }else{
        return null
    }
}
