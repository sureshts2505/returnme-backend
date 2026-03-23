const mongoose = require("mongoose")

const foundSchema = new mongoose.Schema ({
        itemName: String,
        description: String,
        location: String ,
        contact: String,
        image : String,

}, {
         timestamps: true 
}
)
module.exports = mongoose.model("founds", foundSchema)