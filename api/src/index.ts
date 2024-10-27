import express, {json, urlencoded} from 'express';
import router from "./routes/index.js";
import serverless from "serverless-http";


// dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
    res.send('Node API Version 1.0.0');
});

app.use('/api', router);

if (process.env.NODE_ENV === 'dev') {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

export const handler = serverless(app);