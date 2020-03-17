var mongoose = require("mongoose").set("debug", true);

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect("db_url", options, function(err) {
  console.log(err);
});
