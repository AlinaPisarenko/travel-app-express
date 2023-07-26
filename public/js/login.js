import axios from 'axios';
import { showAlert } from './alerts'

 export const login = async (email, password) => {
  try {
    const res = await axios.post(
        '/api/v1/users/login', 
        { email, password }, 
        )
  
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

// Logging out
export const logout = async () => {
  try {
    const res = await axios.get('/api/v1/users/logout')
    if (res.data.status === 'success') {
      location.reload(true)
      location.assign('/')
    }
  } catch(err) {
    showAlert('error', 'Error logging out! Try again.')
  }
}


//signnup
 export const signup = async (name, email, password, passwordConfirm) => {

     const newUser = {
        name,
        email,
        password,
        passwordConfirm,
        role: 'user'
    }
  
  try {
    const res = await axios.post(
        '/api/v1/users/signup', 
        newUser, 
        )
  
   console.log('response', res)
    if (res.data.status === 'success') {
      showAlert('success', 'Signed up in successfully! Check your email ✉️');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
