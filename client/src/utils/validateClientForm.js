import Validator from "validator";

export default {
  signIn: data => {
    const clientErrors = {};
    if (!data.email) {
      clientErrors.email = "Can't be blank";
    } else if (!Validator.isEmail(data.email)) {
      clientErrors.email = "Invalid email";
    }
    if (!data.password) {
      clientErrors.password = "Can't be blank";
    } else if (data.password.length < 4 || data.password.length > 50) {
      clientErrors.password = "Length of user name have to be between 4 to 50";
    }
    return clientErrors;
  },
  signUp: data => {
    const clientErrors = {};
    if (!data.username) {
      clientErrors.username = "Can't be blank";
    } else if (data.username.length < 3 || data.username.length > 30) {
      clientErrors.username = "Length of user name have to be between 3 to 30";
    }
    if (!data.password) {
      clientErrors.password = "Can't be blank";
    } else if (data.password.length < 4 || data.username.length > 50) {
      clientErrors.password = "Length of password have to be between 4 to 50";
    }
    if (!data.email) {
      clientErrors.email = "Can't be blank";
    } else if (!Validator.isEmail(data.email)) {
      clientErrors.email = "Invalid email";
    }
    return clientErrors;
  },
  addChannel: data => {
    const clientErrors = {};
    if (!data.name) {
      clientErrors.name = "Can't be blank";
    } else if (data.name.length < 1 || data.name.length > 20) {
      clientErrors.name = "Length of channel name have to be between 1 to 20";
    }
    return clientErrors;
  },
  createTeam: data => {
    const clientErrors = {};
    if (!data.name) {
      clientErrors.name = "Can't be blank";
    } else if (data.name.length < 1 || data.name.length > 20) {
      clientErrors.name = "Length of team name have to be between 1 to 20";
    }
    return clientErrors;
  },
  invitePeople: data => {
    const clientErrors = {};
    if (!data.email) {
      clientErrors.email = "Can't be blank";
    } else if (!Validator.isEmail(data.email)) {
      clientErrors.email = "Invalid email";
    }
    return clientErrors;
  }
};
