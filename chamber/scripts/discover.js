async function getItems() {
    try {
        let response = await fetch("./data/items.json")
        let data = await response.json();
        return data
    } catch (error) {
        console.log("Whole Error: ", error);
    }
}
const cardContainer = document.querySelector('.card-container')
const data = getItems()
const lastVisit = localStorage.getItem("lastVisit")
const now = new Date();
const dialog = document.querySelector('.modal');
data.then(items => {
    items.items.forEach(place => {
        const card = document.createElement("card");

        card.classList = 'card';
        card.innerHTML = `
        <h2>${place.name}</h2>
        <figure> <img src='images/${place.image}.webp' loading ='lazy'/><figcaption>${place.name}</figcaption></figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>`

        cardContainer.appendChild(card)
    });
});

function displayVisti() {
    if (!lastVisit) {
        dialog.innerHTML = `
        <button id="closeModal">✖</button>
        <h2>Welcome! Let us know if you have any questions</h2>`;
        dialog.showModal();
        dialog.classList = 'open'
        closeModal.addEventListener('click', () => {
            dialog.classList.remove("open");
            dialog.close();
        })
    } else {
        const lastDate = new Date(parseInt(lastVisit));
        const timeDiff = now - lastDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        if (daysDiff < 1) {
            dialog.innerHTML = `
        <button id="closeModal">✖</button>
        <h2>Back so soon! Awesome!</h2>`;
        dialog.showModal();
        dialog.classList = 'open'
        closeModal.addEventListener('click', () => {
            dialog.classList.remove("open");
            dialog.close();
        })
        } else {
            dialog.innerHTML = `
            <button id="closeModal">✖</button>
            <h2>You last visited ${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago.</h2>`;
            dialog.showModal();
            dialog.classList = 'open'
            closeModal.addEventListener('click', () => {
                dialog.classList.remove("open");
                dialog.close();
            })
        }
    }
    localStorage.setItem("lastVisit", now.getTime());
}
displayVisti()