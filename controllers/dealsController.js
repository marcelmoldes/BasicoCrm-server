const {Deals} = require('../models')

module.exports = {
    async createDeal(req, res) {
        try {
            const dealFound = await Deals.findByPk(req.params.id)
            if (dealFound) {
                return res.send({
                    success: false,
                    error: "This deal already exists"
                });


            } else {
                const deal = await Deals.create(req.body)
                return res.send({
                    success: true,
                    deal
                })
            }
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })

        }
    },
    async findAllDeals(req, res) {
        try {
            const deals = await Deals.findAll();
            return res.send({
                success: true,
                deals
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async findOneDeal(req, res) {
        try {
            const  deal = await Deals.findByPk(req.params.id)
            return res.send({
                success: true,
                deal
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

}