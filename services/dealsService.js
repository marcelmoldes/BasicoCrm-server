const {Deals,Accounts,Attachments,Activities,Tasks,Users} = require("../models");
const {paginator} = require("../helpers/databaseHelper");

const include = [
    Accounts,
    Attachments,
    Activities,
    Tasks,
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