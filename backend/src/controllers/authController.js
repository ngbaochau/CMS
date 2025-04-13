import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendConfirmationEmail from '../utils/sendConfirmationEmail.js';
import UserModel from '../models/User.js';
import AppRoleModel from '../models/AppRole.js';
import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const User = UserModel(sequelize, DataTypes);
const AppRole = AppRoleModel(sequelize, DataTypes);

export const registerUser = async (req, res) => {
    const { username, password, email, phone, fullName, address } = req.body;

    try {
        const existingUser = await User.findOne({ where: { UserName: username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            UserName: username,
            Password: hashedPassword,
            Email: email,
            Phone: phone,
            AppRoleID: req.roleId,
            FullName: fullName,
            Address: address,
            IsActive: false, 
        });

        const token = jwt.sign({ userId: newUser.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });

        try {
            await sendConfirmationEmail(email, token);
        } catch (emailError) {
            return res.status(500).json({ message: 'Error sending confirmation email.' });
        }
        return res.status(200).json({
            message: 'Registration successful! Please check your email to confirm your account.',
        });

    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ message: 'Error processing registration.' });
    }
};

export const confirmAccount = async (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).send('Missing token.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (user.IsActive) {
            return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-success`);
        }

        user.IsActive = true;
        await user.save();

        return res.redirect(`${process.env.FRONTEND_URL}/auth/verify-success`);
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(400).send('Confirmation link is invalid or has expired.');
    }
};
