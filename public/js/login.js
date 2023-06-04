
const login = async (email,password) => {
    console.log(email, password)
    try {
        const res = await fetch('http://127.0.0.1:8000/api/v1/users/login', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify({ email, password })
    })
        const data = await res.json()
        console.log(data)
    } catch(err) {
        console.log(err)
    }
    
  
}

document.querySelector('.form').addEventListener('submit', e  => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email,password)
})