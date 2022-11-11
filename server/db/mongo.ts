import mongoose from "mongoose";

mongoose
	.connect("mongodb://localhost:27017/users").then(()=>"connect")
	.catch((error) => handleError(error));

function handleError(error: any): any {
	console.error(error);
}
