const mainDiv = document.querySelector(".main");

data.forEach((data) => {
    let section = document.createElement("section");
    let legend = document.createElement("legend");

    section.id = data.title.toLowerCase().replace(" ","-");
    legend.innerHTML = data.title;

    mainDiv.appendChild(section);
    section.appendChild(legend);

    for (let line in data.lines) {
        let elmt = document.createElement( data.lines[line]===null? "p": "a" );
        // if(data.lines[line]!==null) {
        elmt.href = data.lines[line];
        elmt.target =  "_blank";
        
        elmt.innerText = line;
        section.appendChild(elmt);
    }
})

