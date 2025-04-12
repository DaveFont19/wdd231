const getString = window.location.search;
const myInfo = new URLSearchParams(getString);
function contact(){
    let clients = []
    const response = JSON.parse(localStorage.getItem('contactUs'))
    if(response){
        response.forEach(element => {
            clients.push(element)
        });
    }
    const client = {
        firstName : myInfo.get('first-name'),
        middleName : myInfo.get('middle-name'),
        lastName : myInfo.get('last-name'),
        email : myInfo.get('email'),
        phoneNumber :  myInfo.get('phone'),
        message :  myInfo.get('message')
    }
    clients.push(client)
    localStorage.setItem('contactUs', JSON.stringify(clients))
}
function register(){
    let users = []
    const response = JSON.parse(localStorage.getItem('users'))
    if(response){
        response.forEach(element => {
            users.push(element)
        });
    }
    const user = {
        firstName : myInfo.get('first-name'),
        middleName : myInfo.get('middle-name'),
        lastName : myInfo.get('last-name'),
        email : myInfo.get('email'),
        userName : myInfo.get('user-name'),
        password : myInfo.get('password'),
        phoneNumber :  myInfo.get('phone'),
        address :  myInfo.get('address')
    }
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
}
if(myInfo.get('address')){
    document.getElementById('main').innerHTML = `
    <h1>Welcome ${myInfo.get('user-name')}!</h1>
        <div>
            <p>Registration succesfully <strong>${myInfo.get('first-name')} ${myInfo.get('last-name')}</strong> for joinin to this wonderful community.<br>
            An email has been ser to you email <strong>${myInfo.get('email')}</strong> with some information<br>
            We invite you to keep searching in our website.</p>
        </div>`;
    register()
}else{
    document.getElementById('main').innerHTML = `
    <h1>Thank You!</h1>
        <div>
            <p>Thank you <strong>${myInfo.get('first-name')} ${myInfo.get('last-name')}</strong> for contact us.<br>
            An advisor will contact you as soon as possible.<br>
            We invite you to keep searching in our website.</p>
        </div>`;
    contact()
}
