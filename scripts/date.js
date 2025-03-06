const year = document.querySelector("#year");
let oLastModif = new Date(document.lastModified);
year.innerHTML = `<span class="highlight">${oLastModif.getDate()}/${oLastModif.getMonth() + 1}/${oLastModif.getFullYear()} ${oLastModif.getHours()}:${oLastModif.getMinutes()}:${oLastModif.getSeconds()}</span>`;