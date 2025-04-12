const button = document.getElementById('log-in');
button.addEventListener('click', () => {
    const dialog = document.getElementById('dialog');

    dialog.innerHTML = `
    <button id='closeModal'>✖</button>
    <form id="loginForm">
        <label for="user-name">User Name: *</label>
        <input type="text" required placeholder="User Name" name="user-name" id="user-name-verify">
        <label for="password">Password: *</label>
        <input type="password" required placeholder="Password" name="password" id="password-verify">
        <button type="submit" id='verify'>Log in</button>
    </form>`;
    dialog.showModal();
    dialog.classList.add('open');

    closeModal.addEventListener('click', () => {
        dialog.classList.remove('open');
        dialog.close();
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const response = JSON.parse(localStorage.getItem('users'));
        const userName = document.getElementById('user-name-verify').value;
        const userInformation = response.find(account => account.userName === userName);
        if (!userInformation) {
            dialog.innerHTML = `<button id='closeModal'>✖</button>
            <p>The user : <strong>${userName}</strong> does not Exist!!</p>`;            
        } else {
            const password = document.getElementById('password-verify').value;
            if(userInformation.password == password){
                 dialog.innerHTML = `<button id='closeModal'>✖</button>
                 <p>Your Login was succesfully <strong>${userName}</strong></p>`;
            } else {
                dialog.innerHTML =`<button id='closeModal'>✖</button> <p>Incorrect password</p>`;
            }
        }
        closeModal.addEventListener('click', () => {
            dialog.classList.remove('open');
            dialog.close();
        });
    });
});