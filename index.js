let users = [];
const tokens = [];
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");
// const db = require("./db/connection");

const getAnalytics = require("firebase/analytics").getAnalytics;
const admin = require("./fireBaseConfig").admin;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABX1cqJiRPcqsdTzR6vUF15dMakSw4T8Q",
  authDomain: "wilco-test-4dd71.firebaseapp.com",
  projectId: "wilco-test-4dd71",
  storageBucket: "wilco-test-4dd71.appspot.com",
  messagingSenderId: "640717674279",
  appId: "1:640717674279:web:3b9f8248d04a5fd8bd7b02",
  measurementId: "G-SVW3WRTG4Z",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDhZEweBxUOlPX/\nSH9B2tah4RYKtzeetfZ2KF5ZDsFp/0GOHbHN3rtCtbz4V7Nx1cEJgtyGufdZBVPy\nmNDK8y/gYaLRYLtB6knhtn2K+WUyq9qqNGbXSlB9lyZ6wmztO/Kpv3j0aFxG9Kus\nLYh+LjDFIPXxOBs6TFlBLFUZtx9G39lv0K7Ut9pFMFtZvkrebJBkOucb6Zx/aJTk\n0szERE+RAW8KtBhez6a/aragteiTAbIVD0wUitmjH8fIGxQlYEc87KEZooeTjW8K\nmMa5VQdzTHj/QEx12QTRf/Va7T4BT/WzIrRnTl1It5Ig4U0vDv8i+ve5TNOL8IHG\nb3cpwIT3AgMBAAECggEAEvmWpDsvEqMyco4akzi73l+iCL+T9yXqhy1ZhAsx9/J9\nWlw1noH50eFASh1YBhAGHamJV0OgseXjmLDfeGEwzqW+8fxAHN8p3nlhPanxUxVq\nEJozbjyGD4ysuKOq9+3sEqOuqHorX+3ekLLkotAmBZ0uF2NZ0iFLV6lGdiZsg6gm\n6kfQ4r8jhwWAtZxvr6b3pr73gybIaNdZQ8jXW67VhnbM3NYUWjAEeN0P4Fe19lIR\nJQyE8q3KKBJ7uxRhBBjB46V/dL52Lp+sM9EqkbxnByeoZcH0PsNdb4pwfiy4xs4W\nIzGVWoh+fNMkseyCx4pj6qj5SUCRNWf39kv/TVhkgQKBgQD+tGSMwEePcR0YnZYf\n9hu48lTjABoODaV+sXxYcxSIz0I2ME4j+swFXBkUT7ZDbHEhdElPrD/DoZxIKB9B\nQ646uuiwSNKYns3i0OVIJ5fOwQuU72xG67Br0PT7WBzin58eij4bTjn6qXYHa/iL\nMKE8DW+sPOpgCDShsaE8uZywiQKBgQDiib3Fx/i5Z+Lk7QoaQvMV6V0Aq2sLjdw6\n7VTyj4HgvfVDE+unK4OBy61I2vpnQKuv2W1NPbn454/xUsUxJI1FOEzMVawpvWqJ\ndxH56x7vCO0lQ6+s6jEwESDv9dPevoq/1r+TtdLCo2MgT2TECHVljnM7TCrIHfjf\niwheoQcpfwKBgQDK2B1v3r3e5eWXMgFaSOUBILUr52vYn1Oal30A7/19ixofD89b\nZiPPbO5oN6dfAOEEFJlCA1rw0ScmbBWgI2eBTFN9+TEG7QnoxhajpSyIM0OnBBpG\nTPO+mbZQ6XZvoVHWv6AAnQcdspHWDU3ug/cUXVr/X7AEdOR9lXpkYyn/iQKBgQDG\nycIKnWjoIX5cDpmP4/H151riLIn5kJmR6BNj6oQ419gx7XgbsLZsnnNH/EhBdOFz\npSMh5amc/m40gMJjVkTVWgsiP4ec9QdY63CN00HI1hdrXNL6tGNHX7B8gUZTLvcI\nUoS4NJRmkgN5JdIxp46E+JSrkzHze0GZwCIvD7T+NwKBgHnkHuSd1xFt0b8Yfdln\n82adg/07SbRrRGPy4EGfBbReNjmNKEYCtA0+QaT2gs+jGONtWQ2OTByRgjfplgwQ\n5Csuw8Dgs4Cdbc3EqBI6vr+6/Ez7lin9gR6ZH4to4yBxDqY68JBgBaLD0+PFb2C5\n40Vn0BrP1MhzJNqcJSW1UAmF\n-----END PRIVATE KEY-----\n",
  type: "service_account",
  project_id: "wilco-test-4dd71",
  private_key_id: "6642b4616645c6edcb31a73d1a9d95c36bdf2ad2",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDhZEweBxUOlPX/\nSH9B2tah4RYKtzeetfZ2KF5ZDsFp/0GOHbHN3rtCtbz4V7Nx1cEJgtyGufdZBVPy\nmNDK8y/gYaLRYLtB6knhtn2K+WUyq9qqNGbXSlB9lyZ6wmztO/Kpv3j0aFxG9Kus\nLYh+LjDFIPXxOBs6TFlBLFUZtx9G39lv0K7Ut9pFMFtZvkrebJBkOucb6Zx/aJTk\n0szERE+RAW8KtBhez6a/aragteiTAbIVD0wUitmjH8fIGxQlYEc87KEZooeTjW8K\nmMa5VQdzTHj/QEx12QTRf/Va7T4BT/WzIrRnTl1It5Ig4U0vDv8i+ve5TNOL8IHG\nb3cpwIT3AgMBAAECggEAEvmWpDsvEqMyco4akzi73l+iCL+T9yXqhy1ZhAsx9/J9\nWlw1noH50eFASh1YBhAGHamJV0OgseXjmLDfeGEwzqW+8fxAHN8p3nlhPanxUxVq\nEJozbjyGD4ysuKOq9+3sEqOuqHorX+3ekLLkotAmBZ0uF2NZ0iFLV6lGdiZsg6gm\n6kfQ4r8jhwWAtZxvr6b3pr73gybIaNdZQ8jXW67VhnbM3NYUWjAEeN0P4Fe19lIR\nJQyE8q3KKBJ7uxRhBBjB46V/dL52Lp+sM9EqkbxnByeoZcH0PsNdb4pwfiy4xs4W\nIzGVWoh+fNMkseyCx4pj6qj5SUCRNWf39kv/TVhkgQKBgQD+tGSMwEePcR0YnZYf\n9hu48lTjABoODaV+sXxYcxSIz0I2ME4j+swFXBkUT7ZDbHEhdElPrD/DoZxIKB9B\nQ646uuiwSNKYns3i0OVIJ5fOwQuU72xG67Br0PT7WBzin58eij4bTjn6qXYHa/iL\nMKE8DW+sPOpgCDShsaE8uZywiQKBgQDiib3Fx/i5Z+Lk7QoaQvMV6V0Aq2sLjdw6\n7VTyj4HgvfVDE+unK4OBy61I2vpnQKuv2W1NPbn454/xUsUxJI1FOEzMVawpvWqJ\ndxH56x7vCO0lQ6+s6jEwESDv9dPevoq/1r+TtdLCo2MgT2TECHVljnM7TCrIHfjf\niwheoQcpfwKBgQDK2B1v3r3e5eWXMgFaSOUBILUr52vYn1Oal30A7/19ixofD89b\nZiPPbO5oN6dfAOEEFJlCA1rw0ScmbBWgI2eBTFN9+TEG7QnoxhajpSyIM0OnBBpG\nTPO+mbZQ6XZvoVHWv6AAnQcdspHWDU3ug/cUXVr/X7AEdOR9lXpkYyn/iQKBgQDG\nycIKnWjoIX5cDpmP4/H151riLIn5kJmR6BNj6oQ419gx7XgbsLZsnnNH/EhBdOFz\npSMh5amc/m40gMJjVkTVWgsiP4ec9QdY63CN00HI1hdrXNL6tGNHX7B8gUZTLvcI\nUoS4NJRmkgN5JdIxp46E+JSrkzHze0GZwCIvD7T+NwKBgHnkHuSd1xFt0b8Yfdln\n82adg/07SbRrRGPy4EGfBbReNjmNKEYCtA0+QaT2gs+jGONtWQ2OTByRgjfplgwQ\n5Csuw8Dgs4Cdbc3EqBI6vr+6/Ez7lin9gR6ZH4to4yBxDqY68JBgBaLD0+PFb2C5\n40Vn0BrP1MhzJNqcJSW1UAmF\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-afyef@wilco-test-4dd71.iam.gserviceaccount.com",
  client_id: "109694783021535007145",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-afyef%40wilco-test-4dd71.iam.gserviceaccount.com",
};
// admin.initializeApp({
//   credential: admin.credential.cert(firebaseConfig),
// });
const firebaseApp = require("./fireBaseConfig").firebaseApp;

const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");
const firestore = require("firebase-admin").firestore();

// Initialize Firebase
// const analytics = getAnalytics(appFirebase);

const app = express();
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(cors());
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose
  .connect(
    "mongodb://linroot:DU123iHqTUug7YkQ@lin-8322-15958.servers.linodedb.net:27017/?authMechanism=DEFAULT&tls=true&tlsCAFile=%2Fvar%2Flib%2Fmongodb%2FWaveMdatabases-ca-certificate.cer",
    connectionParams
  )
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
// console.log(process.env.MONGO_USERNAME);

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", async (data) => {
    let res;
    const user = getUser(data.receiverId);
    if (data._id) {
      res = await sendMessage(data);
    } else {
      res = await startDiscussion(data);
      console.log(res);
    }
    if (res.status === 200) {
      io.to(user.socketId).emit("getMessage", {
        senderId: data.senderId,
        message: res.message,
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("a user disconnected!");
    io.emit("getUsers", users);
  });
});

console.log(users);

app.use("/register", (req, res) => {
  tokens.push(req.body.token);
  res.status(200).json({ message: "Successfully registered FCM Token!" });
});

const PilotRoutes = require("./routes/PilotRoutes");
const AirCraftRoutes = require("./routes/AirCraftRoutes");
const PostsRoutes = require("./routes/PostRoutes");
const CommentRoutes = require("./routes/CommentRoutes");
const ReportRoutes = require("./routes/ReportsRoutes");
const AirPortRoutes = require("./routes/AirPortRoute");
const CommunitieRoutes = require("./routes/CommunitiesRoutes");
const ReplyRoutes = require("./routes/ReplyRoutes");
const ContributionRoutes = require("./routes/ContributionRoutes");
const EventsRoutes = require("./routes/EventRoutes");
const sendMessage = require("./helper/DiscussionsHelper").sendMessage;
const startDiscussion = require("./helper/DiscussionsHelper").startDiscussion;
const test = require("./helper/test");

app.use("/pilot", PilotRoutes);
app.use("/airCraft", AirCraftRoutes);
app.use("/post", PostsRoutes);
app.use("/comment", CommentRoutes);
app.use("/report", ReportRoutes);
app.use("/airPort", AirPortRoutes);
app.use("/communitie", CommunitieRoutes);
app.use("/reply", ReplyRoutes);
app.use("/contribution", ContributionRoutes);
app.use("/event", EventsRoutes);

app.post("/signup", async (req, res) => {
  const { email, password, secureNote } = req.body;
  if (!secureNote) {
    res.status(400).json({ error: { code: "no-secure-note" } });
    return;
  }

  try {
    const auth = getAuth(firebaseApp);
    console.log("reached");

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const adminAuth = getAdminAuth();
    const token = await adminAuth.createCustomToken(credential.user.uid);

    await firestore.doc(`users/${credential.user.uid}`).set({ secureNote });
    res.status(201).json({ token });
  } catch (err) {
    const { code } = err;
    if (code === "auth/email-already-in-use") {
      res.status(400);
    } else {
      res.status(500);
    }
    res.json({
      error: {
        code: err,
      },
    });
  }
});

app.post("/register", (req, res) => {
  tokens.push(req.body.token);
  res.status(200).json({ message: "Successfully registered FCM Token!" });
});

app.post("/notifications", async (req, res) => {
  try {
    const { title, body, imageUrl } = req.body;
    await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title,
        body,
        imageUrl,
      },
    });
    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});

// app.post("/register", );

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
