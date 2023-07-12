import express, { Request, Response } from "express";
import Song from "./models/Song";
import Artist from "./models/Artist";
import indexRoute from "./routes/index";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json({ type: "*/*" }));

const PORT = 3000;


app.use("/api/v1", indexRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});





