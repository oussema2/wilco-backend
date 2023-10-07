/*!
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

const OAuthAccessTokenSchema = new Schema({
    resource_owner_id: { type: ObjectId},
    application_id: { type: ObjectId},
    refresh_token:  { type: String}, 
    token: { type: String},
    expires_in: { type: String},
    revoked_at: { type: String},
    scopes: { type: String, default: ''},
},
{timestamps: true});

mongoose.model('OAuthAccessToken', OAuthAccessTokenSchema);
