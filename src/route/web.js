import express from 'express';

import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser); // restAPI

    router.get('/api/allcode', userController.handleGetAllCode);

    return app.use('/', router);
};

module.exports = initWebRoutes;
