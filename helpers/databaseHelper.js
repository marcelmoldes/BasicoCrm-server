const {Op} = require("sequelize");

module.exports = {
    async paginator(model, query) {

        const {
            searchString = false,
            recordsPerPage = 10,
            pageNumber = 1,
            sortBy = 'created_at',
            sortOrder = 'desc'
        } = query;

        const options = {
            limit: +recordsPerPage,
            offset: recordsPerPage * (pageNumber - 1),
            order: [
                [sortBy, sortOrder],
            ]
        };
        const searchFields = ['first_name', 'last_name', 'email'];
        if(searchString) {
            const where = {}
            for (const field of searchFields) {
                where[field] = {
                    [Op.like]: `%${searchString}%`
                }
            }
            if (!options.where) {
                options.where = {}
            }
            options.where[Op.or] = where;
        }

        const records = await model.findAll(options);

        const totalRecords = await model.count({
            where: options.where ? options.where : null
        });

        const toRecord = options.offset + +recordsPerPage;

        const pagination = {
            totalRecords,
            totalPages: Math.ceil(totalRecords / recordsPerPage),
            currentPage: +query.pageNumber,
            fromRecord: options.offset + 1,
            toRecord: toRecord > totalRecords ? totalRecords : toRecord,
        }

        return {
            records,
            pagination
        }
    }
}