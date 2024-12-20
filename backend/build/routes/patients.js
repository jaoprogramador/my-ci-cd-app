"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import express, { Request, Response } from "express";
//import { Patient ,Entry } from '../models/Patient';
//import { Patient } from "../types";
/* import { Entry } from "../types";

import toNewEntry from "../utils/toNewEntry"; */
const utils_1 = require("../utils");
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
// Obtener pacientes sin información sensible
router.get('/', (_req, res) => {
    res.json(patientService_1.default.getNonSensitivePatients());
});
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const patient = yield patientService_1.default.getPatientById(id);
        if (patient) {
            res.json(patient);
        }
        else {
            res.status(404).json({ message: 'Patient not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
router.post('/:id/entries', (req, res) => {
    try {
        const patientId = req.params.id;
        const newEntry = (0, utils_1.toNewEntry)(req.body); // Valida y parsea la entrada
        const updatedPatient = patientService_1.default.addEntry(patientId, newEntry); // Agrega la entrada
        res.json(updatedPatient); // Retorna el paciente actualizado
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
// Endpoint para agregar una entrada a un paciente
/* router.post('/:id/entries', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, date, type, diagnosisCodes, ...rest } = req.body;

  try {
    // Buscar al paciente
    const patient = await findPatientById(id);
    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    // Validar y transformar la entrada
    const newEntry = toNewEntry({ description, date, type, diagnosisCodes, ...rest });

    // Agregar la nueva entrada al paciente
    patient.entries.push(newEntry);
    await patient.save();

    // Responder con la nueva entrada
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Datos inválidos o problema al agregar la entrada' });
  }
});
router.post("/:id/entries", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const patient = patientService.getPatientById(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const newEntry = toNewEntry(req.body);

    // Generar un ID único para la nueva entrada
    const entryWithId: Entry = {
      ...newEntry,
      id: Math.random().toString(36).substring(7), // Usa una librería como uuid si es necesario
    };

    patient.entries.push(entryWithId);

    return res.status(201).json(entryWithId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding entry:", error.message);
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: "An unknown error occurred" });
  }
});*/
// Middleware para encontrar al paciente por ID
/* const findPatientById = async (id: string): Promise<Patient | null> => {
  const patient = await Patient.findById(id);
  return patient;
}; */
exports.default = router;
