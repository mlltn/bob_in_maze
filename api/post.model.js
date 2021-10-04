
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define collection and schema for Post
let Post = new Schema(
    {
        experiment: [
            {
                task_id: Schema.Types.Number,
                task_index: Schema.Types.Number,
                time_spent: Schema.Types.Number,
                slider_info: [
                    {
                        color: Schema.Types.String,
                        id: Schema.Types.Number,
                        score: Schema.Types.Number
                    }
                ],
            }
        ]
    },
    {
        collection: 'posts'
    });

module.exports = mongoose.model('Post', Post);