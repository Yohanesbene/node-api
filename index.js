// input library
const system = require("os")
const http = require("http")
const person = require("./person.json")
const rupiah = require("rupiah-format")

const device = {
  memory: system.freemem(),
}

// call person object
const { name, age, gender, hobby, favourite_food, balance } = person

function golongan(age) {
  if (age >= 6 && age <= 10) {
    return "children"
  } else if (age >= 11 && age <= 17) {
    return "Remaja"
  } else if (age >= 18 && age <= 30) {
    return "Adult"
  } else if (age >= 31 && age <= 100) {
    return "Orang tua"
  } else if (age > 100) {
    return "Buyut"
  } else {
    return "Balita"
  }
}

// const name = person.name
// const hobby = person.hobby
// const gender = person.gender
// const favourite_food = person.favourite_food
// const age = person.age

// file.writeFile("data.json", person.toString(), (error, result) => {
//   if (error) {
//     return error
//   }

//   console.log("file executed", result)
// })

// console.log(hobby)

// function listener request response
function listener(request, response) {
  // print requested url
  console.log(request.url)

  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" })
    response.write(
      "<html><body><h1><marquee>WELCOME TO OUR BASIC API</marquee></h1></body></html>"
    )
  } else if (request.url == "/name") {
    response.write(`nama saya ${name}`)
  } else if (request.url == "/age") {
    // Dynamic Binding
    response.write(`usia ${age} - ${golongan(age)}`)
  } else if (request.url == "/gender") {
    response.write(`gender ${gender}`)
  } else if (request.url == "/hobby") {
    response.write(`hobby ${hobby}`)
  } else if (request.url == "/food") {
    response.write(`favourite food ${favourite_food}`)
  } else if (request.url == "/balance") {
    response.write(`my balance is ${rupiah.convert(balance)}`)
  } else if (request.url == "/api") {
    response.writeHead(200, { "Content-Type": "application/json" })
    const data = JSON.stringify(person)
    response.write(data)
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" })
    // no url match
    response.end("404 not found")
  }

  // avoid looping on server
  return response.end()
}

// listen port
http.createServer(listener).listen(3000)

console.log("server running at localhost 3000")
