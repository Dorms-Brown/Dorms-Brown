const express = require("express")
const cors = require("cors")
const app = express()   
const port = 8080

app.use(express.json())
app.use(cors())
app.use(require("./routes/routes.js"));

app.listen(port, () => console.log(`Server has started on port: ${port}`))