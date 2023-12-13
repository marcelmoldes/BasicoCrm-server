    const {Activities} = require('../models')

module.exports = {
    async createActivitie(req, res) {
        try {
            const activitieFound = await Activities.findByPk(req.params.id)
            if (activitieFound) {
                return res.send({
                    success: false,
                    error: "This activitie already exists"
                });


            } else {
                const activitie = await Activities.create(req.body)
                return res.send({
                    success: true,
                    activitie
                })
            }
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })

        }
    },
    async findAllActivities(req, res) {
        try {
            const activities = await Activities.findAll();
            return res.send({
                success: true,
                activities
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

    async findOneActivitie(req, res) {
        try {
            const  activitie = await Activities.findByPk(req.params.id)
            return res.send({
                success: true,
                activitie
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },

}