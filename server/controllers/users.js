import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser)
            return res.status(404).json({ message: "User doesn't exists."});

        if(existingUser.status === "pending") return res.status(400).json({ message: "Please verify your account to sign in." });

        const isMatch = await bcrypt.compare(password, existingUser.password);
      
        if(!isMatch)
            return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ 
            email: existingUser.email, 
            id: existingUser._id 
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            firstName: existingUser.firstName, 
            lastName: existingUser.lastName, 
            email: existingUser.email,
            token
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser)
            return res.status(400).json({ message: "User already exists." });

        if(password !== confirmPassword)
            return res.status(400).json({ message: "Password don't match." });

        const confirmationToken = crypto.randomBytes(64).toString("hex");

        // now set user password to hashed password
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword,
            confirmationCode: confirmationToken
        });

        // after creating a user. now, send a verification code to there email
        const name = `${result.firstName} ${result.lastName}`;
        sendConfirmationEmail(name, result.email, result.confirmationCode);

        res.status(201).json({ message: "Please check your inbox to verify your account." });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const verifyUserAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const verifyUser = await User.findOne({ confirmationCode: id });

        if(!verifyUser) return res.status(404);

        // update user status from pending to active
        await User.updateOne({ _id: verifyUser._id }, {$set: { status: "active" }});

        const token = jwt.sign({ 
            email: verifyUser.email, 
            id: verifyUser._id
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            firstName: verifyUser.firstName, 
            lastName: verifyUser.lastName, 
            email: verifyUser.email, 
            token
        });
    } catch(err) {

    }
}

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

const sendConfirmationEmail = async (name, email, confirmationCode) => {
    await transport.sendMail({
        from: "E-commerce",
        to: email,
        subject: "Please confirm your account",
        html: `
            <h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link.</p>
            <a href=http://localhost:3000/auth/verify/${confirmationCode}>Click here to activate</a>
        `
    });
}