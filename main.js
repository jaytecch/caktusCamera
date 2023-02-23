import axios "https://esm.sh/axios"

const cortex = new MathfieldElement()
const container = document.getElementById("container")

document.body.appendChild(cortex)

cortex.setOptions({
  virtualKeyboardMode: "manual",
  virtualKeyboardContainer: container
})



const APP_ID = "8UQ7QE-AA3TK4X2T7"

const baseUrl = "http://api.wolframalpha.com/v2/query"

const params = new URLSearchParams()

params.append("appid", url)

params.append("input", "Hello God!")

const url = `${baseUrl}?${params.toString()}`

async function solve(mathProblem) {
  try{
  const response = await axios.get(url)
  console.log(response.data)
  }
  catch(error){
    console.log(error)
  }
}
