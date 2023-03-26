'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'thanhminhspk05@gmail.com',
                password: '$2a$10$VZE2sBB.Q9KgwHTdDP8niukBE4RDwQAOy0OJYW.a1ctlRzAowxBxW',
                firstName: 'Nguyen Thanh',
                lastName: 'Minh',
                address: 'Thu Duc City',
                gender: 'Male',
                roleId: 'admin',
                phone: '0945036530',
                birthday: '05-05-2000',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
