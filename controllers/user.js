const user = require('../models/user')
const {
    response
} = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const controllers = {}

const signup = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const age = req.body.age

    if (!username || !password || !name || !age) {
        res.status(400).json({
            success: false,
            message: 'Data belum lengkap, silahkan isi kembali!'
        })
    } else {

        if (username.length < 15) {
            res.status(400).json({
                success: false,
                message: 'Username harus terdiri 15 karakter atau lebih'
            })
        } else {
            const cariUsername = await user.findOne({
                where: {
                    username: username
                }
            })

            if (cariUsername) {
                res.status(400).json({
                    success: false,
                    message: 'Username sudah terdaftar, isikan username lain!'
                })
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, salt);

                const dataBaru = await user.create({
                    username: username,
                    password: hashedPassword,
                    name: name,
                    age: age
                })

                if (dataBaru) {
                    res.status(200).json({
                        success: true,
                        message: 'Registrasi Berhasil',
                        data: {
                            username: username,
                            password: hashedPassword,
                            name: name,
                            age: age
                        }
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Registrasi tidak berhasil'
                    })
                }
            }
        }

    }
}

controllers.signup = signup

const signin = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (!username || !password) {
            res.status(400).json({
                success: false,
                message: 'Login tidak berhasil, isikan data dengan lengkap'
            })
        } else {
            const cari = await user.findOne({
                where: {
                    username: username
                }
            })

            if (cari) {
                bcrypt.compare(password, cari.password, async (err, result) => {
                    if (err || !result) {
                        res.status(400).json({
                            success: false,
                            message: 'Password salah'
                        })
                    } else {
                        const token = jwt.sign({
                                id_user: cari.id_user,
                                username
                            },
                            process.env.ACCESS_TOKEN_SECRET, {
                                expiresIn: '2h'
                            }
                        );

                        req.session.id_user = cari.id_user

                        res.cookie('token', token, {
                            httpOnly: true, 
                            maxAge: 2 * 60 * 60 * 1000, 
                        });

                        res.status(200).json({
                            success: true,
                            message: 'Login Berhasil',
                            token: token,
                            id_user: req.session.id_user
                        })
                    }
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Username Salah'
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Login tidak berhasil'
        })
    }
}
controllers.signin = signin

module.exports = controllers