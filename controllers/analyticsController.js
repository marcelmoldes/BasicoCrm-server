const privateGuard = require("../guards/privateGuard");
const AccountsServices = require('../services/accountsService.js')
const DealsServices = require('../services/dealsService.js')
const ActivitiesServices = require('../services/activitiesService.js')
const TasksServices = require('../services/tasksService.js')

module.exports = {
    async getKpis(req, res) {
        try {
            await privateGuard(req)
            return res.send({
                success: true,
                kpis: {
                     accounts: await AccountsServices.getKpis(),
                    deals: await DealsServices.getKpis(),
                    activities: await ActivitiesServices.getKpis(),
                    tasks: await TasksServices.getKpis(),
                }
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })
        }


    }
}
