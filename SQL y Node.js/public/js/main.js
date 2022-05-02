
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const msg = document.getElementById('msg');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');
//GET Username & Room from url using qs CDN (https://cdnjs.com/libraries/qs)
const qsData = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(qsData);


// const { username, room } = qsData;

const socket = io();
const table = document.getElementById('myTable');
const submitButton = document.getElementById('Submit');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

socket.emit('allProducts');

socket.on('producto', (unProducto) => {
  attachRow(unProducto);
});

const attachRow = (unProducto) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `<td>${unProducto.id}</td><td>${unProducto.nombre}</td> <td>${unProducto.precio}</td>`;

  table.appendChild(fila);
};

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('CLICK!');
  try {
    const dat = {
      nombre: nombre.value,
      precio: precio.value,
    };

    const url = 'http://localhost:8080/productos';
    response = await postData(url, dat);

    console.log(response);
  } catch (err) {
    console.log(err);
  }
});


//Join to the room
socket.emit('JoinRoom', qsData);

socket.on('message', (data) => {
  //add the message to the chat Window
  outputMessage(data);
  oldMessage()
  //Automatically scroll down to the last message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //Emit Message to the server
  socket.emit('chatMessage', msg.value);

  //Clear submitted message
  msg.value = '';
});

//Output Message to DOM
/**
 * We are going to create the following html output for each message
 *      <div class="message">
 *         <p class="meta">Brad <span>9:12pm</span></p>
 *         <p class="text">
 *           Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
 *           repudiandae.
 *         </p>
 *       </div>
 */

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">${message.username} <span> ${message.time}</span></p>
  <p class="text"> ${message.text} </p>`;

  chatMessages.appendChild(div);
}

function oldMessage() {
  const div = document.createElement('div');
  div.classList.add('message');

  
  // oldM.forEach(message => {
  //   div.innerHTML = `
  // <p class="meta">${message.username} <span> ${message.time}</span></p>
  // <p class="text"> ${message.text} </p>`;

  // chatMessages.appendChild(div);
  // });
  
}

//Get Room's Info
socket.on('roomUsers', (roomInfo) => {
  const {  users } = roomInfo;


  outputUsers(users);
});

//add Room Name
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  const arrayofUsers = users.map((aUser) => `<li>${aUser.username}</li>`);
  console.log(arrayofUsers);
  usersList.innerHTML = arrayofUsers.join('');
}
