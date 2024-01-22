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
    },
    async getStats(req, res) {
        try {
            await privateGuard(req)
            return res.send({
                success: true,
                stats: {
                    deals: await DealsServices.getStats(),

                }
            })
        } catch (error) {
            return res.send({
                success: false,
                error: error.message
            })
        }
    },
    async getFunnelStats(req, res) {
        try {
            await privateGuard(req)
            return res.send({
                success: true,
                stats: {
                    closed_lost: await DealsServices.getKpis('closed_lost'),
                    closed_won: await DealsServices.getKpis('closed_won'),
                    pending: await DealsServices.getKpis('pending'),
                    in_progress: await DealsServices.getKpis('in_progress'),
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
