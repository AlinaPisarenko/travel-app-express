import axios from 'axios';
import { showAlert } from './alerts'

 export const login = async (email, password) => {
  try {
    const res = await axios.post(
        '/api/v1/users/login', 
        { email, password }, 
        { witCredentials: true }
        )
    // const res = await axios({
    //   method: 'POST',
    //   witCredentials: true,
    //   url: 'http://127.0.0.1:8000/api/v1/users/login',
    //   data: {
    //     email,
    //     password
    //   }
    // });
   console.log('response', res)
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};



