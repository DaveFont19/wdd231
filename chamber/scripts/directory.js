async function getData() {
    try {
        let response = await fetch("./data/members.json");
        let data = await response.json();
        return data
    } catch (error) {
        console.error("Error completo:", error);
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
const weatherApi = {
    getWeather: (lat, lon, unitDefault) => {
        const url = new URL(baseUrl + "/weather");
        url.searchParams.append("lat", lat);
        url.searchParams.append("lon", lon);
        url.searchParams.append("units", unitDefault);
        url.searchParams.append("appid", API_KEY);

        return fetch(url.toString())
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            });
    }
}
const foreCastapi = {
    getWeather: (lat, lon, unitDefault) => {
        const url = new URL(baseUrl + "/forecast");
        url.searchParams.append("lat", lat);
        url.searchParams.append("lon", lon);
        url.searchParams.append("appid", API_KEY);
        url.searchParams.append("units", unitDefault);
        return fetch(url.toString())
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            });
    }
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
const API_KEY = "b45208ded9c8ad5a69bce004a6e965da";
const baseUrl = "https://api.openweathermap.org/data/2.5";
const members = getData();
const lan = "16.77348"
const lon = "-3.00742"
const apitoday = weatherApi.getWeather(lan, lon, "imperial");
const api5Days = foreCastapi.getWeather(lan, lon, "imperial");
const orderBtns = document.querySelectorAll('[data-action="order"]');

apitoday.then((data) => {
    const currentWeather = document.getElementById('current-weather');
    const figure = document.createElement('figure')
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    const p = document.createElement('p');
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    figcaption.textContent = data.weather[0].description;
    p.innerHTML = `<strong>Temperature: </strong>${Math.trunc(data.main.temp)}°F<br>
    <strong>High: </strong>${Math.trunc(data.main.temp_max)}<br>
    <strong>Low: </strong>${Math.trunc(data.main.temp_min)}<br>
    <strong>Humidity: </strong>${Math.trunc(data.main.humidity)}%<br>`;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    currentWeather.appendChild(figure);
    currentWeather.appendChild(p);

})

api5Days.then((data) => {
    const weatherForecast = document.getElementById('weather-forecast');
    const p = document.createElement('p');
    p.innerHTML = `<strong>Today: </strong>${Math.trunc(data.list[0].main.temp)}°F<br>
    <strong>Tomorrow: </strong>${Math.trunc(data.list[8].main.temp)}°F<br>
    <strong>Day after tomorrow: </strong>${Math.trunc(data.list[16].main.temp)}°F`;
    weatherForecast.appendChild(p);
})
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