const privateGuard = require("../guards/privateGuard");
const AccountsServices = require('../services/accountsService.js')
const DealsServices = require('../services/dealsService.js')
const ActivitiesServices = require('../services/activitiesService.js')
const TasksServices = require('../services/tasksService.js')

module.exports = {
    async getKpis(req, res) {
        try {
            const { tenant_id } = await privateGuard(req)
            return res.send({
                success: true,
                kpis: {
                    accounts: await AccountsServices.getKpis(tenant_id),
                    deals: await DealsServices.getKpis(tenant_id),
                    activities: await ActivitiesServices.getKpis(tenant_id),
                    tasks: await TasksServices.getKpis(tenant_id),
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
            const { tenant_id } = await privateGuard(req)
            return res.send({
                success: true,
                stats: {
                    deals: await DealsServices.getStats(tenant_id),
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
            const { tenant_id } = await privateGuard(req)
            return res.send({
                success: true,
                stats: {
                    closed_lost: await DealsServices.getKpis('closed_lost', tenant_id),
                    closed_won: await DealsServices.getKpis('closed_won', tenant_id),
                    pending: await DealsServices.getKpis('pending', tenant_id),
                    in_progress: await DealsServices.getKpis('in_progress', tenant_id),
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
