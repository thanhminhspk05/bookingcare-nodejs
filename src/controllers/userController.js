import userService from '../services/userService';

const handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 3,
            errMessage: 'Missing inputs parameter!',
            user: {},
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

const handleGetAllUser = async (req, res) => {
    let id = req.query.id; // id = all or number

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing id parameter!',
            user: [],
        });
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user: users,
    });
};

const handleCreateNewUser = async (req, res) => {
    let codeMessage = await userService.createNewUser(req.body);
    return res.status(200).json(codeMessage);
};

const handleEditUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing required parameters!',
        });
    }
    let codeMessage = await userService.editUser(req.body);
    return res.status(200).json(codeMessage);
};

const handleDeleteUser = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing required parameters!',
        });
    }
    let codeMessage = await userService.deleteUser(req.query.id);
    return res.status(200).json(codeMessage);
};

const handleGetAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            // when getAllCodeService rejects
            errCode: -1,
            errMessage: 'Error from server!',
        });
    }
};

module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    handleGetAllCode,
};
