const express = require("express")
const app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname);
app.get('/user', (req, res) => {
    res.render('user', { name: 'Bhattjii' });
});

// app.get('/', (req, res) => {
//     res.send("<h1>Hello Bhattjii</h1>")
// });
// app.get('/about', (req, res) => {
//     res.send("<h1>About page</h1>")
// });
// app.get('/about/user', (req, res) => {
//     res.send("<h1> User page</h1>")
// });
// app.get('/about/user/:userid/book/:bookid', (req, res) => {
//     res.send(`<h1>User ID: ${req.params.userid} & Book ID: ${req.params.bookid}</h1>`);
// });
// app.get('/search', (req, res) => {
//     const Name = req.query.Name;
//     const Age = req.query.Age;
//     const City = req.query.City;
//     res.send(`<h1>search results for Name : ${Name} , Age: ${Age} , City: ${City}</h1>`);
// });

// About પેજ માટે સક્રિય રૂટ
app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>');
});
app.get('/download', (req, res) => {
    res.download('/files/shortcuts.pdf', 'Document.pdf');
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});


