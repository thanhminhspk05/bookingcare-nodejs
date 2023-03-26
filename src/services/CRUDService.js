import db from '../models/index';

let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phone: data.phone,
                gender: data.gender,
                roleId: data.roleId,
                prescription: data.prescription,
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            console.log(e);
        }
    });
};

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findAll({
                raw: true,
            });
            resolve(user);
        } catch (e) {
            console.log(e);
        }
    });
};

let getUserInfoById = (userId) => {
    // access database need Promise to cancel async
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                resolve(user);
            }
        } catch (e) {
            console.log(e);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            if (user) {
                await db.User.update(
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                    },
                    {
                        where: { id: data.id },
                    },
                );

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            resolve();
            // await db.User.update();
        } catch (e) {
            console.log(e);
        }
    });
};

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let user = await db.User.findOne({ where: { id: userId } });
            // if (user) {
            //     await user.destroy();
            //     let allUsers = await db.User.findAll();
            //     resolve(allUsers);
            // }
            await db.User.destroy({
                where: { id: userId },
            });
            let allUsers = await db.User.findAll();
            resolve(allUsers);
        } catch (e) {
            reject(e); // or console.log(e)
        }
    });
};

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};
