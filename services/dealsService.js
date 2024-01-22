const {Deals,Accounts,Attachments,Activities,Tasks,Users, Contacts} = require("../models");
const {paginator} = require("../helpers/databaseHelper");
const {QueryTypes, Sequelize} = require("sequelize");
const sequelize = new Sequelize("basico_crm", "root", "password", {
    dialect: "mysql",
});


const include = [
    {
        model: Accounts,
        include: Users
    },
    {
        model: Activities,
        include: Users
    },
    {
        model: Tasks,
        include: [Accounts,Contacts]
    },
    Attachments,
    Users


];







module.exports = {



    async create(data) {
     return await Deals.create(data)
    },
    async findOne(options) {

        options.include = include;
        return await Deals.findOne(options);
    },
    async findAll(query) {
        return await paginator(Deals, query, ['deal_name','deal_value','close_date','status'],{
            include
        });
    },
    async findByPk(id) {
        return await Deals.findByPk(id,{
            include
        });
    },
    async getKpis(status) {
        let deals;
        if(status) {
            deals = await sequelize.query(`SELECT count(*) as count FROM deals WHERE status = '${status}'`, {type: QueryTypes.SELECT});
        } else {
            deals = await sequelize.query("SELECT count(*) as count FROM deals WHERE status IN ('pending','in_progress')", {type: QueryTypes.SELECT});
        }
        return deals[0].count
    },
    async getStats() {
        let stats = await sequelize.query(
            "SELECT SUM(deal_value) as deal_value, MONTH(created_at) as month, YEAR(created_at) as year FROM basico_crm.deals GROUP BY YEAR(created_at), month(created_at) order by YEAR(created_at), MONTH(created_at);"
        );
        stats = stats[0].map((stat) => {
            return {
                label: `${stat.month}-${stat.year}`,
                total: stat.deal_value,
            };
        });
        return {
            success: true,
            stats,
        }
    },
    async update(data, id) {
        const deal = await Deals.findByPk(id);
        Object.assign(deal, data)
        return await deal.save()
    },
    async remove(id) {
        const deal = await this.findByPk(id);
        if (!deal) {
            throw new Error("Deal not found.");
        }
        await Deals.destroy({
            where: {
                id
            }
        });
    }
}