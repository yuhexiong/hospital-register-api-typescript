import cors from 'cors';
import * as dotenv from "dotenv";
import express, { Express } from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { AppDataSource } from "../dataSource";
import swaggerOption from "./config/swagger";
import { responseHandler } from "./middlewares/errorHandling";
import PatientRouter from './routers/patientRouter';

dotenv.config({ path: __dirname + '/.env' });

const port = process.env.PORT ?? 7777;
const app: Express = express();
app.use(express.json());
expressJSDocSwagger(app)(swaggerOption);

app.use(cors());

const mountApiRouters = (mountPath: string, app: express.Express) => {
  app.use(mountPath, new PatientRouter().expressRouter())
}

mountApiRouters('', app);

app.use(responseHandler);

async function main() {
  await AppDataSource.initialize();
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });

}

main();