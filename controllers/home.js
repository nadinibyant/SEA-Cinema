const {
    response
} = require('express');
const film = require('../models/film')
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const path = require('path');
const controllers = {}

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/signin');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        next();
    } catch (error) {
        return res.redirect('/signin');
    }
};

const tampilHome = async (req, res) => {
    const homePath = path.join(__dirname, '../views/home/home.html');
    res.sendFile(homePath)
}
controllers.tampilHome = [verifyToken, tampilHome]

const getUsername = async (req,res) =>{
    const id_user = req.session.id_user
    const foundUser = await user.findByPk(id_user)
    if (foundUser) {
        res.status(200).json({
            success: true,
            username: foundUser.username,
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Username Tidak ditemukan'
        })
    }
}
controllers.getUsername = [verifyToken, getUsername]

const allFilm = async (req,res) => {
    const foundFilm = await film.findAll()
    if (foundFilm.length > 0) {
        const datafilm = foundFilm.map((film) => ({
            id: film.id,
            title: film.title,
            description: film.description,
            release_date: film.release_date,
            poster_url: film.poster_url,
            age_rating: film.age_rating,
            ticket_price: film.ticket_price
        }))

        res.status(200).json({
            success: true,
            film: datafilm
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Belum ada data film yang ditambahkan'
        })
    }
}

controllers.allfilm = [verifyToken, allFilm]
module.exports = controllers