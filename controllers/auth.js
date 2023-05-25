import bcrypt from 'bcrypt';
import jwt    from 'jsonwebtoken';

import User from '../models/User.js';

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.json({
                message: 'Такий логін вже зайнятий'
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash
        });

        const token = jwt.sign(
            { id: newUser._id, },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        await newUser.save();

        res.json({
            token,
            newUser,
            message: 'Реєстрація пройшла успішно'
        })

    } catch (error) {
        res.json({
            message: 'Сталась помилка при реєстрації користувача'
        })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                message: 'Такого користувача не існує'
            })
        }

        const isPasswordCerrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCerrect) {
            return res.json({
                message: 'Пароль неправильний'
            })
        }

        const token = jwt.sign(
            { id: user._id, },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token,
            message: 'Ви авторизовані',
        })

    } catch (error) {
        res.json({
            message: 'Сталась помилка при авторизаці'
        })
    }
}

// Get user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        // if (!user) {
        //     return res.json({
        //         message: 'Такого користувача не існує'
        //     })
        // }

        const token = jwt.sign(
            { id: user._id, },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        );

        res.json({
            user,
            token,
            message: 'Немає доступа',
        });

    } catch (error) {
        res.json({
            message: 'Сталась помилка при отримані даних про користувача'
        });
    }
}