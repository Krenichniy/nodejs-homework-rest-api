const { BASE_URL } = process.env;
const createVerifyEmail = (email, verificationToken) => {
      const mail = {
        to: email,
        subject: "Verification email ",
        html:`<a target="_blank" href='${BASE_URL}/api/auth/verify/${verificationToken}'>Click to verify email</a>`
    }
    return mail;
}

module.exports = createVerifyEmail;