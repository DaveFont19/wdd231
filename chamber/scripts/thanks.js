const getString = window.location.search;
const myInfo = new URLSearchParams(getString);
const array = new Date().toISOString().split('T');
const date = array[0];
const timeArray = array[1].split('.');
const time = timeArray[0]

document.querySelector('#information-client').innerHTML = `
<p class='welcome'>Welcome ${myInfo.get('first')} ${myInfo.get('last')} !!!</p>
<p>Email: ${myInfo.get('email')} <br>Cell Phone: ${myInfo.get('phone')} <br>
Business / Organization's Name: ${myInfo.get('organization-name')}<br>
Membership Level: ${myInfo.get('membership')}<br>
Your company description: ${myInfo.get('description')}<br>
Date: ${date} <br>
Time: ${time}</p>`;