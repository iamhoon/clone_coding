const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// const data = fs.readFileSync('./database.json');
// const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tkfkd6460',
    database: 'dongbinna'
});
connection.connect();

const multer = require('multer');
const upload = multer({dest:'./upload'});

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    )


    // res.send(
    //     [
    //         {
    //         'id': 1,
    //         'image': 'https://placeimg.com/64/64/1',
    //         'name': '홍길동',
    //         'birthday': '961222',
    //         'gender': '남자',
    //         'job': '대학생'
    //       },
    //       {
    //         'id': 2,
    //         'image': 'https://placeimg.com/64/64/2',
    //         'name': '홍길',
    //         'birthday': '2222',
    //         'gender': '남자',
    //         'job': '대학생'
    //       },
    //       {
    //         'id': 3,
    //         'image': 'https://placeimg.com/64/64/3',
    //         'name': '길동',
    //         'birthday': '11111',
    //         'gender': '남자',
    //         'job': '대학생'
    //       }
    // ]);
})

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,
        (err, row, fields) => {
            res.send(rows);
        }
    );
})

app.listen(port, () => console.log(`Listening on port ${port}`));