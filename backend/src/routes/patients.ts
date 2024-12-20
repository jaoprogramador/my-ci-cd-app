
import express from 'express';

import { toNewEntry } from '../utils';
import { v1 as uuid } from 'uuid';

import patientService from "../services/patientService";
const router = express.Router();

// Obtener pacientes sin información sensible
router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await patientService.getPatientById(id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry = toNewEntry(req.body); // Valida y parsea la entrada
    const updatedPatient = patientService.addEntry(patientId, newEntry); // Agrega la entrada
    res.json(updatedPatient); // Retorna el paciente actualizado
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// Ruta para agregar un nuevo paciente
router.post('/', (req, res) => {
  try {
    const { name, occupation, ssn, dateOfBirth, gender } = req.body;
    console.log('name',name)
    console.log('occupation',occupation)
    console.log('ssn',ssn)
    console.log('dateOfBirth',dateOfBirth)
    console.log('gender',gender)
    // Crear un nuevo paciente
    const newPatient = {
      id: uuid(),  // Genera un ID único para el paciente
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender,
      entries: []  // Inicializamos con un array vacío de entradas
    };

    // Agregar el nuevo paciente a la "base de datos" (en memoria o base de datos real)
    const addedPatient = patientService.addPatient(newPatient);

    // Responder con el paciente recién creado
    res.status(201).json(addedPatient);
  } catch (error) {
    console.log('PatienceService ERROR',error);
    res.status(500).json({ message: 'Error al agregar el paciente', error });
  }
});
export default router;