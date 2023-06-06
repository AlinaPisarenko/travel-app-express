// import axios from 'axios';
const login = async (email, password) => {
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
    // if (res.data.status === 'success') {
    //   showAlert('success', 'Logged in successfully!');
    //   window.setTimeout(() => {
    //     location.assign('/');
    //   }, 1500);
    // }
  } catch (err) {
    console.log(err.response.data.message)
    // showAlert('error', err.response.data.message);
  }
};



document.querySelector('.form').addEventListener('submit', e  => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email,password)
})