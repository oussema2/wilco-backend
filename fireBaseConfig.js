const admin = require("firebase-admin");
const initializeApp = require("firebase/app").initializeApp;

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
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const firebaseApp = initializeApp(firebaseConfig);

module.exports.admin = admin;
module.exports.firebaseApp = firebaseApp;
