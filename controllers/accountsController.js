const {Accounts} = require('../models')

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

}