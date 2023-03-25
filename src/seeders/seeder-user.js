'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'thanhminh@gmail.com',
                password: '123456',
                firstName: 'Nguyen',
                lastName: 'Minh',
                address: 'Thu Duc City',
                gender: 1,
                roleId: 'R1',
                phonenumber: '0945036530',
                image: 'no image available',
                positionId: 'Doctor',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
