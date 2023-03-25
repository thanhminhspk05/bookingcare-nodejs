import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => {
    return res.render('homepage.ejs');
};

let displayCreateUser = (req, res) => {
    return res.render('createUser.ejs');
};

let verifyEmail = async (req, res) => {
    await CRUDService.createNewUser(req.body);
    return res.render('verifyEmail.ejs');
};

let displayUserInfo = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('displayUser.ejs', {
        dataTable: data,
    });
};

let displayEditUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        if (userData) {
            return res.render('editUser.ejs', { user: userData });
        } else {
            return res.send('User not found!');
        }
    }
    return res.send('User not found!');
};

let editComplete = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    res.render('displayUser.ejs', { dataTable: allUsers });
};

let deleteUser = async (req, res) => {
    let id = req.query.id;
    let allUsers = await CRUDService.deleteUserById(id);
    res.render('displayUser.ejs', { dataTable: allUsers });
};

module.exports = {
    getHomePage: getHomePage,
    displayCreateUser: displayCreateUser,
    verifyEmail: verifyEmail,
    displayUserInfo: displayUserInfo,
    displayEditUser: displayEditUser,
    editComplete: editComplete,
    deleteUser: deleteUser,
};
