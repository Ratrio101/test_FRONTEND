const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const feedbackRoute = require('./routes/feedback');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
connectDB();

// Проверка и создание директории 'uploads'
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/comments', require('./routes/comments'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/feedback', feedbackRoute);

app.get("/:universalURL", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).render('404'); // Отобразить шаблон 404
    } else {
      next(err); // Передать ошибку дальше
    }
  });
  

app.get("/", (req, res) => {
    res.send("Hello from Express.js backend!");
});


app.post('/api/feedback', async (req, res) => {
    const { name, email, message } = req.body;

    // Настройка транспорта для отправки почты
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
          user: 'skibchik2003@outlook.com',
          pass: 'vladok995'
      }
  });

    const mailOptions = {
        from: 'skibchik2003@outlook.com',
        to: 'lion300749@gmail.com',
        subject: 'Поварешка',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        res.status(200).send('Feedback sent successfully');
    });
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => console.log(`Сервер запущен. Порт:  ${PORT}`));