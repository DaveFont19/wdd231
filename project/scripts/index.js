const key = "sk-kiWY67e2cde1a859a9403";
async function getData() {
    try {
       const response = await fetch(`https://perenual.com/api/v2/species-list?key=${key}`);
       if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
       }
       const result = await response.json();
       return result;
    } catch(error){
        console.log(error);
    }
}
const respond = getData();
const trees = [];


respond.then((respond)=> {
    respond.data.forEach(element => {
        trees.push(element);
    });
    const main = document.getElementById('main');
    const hero = document.getElementById("hero");
    const random = Math.floor(Math.random() * trees.length);
    const imgHero = document.createElement('img');
    const button = document.createElement('a');
    imgHero.src = `${trees[random].default_image.original_url}`;
    imgHero.classList = 'hero';
    imgHero.setAttribute('loading', 'lazy');
    imgHero.setAttribute('alt',`${trees[random].common_name}`)
    const h1 = document.createElement('h1');
    h1.className = 'title'
    h1.innerHTML = `Leaf Life <br> Find your Tree`;
    button.textContent = 'Register Now!';
    button.classList = 'register-now';
    button.setAttribute('href', './register.html')
    hero.appendChild(imgHero);
    hero.appendChild(h1);
    hero.appendChild(button);
    trees.splice(random, 1);
  

    for (let index = 0; index < 3; index++) {
        const random = Math.floor(Math.random() * trees.length);
        const card = document.createElement('card');
        const img = document.createElement('img');
        const div = document.createElement('div');
        const p = document.createElement('p');
        const tree = trees[random]

        img.src = `${tree.default_image.small_url}`;
        img.classList = 'imgCard';
        img.setAttribute('loading', 'lazy');
        img.setAttribute('alt',`${trees.common_name}`)
        div.classList = 'div-container';
        p.innerHTML = `<strong>Common Name: </strong>${tree.common_name}<br>
        <strong>Family: </strong>${tree.family ? tree.family : 'Unknow'}<br>
        <strong>Scientific Name: </strong> ${tree.scientific_name}`
        trees.splice(random, 1);
        div.appendChild(p)
        card.appendChild(img);
        card.appendChild(div);
        main.appendChild(card);
    }})

