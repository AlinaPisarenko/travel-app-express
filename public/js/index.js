import '@babel/polyfill'
import { displayMap } from './mapbox'
import { login, signup, logout } from './login'
import { updateInfo } from './updateSettings'
import { showAlert } from './alerts'


// DOM ELEMENTS
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form--login')
const signupForm = document.querySelector('.form--signup')
const logoutBtn = document.querySelector('.nav__el--logout')
const userDataForm = document.querySelector('.form-user-data')
// VALUES


// DELEGATION
if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations)
    displayMap(locations)
}

if (loginForm) {
    loginForm.addEventListener('submit', e  => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email,password)
})
}

if (signupForm) {
    signupForm.addEventListener('submit', e  => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPasswordField = document.getElementById('confirm_password').value
    const name = document.getElementById('user_name').value

    if (password !== confirmPasswordField.value) {
        showAlert('error', "Passwords don't match 😔 Please try again")
    } else {
        signup(name, email,password, confirmPasswordField)
    }
    
})
}

if (logoutBtn) logoutBtn.addEventListener('click', logout)

if (userDataForm) {
    userDataForm.addEventListener('submit', e  => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const name = document.getElementById('name').value
    updateInfo(name, email)
})
}