const membership = [
    {
        "level": "NP",
        "price": 0,
        "requirements": "None",
        "benefits": [
            "Basic access to the website",
            "Ability to view public events",
            "No discounts or privileges"
        ]
    },
    {
        "level": "Bronze",
        "price": 100,
        "benefits": [
            "Access to exclusive events",
            "5% discount on events",
            "Limited advertising on the website",
            "Access to exclusive newsletters"
        ]
    },
    {
        "level": "Silver",
        "price": 250,
        "benefits": [
            "All Bronze benefits",
            "10% discount on events",
            "Featured advertising on the website",
            "Early access to event registrations",
            "Access to exclusive training"
        ]
    },
    {
        "level": "Gold",
        "price": 500,
        "benefits": [
            "All Silver benefits",
            "20% discount on events",
            "Premium advertising (spotlight on the homepage)",
            "Invitations to VIP events",
            "Opportunity to sponsor events",
            "Priority assistance and premium support"
        ]
    }
]
function displayBenefits(benefits) {
    benefits.forEach((benefit) =>{
        const p = document.createElement('p');
        p.textContent = `- ${benefit}`;
        dialog.appendChild(p);
    })

}
function displayCourseMOdal(value) {
    let memberInformation = membership[value];
    dialog.innerHTML = "";
    dialog.classList.add('open');
    dialog.innerHTML = `
    <h3><span class='${memberInformation.level.toLowerCase()}-title'>${memberInformation.level}</span> Membership Level</h3>
    <button id="closeModal">✖</button>
    <p><strong>Membership Cost:</strong> $${memberInformation.price} per month</p>
    <p><strong>Some of the benefits:</strong></p>`;
    displayBenefits(memberInformation.benefits)


    dialog.showModal();
    closeModal.addEventListener('click', () => {
        dialog.classList.remove("open");
        dialog.close();
    })
}

const modalBtns = document.querySelectorAll('[data-action="display-modal"]');
const dialog = document.getElementById("membership-information");

modalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.value; 
        displayCourseMOdal(value);
    })
})