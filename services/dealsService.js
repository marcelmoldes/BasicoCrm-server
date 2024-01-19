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
    async getKpis() {
        const deals = await sequelize.query("SELECT count(*) as count FROM `deals` WHERE status != 'complete'", { type: QueryTypes.SELECT });
        return deals[0].count
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