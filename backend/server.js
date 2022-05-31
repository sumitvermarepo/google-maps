import express from 'express';
import session from 'express-session';
import { config } from './config';
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import routes from './routes/index';

const PORT = 8080;

let allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", routes);

app.use((req, res, next) => {
  const error = new Error("Not implimented");
  error.status = 501;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});