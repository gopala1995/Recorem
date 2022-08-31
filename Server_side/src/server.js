const app = require("./index.js")

const connect = require("./config/db")

app.listen(7000, async()=>{
    await connect()
    console.log("Listening on port 7000");
})