const mongoose = require("mongoose")

const LostSchema = new mongoose.Schema ({
        itemName: String,
        description: String,
        location: String ,
        contact: String,
        image : String,
        name: String

},{
        timestamps: true
}
)
module.exports = mongoose.model("losts", LostSchema)