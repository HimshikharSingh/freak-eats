const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Himshikhar1:Him13112000@cluster0.gl2vqlm.mongodb.net/freakeatsmern?retryWrites=true&w=majority'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else{
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                        
                })
            //     if (err) console.log(err);
            //     else
            //         global.food_items = data;

            })
        }

    });

}
module.exports = mongoDB;