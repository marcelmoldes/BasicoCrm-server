    const {Activities, Users, Deals} = require('../models')

module.exports = {
    async createActivity(req, res) {
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

    async findOneActivity(req, res) {
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
    async removeActivity(req, res) {
        try {
            const activityFound = await Activities.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!activityFound) {
                return res.send({
                    success: false,
                    error: "Activity not found"
                })
            }
            const removeActivity = await Activities.destroy({
                where: {
                    id:req.params.id
                }
            });
            return  res.send({
                success:true,
                removeActivity
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message,
            });
        }
    },
    async updateActivity(req, res) {
        try {
            const activity = await Activities.findByPk(req.params.id)

                 activity.subject = req.body.subject,
                activity.description = req.body.description,
                activity.activity_date = req.body.activity_date,
                activity.status = req.body.status,
                activity.location = req.body.location,
                activity.notes = req.body.notes,
                await activity.save()
            return res.send({
                success: true,
                activity
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })
        }

    }
}