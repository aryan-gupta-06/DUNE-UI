import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json" with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// // import admin from "firebase-admin";
// // import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// // });

export default admin;
