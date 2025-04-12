const key = "sk-kiWY67e2cde1a859a9403";
async function getData() {
    try {
        const response = await fetch(`https://perenual.com/api/v2/species-list?key=${key}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function initApp() {
    try {
        const respond = await getData();
        const trees = [];
        const main = document.getElementById('main');
        const dialog = document.getElementById('dialog');

        if (!respond || !respond.data) {
            console.error("No se recibieron datos válidos de la API");
            return;
        }

        respond.data.forEach(element => {
            trees.push(element);
        });
        trees.forEach((tree, index) => {
            if (!tree.default_image || !tree.default_image.small_url) {
                return;
            }
            else {
                const card = document.createElement('card');
                const img = document.createElement('img');
                const div = document.createElement('div');
                img.src = tree.default_image.small_url;
                img.classList = 'imgCard';
                img.setAttribute('loading', 'lazy');
                img.setAttribute('alt', `${tree.common_name}`);
                div.classList = 'div-container';
                div.innerHTML = `<p><strong>Common Name: </strong>${tree.common_name}<br>
            <strong>Family: </strong>${tree.family ? tree.family : 'Unknown'}<br>
            <strong>Scientific Name: </strong> ${tree.scientific_name}</p>
            <button class='openModal' data-tree-index="${index}">Learn More</button>`;

                card.appendChild(img);
                card.appendChild(div);
                main.appendChild(card);
            }
        });
        const buttons = document.querySelectorAll('.openModal');
        buttons.forEach(button => {
            button.addEventListener('click', () =>{
                const index = button.getAttribute('data-tree-index');
                const selectedTree = trees[index];
                if (dialog) {
                    dialog.innerHTML = `
                        <div class="modal-content">
                            <button id="closeModal">✖</button>
                            <h2>${selectedTree.common_name}</h2>
                            <img src="${selectedTree.default_image.medium_url}" alt="${selectedTree.common_name} loading="lazy"">
                            <p><strong>Scientific Name:</strong> ${selectedTree.scientific_name}<br>
                            <strong>Family:</strong> ${selectedTree.family || 'Unknown'}<br>
                            <strong>Other Name:</strong> ${selectedTree.other_name || 'Unknown'}<br>
                            <strong>Species epithet:</strong> ${selectedTree.species_epithet || 'Unknown'}<br>
                            <strong>Genus:</strong> ${selectedTree.genus || 'Unknown'}<br></p>                            
                        </div>`;
                    dialog.showModal();
                    dialog.classList.add('open')
                    document.getElementById('closeModal').addEventListener('click', () => {
                        dialog.classList.remove('open');
                        dialog.close();
                    });
                }
            });
        });
    } catch (error) {
        console.error("Error: ", error);
    }
}
initApp();
