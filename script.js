const mainDiv = document.querySelector(".main");
const modal = document.querySelector(".modal");
var sectionTitle = null;

if(sessionStorage.data !== undefined) data = JSON.parse(sessionStorage.data);
//sessionStorage.clear();

for(let sectionData in data) {
    let section = document.createElement("section");
    let legend = document.createElement("legend");
    let div = document.createElement("div");

    section.id = sectionData.toLowerCase().replace(" ","-");
    legend.innerHTML = sectionData;
    div.className = "lines";

    mainDiv.appendChild(section);   // Add Section
    section.appendChild(legend);    // Add Legend
    section.appendChild(div);    // Add Div

    for (let line in data[sectionData]) {
        let elmt = document.createElement( data[sectionData][line]===null? "p": "a" );
        elmt.href = data[sectionData][line];
        elmt.target = "_blank";

        elmt.innerText = line;
        div.appendChild(elmt);
    }

    let addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.onclick = ()=> {
        modal.style.display = "";
        sectionTitle = sectionData;
    };
    div.appendChild(addButton);
};


document.querySelectorAll("section").forEach( (sect) => {

    sect.originalHeight = sect.scrollHeight - 36; // 36px = 2rem

    sect.onmouseenter =  sect.ontouchstart = ()=> {
        sect.classList.toggle('hovered');
        sect.style.height = sect.originalHeight +"px";
    };
    sect.ontransitionend = ()=> {
        if( sect.classList.contains('hovered') || sect.classList.contains('clicked') )
            sect.style.height = sect.originalHeight +"px";
    }
    sect.onmouseleave =  sect.ontouchend = ()=> {
        sect.classList.toggle('hovered');
        if( !sect.classList.contains('clicked'))
            sect.style.height = '';
        else sect.style.height = sect.originalHeight + "px";
    };
    sect.onclick = (e)=> {
        openFull(sect, e);
    };
})


function submitCancel() {
    modal.style.display = "none";   // Close modal
    sessionStorage.setItem("data", JSON.stringify(data));   // Save data to Session storage
}
function submitLine() {
    let text = document.querySelector("#line-text").value;
    let link = document.querySelector("#line-link").value;
    document.querySelector("#line-text").value = document.querySelector("#line-link").value = "";
    data[sectionTitle][text] = link? link: null;
    submitCancel();
}

function openFull(sectionElmt, e=null) {
    if(e && (e.target.tagName==="BUTTON" || e.target.tagName==="A")) return;
    sectionElmt.classList.toggle('clicked');
    let height = sectionElmt.originalHeight+'px';
    sectionElmt.style.setProperty("height", (sectionElmt.style.getPropertyValue("height")!==height)? height:'')
}

function openAll() {
    document.querySelectorAll("section").forEach(sect => {
        sect.classList.remove("clicked");
        openFull(sect);
    });
}

function closeAll() {
    document.querySelectorAll("section").forEach(sect => {
        sect.classList.remove("clicked");
        sect.style.height = "";
    });
}

// DOWNLOAD A FILE
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const saveData = ()=> download("var data = "+JSON.stringify(data), 'data.js', 'text/plain');


