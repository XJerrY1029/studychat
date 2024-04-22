
const  submitbutton = document.querySelector("#submit")
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElemnet = document.querySelector('button')

function  changeInput(value){
    const inputElement = document.querySelector('input')
    inputElement.value = value
}
async function getmessage() {
    console.log("clicked")
    const  options = {
        method: "POST",
        headers:{
            'Authorization': `Bearer ${API_KEY}`, // 使用反引号
            'Content-Type': 'application/json'

        },

        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100

        })

    }
    try{
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput())
            historyElement.append(pElement)
        }

    }catch(error) {
        console.error(error)

    }



}

submitbutton.addEventListener("click", getmessage)

function  clearInput () {
    inputElement.value = ''

}
buttonElemnet.addEventListener('click', clearInput)