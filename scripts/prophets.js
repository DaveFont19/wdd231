const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
function displayProphets(prophets){
    const cards = document.getElementById('cards');
    prophets.forEach(d => {
        const figure = document.createElement("figure");
        const h1 = document.createElement("h1");
        const figCaption = document.createElement("figcaption");
        const img = document.createElement("img");

        h1.textContent = `${d.name} ${d.lastname}`
        figure.appendChild(h1);
        figCaption.textContent=`Date of Birth: ${d.birthdate} \nPlace of Birth: ${d.birthplace}`;
        figure.appendChild(figCaption)
        img.src = `${d.imageurl}`;
        img.alt = `${d.name} ${d.lastname}`;
        img.style.width = `200px`
        figure.appendChild(img);
        cards.appendChild(figure);
    });
    
}
async function getProphetData(url) {
    try{
        let response = await fetch(url);
        let data =  await response.json();
        displayProphets(data.prophets);
    }
    catch (error){
        console.log(error);
    }
}

getProphetData(url);