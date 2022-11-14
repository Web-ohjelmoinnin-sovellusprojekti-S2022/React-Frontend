import axios from 'axios';
 
const setAuthToken = (token) => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = 'Bearer ${token}'
   }
   else{
        console.log("Invalid token")
   }
}
export default setAuthToken;