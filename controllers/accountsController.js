const {Accounts, Users, Deals} = require('../models')

module.exports = {
    async createAccount(req, res) {
        try {
            const accountFound = await Accounts.findByPk(req.params.id)
            if (accountFound) {
                return res.send({
                    success: false,
                    error: "This account already exists"
                });


            } else {
                const account = await Accounts.create(req.body)
                return res.send({
                    success: true,
                    account
                })
            }
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })

        }
    },
    async findAllAccounts(req, res) {
        try {
            const accounts = await Accounts.findAll();
            return res.send({
                success: true,
                accounts
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async findOneAccount(req, res) {
        try {
            const account = await Accounts.findByPk(req.params.id)
            return res.send({
                success: true,
                account
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },
    async removeAccount(req, res) {
        try {
            const accountFound = await Accounts.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!accountFound) {
                return res.send({
                    success: false,
                    error: "Account not found"
                })
            }
            const removeAccount = await Accounts.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.send({
                success: true,
                removeAccount
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },
    async updateAccount(req, res) {
        try {
            const account = await Accounts.findByPk(req.params.id)
            account.name = req.body.name,
                account.website = req.body.website,
                account.industry = req.body.industry,
                account.employees = req.body.employees,
                account.annual_revenue = req.body.annual_revenue,

                account.notes = req.body.notes,


                await account.save()
            return res.send({
                success: true,
                account
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })
        }
    }
}

