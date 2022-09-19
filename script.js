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
        elmt.href = data.lines[line];
        elmt.target =  "_blank";

        elmt.innerText = line;
        section.appendChild(elmt);
    }
})


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
    sect.onclick = ()=> {
        openFull(sect);
    };
})


function openFull(section) {
    section.classList.toggle('clicked');
    let height = section.originalHeight+'px';
    section.style.setProperty("height", (section.style.getPropertyValue("height")!==height)? height:'')
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

