if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )

// Set view engine to EJS
app.set('view engine', 'ejs');

const users = []
app.use(flash())
app.use(session({
    secret: 'ababbasbhdasdfjkw',
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'krisha@iu',
    database: 'scholarships',
});

// Connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
//     successRedirect: "/homepage.html",
//     failureRedirect: "/visit?error=Invalid%20username%20or%20password",
//     failureFlash: true
// }));
app.post("/login", checkNotAuthenticated, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/visit?error=" + info.message);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/homepage.html");
        });
    })(req, res, next);
});


app.post("/register",checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users); // Display newly registered in the console
        res.redirect("/visit")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User is authenticated");
        return next();
    }
    console.log("User is not authenticated");
    res.redirect("/visit");
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

//routes

app.get('/homepage.html',checkAuthenticated, (req, res) => {
    console.log("Homepage route reached");
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/visit', checkNotAuthenticated, (req, res) => {
    res.render("visit.ejs");
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs");
});

app.get('/explore', (req, res) => {
    res.render('explore', { scholarships: [] });
});

app.post('/search', (req, res) => {
    const { country, course } = req.body;
    console.log('Received country:', country);
    console.log('Received course:', course);

    let query;
    let queryParams;

    if (country === '*') {
        // If All Countries is selected query for all countries except India
        query = `SELECT * FROM info WHERE Course = ? AND Country != ?`;
        queryParams = [course, 'India'];
    } else {
        query = `SELECT * FROM info WHERE Country = ? AND Course = ?`;
        queryParams = [country, course];
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ scholarships: results });
    });
});

app.get('/view-scholarship', (req, res) => {
    const scholarshipID = req.query.id;

    const query = `SELECT * FROM info WHERE ID = ?`;
    db.query(query, [scholarshipID], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('view-scholarship', { scholarship: results[0] });
    });
});

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});