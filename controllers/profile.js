const {
    response
} = require('express')
const user = require('../models/user')
const jwt= require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcrypt')
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

const viewProfile = async(req,res) => {
    res.render('profile/profile');
}
controllers.viewProfile = [verifyToken,viewProfile]

const getDataProfile = async (req,res) => {
    const id_user = req.session.id_user
    const foundUser = await user.findByPk(id_user)
    if (foundUser) {
        res.status(200).json({
            success: true, 
            data: {
                username: foundUser.username,
                name: foundUser.name,
                age: foundUser.age
            }
        })
    } else {
        res.status(400).json({
            success: false, 
            message: 'Pengguna tidak ditemukan'
        })
    }
}
controllers.getDataProfile = getDataProfile

const viewEdit = async (req,res) => {
    res.render('profile/editProfile');
}
controllers.viewEdit = [verifyToken, viewEdit]

const editProfile = async (req,res) => {
    const id_user = req.session.id_user

    const foundUser = await user.findByPk(id_user)
    const usernameAsli = foundUser.username
    const nameAsli = foundUser.name
    const ageAsli = foundUser.age

    const username = req.body.username || usernameAsli
    const age = req.body.age || ageAsli
    const name = req.body.name || nameAsli

    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword

    if (newPassword == '' && oldPassword == '') {
        if (!username || !age || !name) {
            res.status(400).json({
                success: false,
                message: 'Data belum lengkap, isi kembali'
            })
        } else {
            if (username.length < 15) {
                res.status(400).json({
                    success: false,
                    message: 'Usernam kurang dari 15 karakter, tuliskan kembali (harus >= 15)'
                })
            } else {
                const cariUsername = await user.findOne({
                    where:{
                        username: username
                    }
                })

                if (cariUsername && cariUsername.username !== usernameAsli) {
                    res.status(400).json({
                        success: false, 
                        message: 'Username sudah terdaftar'
                    })
                } else {
                    const updateData = await user.update({
                        username: username,
                        age: age,
                        name: name
                    },{
                        where:{
                            id_user: id_user
                        }
                    })

                    if (updateData) {
                        res.status(200).json({
                            success:true, 
                            message:'Data berhasil diubah',
                            data: updateData
                        })
                    } else {
                        res.status(400).json({
                            success: false, 
                            message:'Data tidak berhasil diubah'
                        })
                    }
                }
            }
        }
    } else {
        if (!username || !name || !age || !newPassword || !oldPassword) {
            res.status(400).json({
                success: false,
                message: 'Data tidak lengkap, isikan lengkap'
            })
        } else {
            const passwordAsli = foundUser.password

            const salt = bcrypt.genSaltSync(10);
            const passwordMatch = bcrypt.compareSync(oldPassword, passwordAsli);

            if (username.length < 15) {
                res.status(400).json({
                    success:false,
                    message:'Karakter username harus lebih dari 15'
                })
            } else {
                const findUsername = await user.findOne({
                    where:{
                        username: username
                    }
                })

                if (findUsername && findUsername.username != usernameAsli) {
                    res.status(400).json({
                        success: false,
                        message: 'Username sudah digunakan'
                    })
                } else {
                    if (passwordMatch) {
                        const hashedPasswordBaru = bcrypt.hashSync(newPassword, salt)
                        const updateProfile = await user.update({
                            username: username,
                            age: age,
                            name: name,
                            password: hashedPasswordBaru
                        }, {
                            where:{
                                id_user:id_user
                            }
                        })

                        if (updateProfile) {
                            res.status(200).json({
                                success: 'benar',
                                message: 'Data berhasil diubah'
                            })
                        } else {
                            res.status(400).json({
                                success: 'salah',
                                message: 'Data tidak berhasil diubah'
                            })
                        }
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Password lama salah'
                        })
                    }
                }
            }
        }
    }
}
controllers.editProfile = editProfile

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: 'Gagal logout',
            });
        }

        res.clearCookie('sessionID');
        return res.status(200).json({
            success: true,
            message: 'Logout berhasil',
        });
    });
}

controllers.logout = [verifyToken, logout]

module.exports = controllers