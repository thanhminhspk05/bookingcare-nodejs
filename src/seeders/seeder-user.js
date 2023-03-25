'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'thanhminhspk05@gmail.com',
                password: 'TM123456',
                firstName: 'Nguyen Thanh',
                lastName: 'Minh',
                address: 'Thu Duc City',
                gender: 'Male',
                roleId: 'admin',
                phone: '0945036530',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
