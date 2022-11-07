const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data) => {
    const mail = { ...data, from: "krenichniy@ukr.net" }
   await sgMail.send(mail)
        .then(()=>console.log("Email send successfully"))
        .catch(err => console.log(err.message))
    return true;
}
module.exports = sendEmail;
// const mail = {
//   to: "boris@gmail.com",
//   from: "krenichniy@mail.com",
//   subject: "f;dskfdskf;dsklfd",
//   html:'<?sfdfdf>'
// }
