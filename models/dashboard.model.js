
const database = require("../utils/database")
const QueryGenerator = require("../generators/query.generator")


const DashboardModel = {
  
    async getdashboard({id}) {
        let query;
        // Query generator can generate a insert query based on object we passed
        query = QueryGenerator.format("select * from meety_users as meety  join meety_users as usr on usr.parent_id = meety.id where meety.id = ?",[id])
        return await database.promise().query(query)

    }
}


module.exports = DashboardModel