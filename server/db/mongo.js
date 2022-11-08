const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/users").then(()=>"connect")
	.catch((error) => handleError(error));