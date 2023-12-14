const {Deals, Users, Tasks} = require('../models')

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
    async removeDeal(req, res) {
        try {
            const dealFound = await Deals.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!dealFound) {
                return res.send({
                    success: false,
                    error: "Deal not found"
                })
            }
            const removeDeal= await Deals.destroy({
                where: {
                    id:req.params.id
                }
            });
            return  res.send({
                success:true,
                removeDeal
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },
    async updateDeal(req, res) {
        try {
            const deal = await Deals.findByPk(req.params.id)

                deal.deal_name = req.body.deal_name,
                deal.deal_value = req.body.deal_value,
                deal.close_date = req.body.close_date,
                deal.status = req.body.status,
                await deal.save()
            return res.send({
                success: true,
                deal
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })
        }
    }

}