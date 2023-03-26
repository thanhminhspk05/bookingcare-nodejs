import db from '../models/index';
import bcrypt from 'bcryptjs';

let salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmailExist(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true,
                });
                console.log(user);
                if (user) {
                    // compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        // correct email && password
                        userData.errCode = 0;
                        userData.errMessage = 'Login success.';
                        delete user.password;
                        userData.user = user;
                    } else {
                        // correct email but wrong password
                        userData.errCode = 1;
                        userData.errMessage = 'Incorrect password.';
                        userData.user = {};
                    }
                }
            } else {
                // email not exist
                userData.errCode = 2;
                userData.errMessage = 'Email is not exist.';
                userData.user = {};
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmailExist = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmailValid = (userEmail) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(userEmail);
};

let checkUserPasswordValid = (userPassword) => {
    let re = {
        capital: /[A-Z]/,
        digit: /[0-9]/,
        full: /^[A-Za-z][A-Za-z0-9]{7,24}$/,
    };
    return re.capital.test(userPassword) && re.digit.test(userPassword) && re.full.test(userPassword);
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    // raw: true, ./src.config/config.json
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    attributes: {
                        exclude: ['password'],
                    },
                    where: { id: userId },
                    // raw: true,
                });
                // delete users.password;
            }
            resolve(users);
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

let formatDate = (date) => {
    let parts = date.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

formatDate('22-04-20');

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check if user already exists
            let checkEmailExist = await checkUserEmailExist(data.email);
            if (checkEmailExist === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email already exists. Try another email!',
                });
            }

            // check validate email. It have to @ and .
            let checkEmailValid = checkUserEmailValid(data.email);
            if (checkEmailValid === false) {
                resolve({
                    errCode: 2,
                    errMessage: 'Invalid email address!',
                });
            }

            let checkPasswordValid = checkUserPasswordValid(data.password);
            if (checkPasswordValid === false) {
                resolve({
                    errCode: 3,
                    errMessage: 'Use 8 or more characters and combinations of letters, numbers!',
                });
            }

            if (!checkEmailExist && checkEmailValid && checkPasswordValid) {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                let birthday = formatDate(data.birthday);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phone: data.phone,
                    birthday: birthday,
                    gender: data.gender,
                    roleId: data.roleId,
                    statusHealth: data.statusHealth,
                    diagnose: data.diagnose,
                    prescription: data.prescription,
                });
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });

            if (!user) {
                resolve({
                    errCode: 1,
                    erMessage: 'User not found!',
                });
            }

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
            resolve({
                errCode: 0,
                erMessage: 'User has been updated!',
            });
        } catch (e) {
            reject(e);
        }
    });
};

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } });
            if (!user) {
                resolve({
                    errCode: 1,
                    erMessage: 'User not found!',
                });
            }
            await db.User.destroy({
                where: { id: userId },
            });
            resolve({
                errCode: 0,
                erMessage: 'User has been deleted!',
            });
        } catch (e) {
            reject(e); // or console.log(e)
        }
    });
};

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeInput) {
                let response = {};
                console.log('dddddd');
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput },
                });

                response.errCode = 0;
                response.data = allcode;
                resolve(response);
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!',
                });
            }
        } catch {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser,
    getAllCodeService,
    hashUserPassword,
};
