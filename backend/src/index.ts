import express , { Request, Response }  from 'express';
import cors from "cors";
/* import {  addPatient, getPatients } from './services/patientService'; */
import diaryRouter from './routes/diaries';
import patienceRouter from './routes/patients';
import diagnoseRouter from './routes/diagnose';
//import config from './config'; 
const app = express();
app.use(express.json());
app.use(express.static('dist'))
// Configura CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({
  //origin: "http://localhost:5173"
  origin:"https://tipescriptpacienteshospital.onrender.com"
  //origin: config.frontendOrigin, 
})); 
/* app.use(express.json());
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors()) */


const PORT = 3001;

 app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});


app.use('/api/diaries', diaryRouter);
 
app.use('/api/patients', patienceRouter);
app.use('/api/diagnoses', diagnoseRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
});


app.listen(PORT, () => {
  console.log(`Server running JAO on port ${PORT}`);
});
