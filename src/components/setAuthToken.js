import axios from 'axios';
 
const setAuthToken = (token) => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = 'Bearer ${token}'
       return true
   }
   else{
        console.log("Invalid token")
        return false
   }
}
export default setAuthToken;