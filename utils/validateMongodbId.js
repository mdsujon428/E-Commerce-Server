const mongoose = require('mongoose');

const validateMongoDbId = (id => {
    const isValid = mongoose.Types.ObjectId(id);
    if (!isValid) {
        throw new Error("This id not valid or not found");
    }
})

module.exports = { validateMongoDbId };