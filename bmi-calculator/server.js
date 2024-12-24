const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/calculate', (req, res) => {
    const { weight, height, age, gender } = req.body;

    if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        return res.status(400).send('<p>Please enter valid positive numbers for weight and height.</p><a href="/">Go back</a>');
    }

    const bmi = weight / (height * height);
    let category;
    let healthTip;

    if (bmi < 18.5) {
        category = 'Underweight';
        healthTip = 'Consider a balanced diet with more calories and regular exercise.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal weight';
        healthTip = 'Maintain your current lifestyle and healthy habits.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
        healthTip = 'Incorporate regular physical activity and a balanced diet.';
    } else {
        category = 'Obesity';
        healthTip = 'Consult a healthcare provider for personalized advice and support.';
    }

    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <h1>BMI Result</h1>
                <p>Your BMI: ${bmi.toFixed(2)}</p>
                <p>Category: ${category}</p>
                <p>Health Tip: ${healthTip}</p>
                <a href="/">Go back</a>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});