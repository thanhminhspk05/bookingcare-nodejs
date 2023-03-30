const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bookingcare', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    query: { raw: true },
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = connectDB;
