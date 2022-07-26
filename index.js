const colorVal = document.getElementById("colorSeed")
const colorMode = document.getElementById("formOptions")

function handleCopyTextFromParagraph() {
  const cb = navigator.clipboard;
  const paragraph = document.querySelector('p');
  cb.writeText(paragraph.innerText).then(() => alert('Text copied'));
}



document.getElementById("form1").addEventListener("submit", function(event){
    event.preventDefault()
    document.getElementById("colors-display").innerHTML = "" 
    document.getElementById("colors-hex").innerHTML = ""
    // For resetting the colors, each time the form is submitted
    let colorValClean = colorVal.value.replace("#","")
    let colorModeVal = colorMode.value.toLowerCase()
    // I was trying to add the value replace and lowercase onto the consts above but never could get it to work?
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorValClean}&mode=${colorModeVal}`)
        .then(res => res.json())
        .then(data => {
            let newColors = data.colors
            // Would it make more sense here to have a global color array and just reset the value? Or is it appropriate to just keep this in function?
            for (let i = 0; i < newColors.length; i ++){
                let colorHtml = `<div class="item" style="background-color:${newColors[i].hex.value}"></div>`
                let colorHex = `<p onclick="handleCopyTextFromParagraph();" style="cursor:pointer;">${newColors[i].hex.value}</>`
                document.getElementById("colors-display").innerHTML += colorHtml
                document.getElementById("colors-hex").innerHTML += colorHex
            }
        })
})