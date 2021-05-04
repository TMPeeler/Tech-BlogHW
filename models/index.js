// require models 
// define relationships
//export models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'

});

Post.belongsTo(User, {
    foreignKey: 'userId'

});

Post.hasMany(Comment, {
    // through: User,
    foreignKey: 'post_id'

});

Comment.belongsTo(User, {
    foreignKey: 'userId'

});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'

});

module.exports = { User, Post, Comment };



