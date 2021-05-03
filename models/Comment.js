const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.STRING,
            references: {
                model: 'User',
                key: 'name',
            },
        },


    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post',
    }
);

module.exports = Comment;