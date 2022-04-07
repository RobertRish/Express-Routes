const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Defines reaction schema
const ReactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createAtVal => dateFormat(createAtVal, 'dddd, mmmm dS, yyyy')
    }
},
    {
        toJSON: {
            getters: true
        },
        id: false
    }

);

// Defines thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date, 'dddd, mmmm dS, yyyy')
        },
        username:
        {
            type: String,
            required: true
        },
        // Look at line below
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;