const diaRegexp = /((^|\n).+?:|#)/g
const genUrl = "https://www.demirramon.com/gen/undertale_text_box.png?message="
const output = document.getElementById('imagelist')

let generateDialogue = (diaString = "") => {
  console.log(diaString)
  document.getElementById("outputstring").value = ""
  output.innerHTML = ""

  // get starting positions of all dialogs
  let matches = [...diaString.matchAll(diaRegexp)];
  let dialogue = []
  matches.forEach((match, i) => {
    dialogue.push(diaString.substring(match.index, matches[i + 1] ? matches[i + 1].index : diaString.length).trim())
  });

  console.log(dialogue)

  let rules = {
    box: "undertale"
  }
  let ruleString = getRuleString(rules)
  let urlList = []
  // Write the dialog
  dialogue.forEach(lineFormat => {

    switch(lineFormat[0]) {
      case "#":
        const [rule, value] = lineFormat.trim().substring(1).split(/=/)
        rules[rule] = value
        ruleString = getRuleString(rules)
        break
      default:
        const [face, line] = lineFormat.split(/:/)
        const [charater, expression] = face.split(/_/)
        const message = `character=${charater} expression=${expression} ${encodeURIComponent(line.trim())}`
        const url = genUrl + ruleString + message

        console.log(url)
        urlList.push(url)
        document.getElementById("outputstring").value += url + "\n"

        const img = document.createElement("img")
        img.src = url
        output.appendChild(img)
        break
    }
    
  })

}

let getRuleString = ruleObject => {
  let output = ""
  for (const [key, value] of Object.entries(ruleObject)) { output += `${key}=${value} ` }
  return output
}