const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");
const firestore = require("firebase-admin").firestore();
const {
  getAuth: getClientAuth,
  signInWithEmailAndPassword,
} = require("firebase/auth");

async function register(req, res) {
  const { email, password, secureNote } = req.body;
  if (!secureNote) {
    res.status(400).json({ error: { code: "no-secure-note" } });
    return;
  }

  try {
    const auth = getAuth();
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
        code: code ? code.replace("auth/", "") : undefined,
      },
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const credential = await signInWithEmailAndPassword(
      getClientAuth(),
      email,
      password
    );
    const token = await getAdminAuth().createCustomToken(credential.user.uid);
    res.status(200).json({ token });
  } catch (error) {
    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      res.status(403);
    } else {
      res.status(500);
    }
    res.json({
      error: { code: error.code.replace("auth/", "") },
    });
  }
}

module.exports = login;
module.exports = register;
