"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientById = exports.getPatients = void 0;
// src/services/patientService.ts
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        entries,
        occupation,
    }));
};
// Función para obtener todos los pacientes
const getPatients = () => {
    return patients_1.default;
};
exports.getPatients = getPatients;
/* const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),  // Genera un ID único para el nuevo paciente
    ...entry,     // Propaga los datos del nuevo paciente (sin el id)
    entries: []   // Inicializamos el array de entradas vacío
  };

  patients.push(newPatient);  // Agrega el nuevo paciente a la lista
  return newPatient;  // Retorna el paciente recién agregado
}; */
const getPatientById = (id) => {
    return patients_1.default.find(patient => patient.id === id);
};
exports.getPatientById = getPatientById;
const addEntry = (id, entry) => {
    const patient = patients_1.default.find(p => p.id === id);
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`);
    }
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)() // Genera un ID único para la entrada
     });
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getNonSensitivePatients, /* addPatient */ addEntry, getPatientById: exports.getPatientById
};
