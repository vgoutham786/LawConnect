const express = require('express');
const cors = require("cors")
const app = express();
app.use(express.json());
const adminRouter = require('./Routes/admin.route')
const lawyerRouter = require('./Routes/lawyer.route')

app.use(cors())

const cookieSession = require("cookie-session");

const AppoinmentRoute = require("./Routes/appointment.route")

const connection = require('./config/mongo');
const { signinRoute } = require('./Routes/sigin.route');
const { LawyerModel } = require('./Models/lawyer.model');
const { myChat } = require('./Controllers/chat.controller');


require("dotenv").config();


const http = require("http").createServer(app);
const io = require("socket.io")(http);

// ========================================Routes

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ["key1", "key2"],
}))

app.get('/', (req, res) => {
    res.send("Welcome to the home route")
})

app.get("/myChat", myChat)
app.use('/admin', adminRouter);
app.use("/user", signinRoute)
app.use("/lawyer", lawyerRouter)
app.use("/appointment", AppoinmentRoute)



// Map to store connected lawyers
const connectedLawyers = new Map();
const connectedUsers = new Map();

io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle lawyer registration
    socket.on("registerLawyer", (data) => {
        const lawyerId = data.lawyerId;
        connectedLawyers.set(lawyerId, socket);
        console.log(`Lawyer ${lawyerId} registered`);
    });
    // handle user registration
    socket.on("registerUser", (userEmail) => {
        connectedUsers.set(userEmail, socket);
        console.log(`Usesr ${userEmail} registered`);
    });

    // Handle sending a message to a lawyer
    socket.on("sendToLawyer", async (data) => {
        const { lawyerId, chatting, email } = data;

        // Check if the lawyer is registered and connected
        if (connectedLawyers.has(lawyerId)) {
            const lawyerSocket = connectedLawyers.get(lawyerId);
            lawyerSocket.emit("receiveMessage", {
                textMsg: chatting.textMsg,
                sendByEmail: email,
            });
        } else {
            console.log(`Lawyer ${lawyerId} is not available`);
        }
        handleChatUpdate(data);
    });

    // Handle sending a message to a user
    socket.on("sendToUser", async (data) => {
        const { lawyerId, chatting, email } = data;

        // Check if the lawyer is registered and connected
        if (connectedUsers.has(email)) {
            const userSocket = connectedUsers.get(email);
            userSocket.emit("receiveMessage", {
                textMsg: chatting.textMsg,
                sendByEmail: lawyerId,
            });
        } else {
            console.log(`User ${email} is not available`);
        }
        handleChatUpdate(data);
    });

    const handleChatUpdate = async (data) => {
        const { lawyerId, chatting, email } = data;
        try {
            const temp = await LawyerModel.findOne({ email: lawyerId });
            let messages = [...temp.messages];
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].userEmail == email) {
                    messages[i].chats.push(chatting);
                    break;
                }
            }
            try {
                const newData = await LawyerModel.findOneAndUpdate(
                    { email: lawyerId },
                    { messages }
                );
            } catch (error) { }
        } catch (error) {
            console.log(error.message);
        }
    };

    // Handle disconnection
    socket.on("disconnect", () => {
        // Remove lawyer from the connectedLawyers map
        for (const [lawyerId, connectedSocket] of connectedLawyers.entries()) {
            if (connectedSocket === socket) {
                connectedLawyers.delete(lawyerId);
                console.log(`Lawyer ${lawyerId} disconnected`);
                break;
            }
        }
    });
});

// ==========================listening the server
http.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("connected to server")
})


