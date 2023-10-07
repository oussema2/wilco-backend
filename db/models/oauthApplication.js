/*!
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

const OAuthApplicationSchema = new Schema({
    resource_owner_id: { type: ObjectId},
    application_id: { type: ObjectId},
    name: { type: String},
    uid: { type: String},
    secret: { type: String},
    redirect_uri: { type: String},
    confidential: { type: Boolean, default: true},
    scopes: { type: String, default: ''},
},
{timestamps: true});

mongoose.model('OAuthApplication', OAuthApplicationSchema);
