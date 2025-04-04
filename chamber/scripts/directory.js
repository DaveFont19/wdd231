async function getData() {
    try {
        let response = await fetch("./data/members.json");
        let data = await response.json();
        return data
    } catch (error) {
        console.error("Whole Error:", error);
    }
}
function displayCards() {
    members.then((members) => {
        members.forEach(member => {
            const card = document.createElement('card');
            const h3 = document.createElement('h3');
            const span = document.createElement('span');
            const img = document.createElement('img');
            const p = document.createElement('p');
            const div = document.createElement('div');

            card.className = "card"
            h3.textContent = `${member.name}`;
            h3.className = "member-name";
            div.className = "head-card";
            span.textContent = `${member.description}`;
            img.src = `images/${member.image}`
            img.loading = "lazy";
            img.className = "member-img"
            img.alt =`${member.name}`;
            p.innerHTML = `<strong>Email: </strong>${member.email}<br>
            <strong>Phone: </strong>${member.phone}<br>
            <strong>URL: </strong>${member.website}<br>
            <strong>Membership Level: </strong><span class="membership">${member.membership}</span>`;

            div.appendChild(h3);
            div.appendChild(span);
            card.appendChild(div)
            card.appendChild(img);
            card.appendChild(p);
            cardsContainer.appendChild(card)
        }
        )
    })
}
function displayList() {
    members.then((members) => {
        const ul = document.createElement('ul');
        ul.className = "list"
        members.forEach(member => {
            const li = document.createElement('li');
            const h3 = document.createElement('h3');
            const span = document.createElement('span');
            const p = document.createElement('p');
            const a = document.createElement('a');

            h3.textContent = `${member.name}`;
            span.textContent = `${member.description}`;
            p.textContent = `${member.phone}`
            a.textContent = `${member.website}`
            li.appendChild(h3);
            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(a);
            ul.appendChild(li);
        })
        cardsContainer.appendChild(ul);
    })

}
const cardsContainer = document.querySelector('.card-container');
const orderBtns = document.querySelectorAll('[data-action="order"]');
const members = getData();

displayCards();
orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const value = e.target.textContent;
        cardsContainer.innerHTML = "";
        if (value == "Cards") {
            displayCards();
        } else {
            displayList();
        }
    })
})