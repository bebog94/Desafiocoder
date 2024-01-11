const socketClient = io();
const h4user = document.getElementById("user");
const form = document.getElementById("chatForm");
const inputMessage = document.getElementById("message");
const divChat = document.getElementById("chat");
let user;
Swal.fire({
  title: "Welcome!",
  text: "What is your user",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "user is required";
    }
  },
  confirmButtonText: "Enter",
}).then((input) => {
  user = input.value;
  h4user.innerText = user;
  socketClient.emit("newUser", user);
});

socketClient.on("userConnected", (user) => {
  Toastify({
    text: `${user} connected`,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    duration: 5000,
  }).showToast();
});
socketClient.on("connected", () => {
  Toastify({
    text: "Your are connected",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    duration: 5000,
  }).showToast();
});

form.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    user: user,
    message: inputMessage.value,
  };
  socketClient.emit("message", infoMessage);


  fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infoMessage),
  });

  inputMessage.innerText = "";
};

socketClient.on("chat", (messages) => {
  const chat = messages
    .map((m) => {
      return `<p>${m.user}: ${m.message}</p>`;
    })
    .join(" ");
  divChat.innerHTML = chat;
});


