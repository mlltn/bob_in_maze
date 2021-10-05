
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
        ],
        info: {
            startTime: Schema.Types.Date,
            access_code: Schema.Types.String,

        },
        feedback: {
            feedback: Schema.Types.String
        }
    },
    {
        collection: 'posts'
    });

module.exports = mongoose.model('Post', Post);