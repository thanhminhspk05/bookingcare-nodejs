# Clone BookingCare.vn

The website is based on the design of bookingcare.vn and the intended use so that patients can book an appointment with a doctor. After examination, the prescription can be displayed on the patient's account

## Installation instructions

### Back-end: NodeJS 14.17.0

#### Download and install NodeJS 14.17.0

-   Download NVM (Node Version Manager) from https://github.com/coreybutler/nvm-windows/releases
-   `nvm install 14.17.0`
-   `nvm use 14.17.0`

-   Or download from https://nodejs.org

#### `npm install`

Download node_modules to install the necessary libraries

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### Front-end: ReactJS 17.0.2

Go to https://github.com/thanhminhspk05/bookingcare-reactjs and follow the instructions

### Install RDBSM (Relational Database Management System)

Software: XAMPP (Link download: https://www.apachefriends.org/download.html)
Click START action button on Apache and MySQL service
Open http://localhost/phpmyadmin/index.php to view it in the browser.

#### Create database name: bookingcare

#### `npx sequelize-cli db:migrate`

Create tables database

#### `npx sequelize-cli db:seed:all`

Create data users (seeder) in users table

#### Account Admin:

thanhminhspk01@gmail.com

#### Account Doctor:

thanhminhspk11@gmail.com

#### Account Patient:

thanhminhspk21@gmail.com

#### All account are set password is: Tm123456

See more test account on database:
http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=bookingcare&table=users
