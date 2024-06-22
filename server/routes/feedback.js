const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/feedback', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Настройка Nodemailer
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lion300749@gmail.com', // замените на ваш email
                pass: 'Focus500!!!'  // замените на ваш пароль
            }
        });

        // Определение параметров письма
        let mailOptions = {
            from: email,
            to: 'lion300749@gmail.com',  // замените на ваш email
            subject: 'Обратная связь от ' + name,
            text: message
        };

        // Отправка письма
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('Сообщение отправлено: ' + info.response);
        });
    } catch (error) {
        res.status(500).send('Ошибка сервера: ' + error.toString());
    }
});

module.exports = router;