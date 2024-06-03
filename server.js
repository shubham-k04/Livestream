const app = require("./app/app");

app.listen({ port: 8000 }, (err, address) => {
    if(err){
        console.log(err);
        process.exit(1);
    }

    console.info(`Server is running on: ${address}`);
});