const {
    response
} = require('express');
const film = require('../models/film')
const user = require('../models/user')
const transaction = require('../models/transaction')
const detailTransaction = require('../models/detail_transaction')
const balance = require('../models/balance')
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


const tampilBuyTicket = async (req, res) => {
    const buyPath = path.join(__dirname, '../views/ticket/buyTicket.html')
    res.sendFile(buyPath)
}
controllers.tampilBuyTicket = [verifyToken, tampilBuyTicket]

const getFilmBuy = async (req, res) => {
    const id_film = req.params.id_film

    const findFilm = await film.findByPk(id_film)
    if (findFilm) {
        const id_user = req.session.id_user
        const findUser = await user.findByPk(id_user)

        if (findUser) {
            const age = findUser.age
            if (age >= findFilm.age_rating) {
                res.status(200).json({
                    success: true,
                    film: findFilm
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Umur tidak diizinkan, pilih film yang lain'
                })
            }
        } else {
            res.redirect('/signin')
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Film Tidak Tersedia'
        })
    }
}
controllers.getFilmBuy = [verifyToken, getFilmBuy]

const numberTicket = async (req, res) => {
    const numberOfTicket = req.body.numberOfTicket
    const ticketPrice = req.params.ticketPrice
    const id = req.params.id

    if (!numberOfTicket) {
        res.status(400).json({
            success: false,
            message: 'Jumlah Tiket yang dibeli belum terisi'
        })
    } else {
        if (numberOfTicket > 6) {
            res.status(400).json({
                success: false,
                message: 'Tiket gagal ditambahkan, maksimal pembelian 6 buah tiket'
            })
        } else {
            const id_user = req.session.id_user
            const intNumberOfTicket = parseInt(numberOfTicket)
            const intTicketPrice = parseInt(ticketPrice)
            const total = intNumberOfTicket * intTicketPrice

            const findSaldo = await balance.findOne({
                where: {
                    id_user: id_user
                }
            })

            if (findSaldo) {
                const saldo = findSaldo.total_balance
                const intSaldo = parseInt(saldo)
                if (total > saldo) {
                    res.status(400).json({
                        success: 'saldo',
                        message: 'Saldo tidak cukup, silahkan isi saldo terlebih dahulu'
                    })
                } else {
                    const kuranginSaldo = intSaldo - total

                    const updateSaldo = await balance.update({
                        total_balance: kuranginSaldo
                    }, {
                        where: {
                            id_user: id_user
                        }
                    })

                    if (updateSaldo) {
                        const dataBaruTransaksi = await transaction.create({
                            id_user: id_user,
                            bayar: total,
                            total: total,
                            number_of_ticket: numberOfTicket
                        })

                        const id_transaction = dataBaruTransaksi.id_transaction
                        const dataDetailBaru = []

                        for (let index = 0; index < intNumberOfTicket; index++) {
                            const newDetail = await detailTransaction.create({
                                id_transaction: id_transaction,
                                id: id,
                                id_ticket: `ticket ${index+1}`
                            });
                            dataDetailBaru.push(newDetail);
                        }

                        if (dataBaruTransaksi && dataDetailBaru.length === intNumberOfTicket) {
                            res.status(200).json({
                                success: true,
                                message: 'Tiket berhasil ditambahkan',
                                id_transaction: id_transaction,
                                id: id
                            })
                        } else {
                            res.status(400).json({
                                success: false,
                                message: 'Tiket tidak berhasil ditambahkan'
                            })
                        }
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Saldo tidak berhasil berkurang'
                        })
                    }
                }
            } else {
                res.status(400).json({
                    success: 'saldo tidak',
                    message: 'Saldo tidak ada, silahkan isi saldo terlebih dahulu'
                })
            }
        }
    }
}
controllers.numberTicket = numberTicket

const viewSeats = async (req, res) => {
    const seatsPath = path.join(__dirname, '../views/ticket/numberSeats.html')
    res.sendFile(seatsPath)
}
controllers.viewSeats = viewSeats

const finalTicket = async (req, res) => {
    const id_ticket = req.body.id_ticket
    if (!id_ticket) {
        res.status(400).json({
            success: false,
            message: 'Silahkan pilih tiket yang ingin dipakai terlebih dahulu'
        })
    } else {

        const no_seats = req.body.no_seats
        const id_transaction = req.params.id_transaction
        const id = req.params.id

        const cariSeatsTicket = await detailTransaction.findOne({
            where: {
                id_ticket: id_ticket,
                id_transaction: id_transaction
            }
        })

        const findNoSeats = cariSeatsTicket.no_seats

        if (findNoSeats != null) {
            res.status(400).json({
                success: false,
                message: 'Tiket ini sudah dipilih nomor kursi nya'
            })
        } else {
            const findSeats = await detailTransaction.findOne({
                where: {
                    id: id,
                    no_seats: no_seats
                }
            })

            if (findSeats) {
                res.status(400).json({
                    success: false,
                    message: 'Nomor kursi tersebut sudah diambil'
                })
            } else {
                const updateSeats = await detailTransaction.update({
                    no_seats: no_seats
                }, {
                    where: {
                        id_transaction: id_transaction,
                        id: id,
                        id_ticket: id_ticket
                    }
                })

                if (updateSeats) {
                    res.status(200).json({
                        success: true,
                        message: 'Transaksi Tiket Berhasil'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Transaksi Tiket Tidak Berhasil'
                    })
                }
            }
        }


    }
}
controllers.finalTicket = finalTicket

const cancelFinal = async (req, res) => {
    const id_transaction = req.params.id_transaction
    const findTotal = await transaction.findByPk(id_transaction)
    const id_user = req.session.id_user
    if (findTotal) {
        const total = findTotal.total
        const intTotal = parseInt(total)

        const findBalance = await balance.findOne({
            where: {
                id_user: id_user
            }
        })

        if (findBalance) {
            const totalBalance = findBalance.total_balance
            const intTotalBalance = parseInt(totalBalance)

            const tambahBalance = intTotalBalance + intTotal
            const updateBalance = await balance.update({
                total_balance: tambahBalance
            }, {
                where: {
                    id_user: id_user
                }
            })

            if (updateBalance) {
                const deleteTransaction = await transaction.destroy({
                    where: {
                        id_transaction: id_transaction
                    }
                })

                if (deleteTransaction) {
                    res.status(200).json({
                        success: true,
                        message: 'Proses transaksi dihapus',
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Proses transaksi gagal dihapus'
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Tidak berhasil menambahkan saldo'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Data saldo tidak ditemukan'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Data pembayaran tidak ditemukan'
        })
    }
}
controllers.cancelFinal = cancelFinal

const getDataDetail = async (req, res) => {
    const id_transaction = req.params.id_transaction
    const findDetail = await detailTransaction.findAll({
        where: {
            id_transaction: id_transaction
        }
    })

    if (findDetail.length > 0) {
        const dataDetail = findDetail.map((detail) => ({
            id_ticket: detail.id_ticket,
        }))

        const id_ticket = dataDetail.map((ticket) => ticket.id_ticket)
        const id = dataDetail.map((film) => film.id)

        res.status(200).json({
            success: true,
            id_ticket: id_ticket,
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Transaksi tidak ditemukan'
        })
    }
}
controllers.getDataDetail = getDataDetail

const finishTransc = async (req, res) => {
    const id_transaction = req.params.id_transaction

    const foundDetail = await detailTransaction.findAll({
        where: {
            id_transaction: id_transaction,
        }
    })

    if (foundDetail.length > 0) {
        const dataDetail = foundDetail.map((detail) => ({
            id_ticket: detail.id_ticket
        }))

        const id_ticket = dataDetail.map((ticket) => ticket.id_ticket)
        console.log(id_ticket)

        let foundNoseats
        for (let index = 0; index < id_ticket.length; index++) {
            foundNoseats = await detailTransaction.findOne({
                where: {
                    id_ticket: id_ticket[index],
                    id_transaction: id_transaction
                }
            })
        }
        if (foundNoseats) {
            const no_seats = foundNoseats.no_seats
            if (no_seats == null) {
                res.status(400).json({
                    success: false,
                    message: `Masih terdapat tiket yang No kursi belum dipilih`
                })
                
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Transaksi berhasil'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Data tidak ditemukan'
            })
        }

    } else {
        res.status(400).json({
            success: false,
            message: 'Data transaksi tidak ada'
        })
    }
}
controllers.finishTransc = finishTransc

module.exports = controllers