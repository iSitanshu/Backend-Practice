const mongoose = require('mongoose');

const url = "mongodb+srv://sitanshumishra18:0oAt8X4HIFcnAgLD@departmentsummary.evdmmcy.mongodb.net/KIET?retryWrites=true&w=majority&appName=DepartmentSummary"

mongoose.connect(url)
    .then((result) => {
        console.log("Database Connected..!!");
    }).catch((err) => {
        console.log(err);
    });

module.exports = mongoose;