import Category from "../models/Category";
import Song from "../models/Song";

class CategoryController {
    /***
     * Create Category into Database
     * @param req
     * @param res
     * @returns {Promise<*>}
     */


    static async findAll(req, res) {
        let status = 200;
        let body = {};
        try {
            await Category.sync();

            const categories = await Category.findAll();

            body = {
                categories,
                'message': "200"
            }
        } catch (error) {
            status = 500;
            body = {'message': error.message}
        }

        return res.status(status).json(body);
    }
}


export default CategoryController