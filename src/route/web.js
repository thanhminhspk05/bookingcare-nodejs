import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/register', homeController.displayCreateUser);
    router.post('/verify-email', homeController.verifyEmail);

    router.get('/user-info', homeController.displayUserInfo);
    router.get('/edit-user', homeController.displayEditUser); // tag a
    router.get('/delete-user', homeController.deleteUser); // tag a
    router.post('/edit-complete', homeController.editComplete); // send update info

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser); // restAPI

    router.get('/api/allcode', userController.handleGetAllCode);

    return app.use('/', router);
};

module.exports = initWebRoutes;
