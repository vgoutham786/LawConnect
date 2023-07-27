



const socket = io("https://law-connect.onrender.com", { transports: ["websocket"] });
const userChatEmail = "user@example.com";
let myLawyerId = "";
const display_box = document.getElementById("chat_box");
const myLawyers = document.querySelectorAll(".myLawyers");
const chatSection = document.getElementById("chat_section");
myLawyers.forEach((ele) => {
    ele.addEventListener("click", () => {
        myLawyerId = ele.getAttribute("data-lawyerId");
        chatSection.style.display = "block";
        updateChatBox(myLawyerId);
    });
});

// Connect to the server
socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("registerUser", userChatEmail);
});

// Send a message to a lawyer
document
    .getElementById("msg_form")
    .addEventListener("submit", (event) => {
        event.preventDefault();
        sendMessage();
    });
function sendMessage() {
    // const lawyerId = document.getElementById('lawyerId').value;
    const message = document.getElementById("message").value;

    const chatData = `
<div class="p-2 me-1 border" style="border-radius: 15px; background-color: #fbfbfb;">
            <p class="small mb-0">${message}</p>
          </div>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
            alt="avatar 1" style="width: 45px; height: 100%;">
`;

    const received_msg = document.createElement("div");
    received_msg.setAttribute(
        "class",
        "d-flex flex-row justify-content-end mb-4"
    );
    received_msg.innerHTML = chatData;
    display_box.append(received_msg);

    display_box.scrollTop = display_box.scrollHeight;

    const data = {
        lawyerId: myLawyerId,
        email: userChatEmail,
        chatting: {
            textMsg: message,
            sendBy: "user",
        },
    };
    socket.emit("sendToLawyer", data);
    document.getElementById("message").value = "";
}

// Receive a message from a lawyer
socket.on("receiveMessage", (message) => {
    const chatData = `
<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar 1" style="width: 45px; height: 100%;">
          <div class="p-2 ms-1" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
            <p class="small mb-0">${message}</p>
          </div>
`;

    const received_msg = document.createElement("div");
    received_msg.setAttribute(
        "class",
        "d-flex flex-row justify-content-start mb-4"
    );
    received_msg.innerHTML = chatData;
    display_box.append(received_msg);

    display_box.scrollTop = display_box.scrollHeight;
    // Handle the received message as desired (e.g., display it on the page)
});

// update chat box
//   updateChatBox();

function updateChatBox(myLawyerId) {
    fetch(
        `https://law-connect.onrender.com/myChat?lawyerId=${myLawyerId}&email=${userChatEmail}`
    )
        .then((req) => req.json())
        .then((res) => appendChaBox(res));
}
function appendChaBox(data) {
    document.getElementById("chat_box").innerHTML = data
        .map((ele) => {
            //         return `
            // <p class=${ele.sendBy}> ${ele.textMsg} </p>
            // `;
            if (ele.sendBy != "user") {
                return `
<div class="d-flex flex-row justify-content-start mb-4">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar 1" style="width: 45px; height: 100%;">
          <div class="p-2 ms-1" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
            <p class="small mb-0">${ele.textMsg}</p>
          </div>
        </div>
`;
            } else {
                return `
<div class="d-flex flex-row justify-content-end mb-4">
          <div class="p-2 me-1 border" style="border-radius: 15px; background-color: #fbfbfb;">
            <p class="small mb-0">${ele.textMsg}</p>
          </div>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
            alt="avatar 1" style="width: 45px; height: 100%;">
        </div>
`;
            }
        })
        .join("");
    display_box.scrollTop = display_box.scrollHeight;
}

function closeChatBox() {
    chatSection.style.display = "none";
}
function toggleChats() {
    const element = document.getElementById("myLawyers");
    console.log(element.style.height);
    if (element.style.height == "0px" || element.style.height == false) {
        element.style.height = "50vh";
    } else {
        element.style.height = 0;
    }
}
