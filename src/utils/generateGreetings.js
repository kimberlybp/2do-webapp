export default function generateGreetings(name) {
  var greetdate = new Date()
  var hours = greetdate.getHours()

  if (hours >= 5 && hours <= 11)
    return `Good Morning ${name}!`
  else if (hours >= 12 && hours <= 17)
    return `Good Afternoon ${name}!`
  else if (hours >= 18 && hours <= 20)
    return `Good Evening ${name}!`
  else if (hours >= 21 && hours <= 11)
    return `Good Night ${name}!`
  else
    return `Wow! You're still awake. Working Late ${name}? 🦉`
} 