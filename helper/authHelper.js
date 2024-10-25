const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashpassword = async (password) => {
    try {
        const hashedpassword = await bcrypt.hash(password, saltRounds);
        return hashedpassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; 
    }
};

const comparePassword = async (password, hashedpassword) => {
    try {
        return await bcrypt.compare(password, hashedpassword);
    } catch (error) {
        console.error('Error comparing password:', error);
        throw error; 
    }
};

module.exports = { hashpassword, comparePassword };