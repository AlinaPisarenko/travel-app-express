import '@babel/polyfill'
import { displayMap } from './mapbox'
import { login, signup, logout } from './login'
import { updateInfo } from './updateSettings'
import { showAlert } from './alerts'
import { bookTour } from './stripe'


// DOM ELEMENTS
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form--login')
const signupForm = document.querySelector('.form--signup')
const logoutBtn = document.querySelector('.nav__el--logout')
const userDataForm = document.querySelector('.form-user-data')
const userPasswordForm = document.querySelector('.form-user-password')
const bookBtn = document.getElementById('book-tour')

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

    if (password !== confirmPasswordField) {
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
    const form = new FormData()
    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    form.append('photo', document.getElementById('photo').files[0])
console.log(form)
    updateInfo(form, 'data')
})
}
if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', async e  => {
    e.preventDefault()

    document.querySelector('.btn--save-password').textContent = 'Updating...'
    const passwordCurrent = document.getElementById('password-current').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value
    await updateInfo({passwordCurrent, password, passwordConfirm}, 'password')

    document.querySelector('.btn--save-password').textContent = 'Save password'
    document.getElementById('password-confirm').value = ''
    document.getElementById('password').value = ''
    document.getElementById('password-current').value = ''

}) 
}

if (bookBtn) {
    bookBtn.addEventListener('click', e => {
        e.target.textContent = 'Processing...'
        const { tourId } = e.target.dataset
        bookTour(tourId)
    })
}