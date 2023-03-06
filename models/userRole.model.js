const mongoose = require('mongoose');
const UserRole = new mongoose.Schema(
    {
        userRoleValue:{ type: String, required: true },
        userRolePermissions:[{ type: String, required: true }],
        availableUsers:[{ type: String }]
    },
    {
        collection: "userRoles"
    }
)
const model = mongoose.model('userRole', UserRole);
module.exports = model;