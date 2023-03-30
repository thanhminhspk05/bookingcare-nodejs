# Clone BookingCare.vn
The website is based on the design of bookingcare.vn and the intended use so that patients can book an appointment with a doctor. After examination, the prescription can be displayed on the patient's account
## Installation instructions
### Back-end: NodeJS 14.17.0
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
Create database name: bookingcare

#### `npx sequelize-cli db:migrate`
Create tables database

#### `npx sequelize-cli db:seed:all`
Create data users (seeder) in users table
All accounts are set password is: Tm123456

### Account Admin:
thanhminhspk01@gmail.com
thanhminhspk02@gmail.com
thanhminhspk03@gmail.com

### Account Doctor:
thanhminhspk11@gmail.com
thanhminhspk12@gmail.com
thanhminhspk13@gmail.com

### Account Patient:
thanhminhspk21@gmail.com
thanhminhspk22@gmail.com
thanhminhspk23@gmail.com

