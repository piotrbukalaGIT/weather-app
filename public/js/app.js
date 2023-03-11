

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMsg = document.querySelector('#location')
const forecastMsg = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                locationMsg.textContent = data.location
                forecastMsg.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
})