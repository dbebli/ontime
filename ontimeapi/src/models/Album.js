import database from "../config/database";
import {Sequelize} from "sequelize";


const Album = database.define('album', {
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
    },

}, {
    freezeTableName: true,
});


export default Album;