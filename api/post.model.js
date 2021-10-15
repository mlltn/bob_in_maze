
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Define collection and schema for Post
let Post = new Schema(
    {
        info: {
            access_code: Schema.Types.String,
            result_set: Schema.Types.String,
            start_time: Schema.Types.String,
            experiment_start_time: Schema.Types.String,
            mode: Schema.Types.Number

        },
        experiment: [
            {
                task_id: Schema.Types.Number,
                task_index: Schema.Types.Number,
                time_spent: Schema.Types.Number,
                slider_info: [
                    {
                        id: Schema.Types.Number,
                        score: Schema.Types.Number,
                        color: Schema.Types.String,
                    }
                ],
            }
        ],
        feedback: {
            feedback: Schema.Types.String
        }
    },
    {
        collection: 'posts'
    });

module.exports = mongoose.model('Post', Post);