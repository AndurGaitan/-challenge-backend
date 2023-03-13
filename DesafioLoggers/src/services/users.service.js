import { userContainer } from "../persistence/containers/users.container.js";
import { userModel } from "../persistence/user.model.js";

const persistence = new userContainer(userModel);

const loginUser = async (username, password, done) => {
    return await persistence.loginUser(username, password, done);
}

const signupUser = async (username, password, done) => {
    return await persistence.signupUser(username, password, done);
}

const serializeUser = (username, done) => {
    return persistence.serializeUser(username, done);
}

const deserializeUser = async (user, done) => {
    return await persistence.deserializeUser(user, done);
}


export default {
    loginUser,
    signupUser,
    serializeUser,
    deserializeUser
};