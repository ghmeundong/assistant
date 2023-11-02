const API_KEY = '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';
const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');

const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput(value) {
const inputElement = document.querySelector('input')
inputElement.value = value
}

async function getMessage() {
    inputElement.readOnly = true
    submitButton.style.pointerEvents = 'none'
    console.clear();
    // console.log('function getMessage called');
    outPutElement.textContent = 'loading response from server...'
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content:inputElement.value}],
            max_tokens: 999
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = "assistant_ghmeundong: "+data.choices[0].message.content
        if(data.choices[0].message.content) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
            inputElement.readOnly = false
            submitButton.style.pointerEvents = 'all'
            clearInput();
            inputElement.focus();
        }
    } catch (error){
        console.error(error)
        alert("too many requests in short periods of time.")
        outPutElement.textContent ="loading failed... Please refresh the page"
    }
}

inputElement.addEventListener('keypress', function(event){
    if(event.keyCode === 13){
        getMessage();
    }
})

submitButton.addEventListener('click', getMessage);

window.addEventListener('keypress', function(event){
    if(event.keyCode === 13 || event.keyCode === 9){
        inputElement.focus();
    }
})

function clearInput () {
    inputElement.value = ''
}

function clearOutput () {
    outPutElement.textContent = ''
}

buttonElement.addEventListener('click',function(){
    historyElement.remove();
    clearOutput();
})
