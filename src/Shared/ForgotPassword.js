
import app from "../firebase";


export const ForgotPassword = (  Email  ) => {
    console.log("email",Email);
    app.auth().sendPasswordResetEmail(Email)
    .then(function (user) {
        alert('Please check your email...')
    })
    .catch(function (e) {
        console.log(e)
        alert(e);
    })
};

