import patients from "../data/patients";
import { NewPatient , Patient, Entry,NewEntry , NonSensitivePatient  } from "../types";
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    entries,
    occupation,
  }));
};



// Función para obtener todos los pacientes
export const getPatients = (): Patient[] => {
  return patients;
}; 

// Función para agregar un nuevo paciente
export const addPatient = (newPatient: NewPatient): Patient => {
  const patientWithId = { 
    id: uuid(),  // Genera un ID único para el paciente
    ...newPatient,  // Propaga los datos del nuevo paciente (sin el id)
    entries: []  // Inicializamos el array de entradas vacío
  };

  patients.push(patientWithId);  // Agrega el nuevo paciente al array
  return patientWithId;  // Retorna el paciente recién agregado
};

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};
const addEntry = (id: string, entry: NewEntry): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }

  const newEntry: Entry = {
    ...entry,
    id: uuid()// Genera un ID único para la entrada
  };

  patient.entries.push(newEntry);
  return patient;
};


export default {
  getNonSensitivePatients,addEntry ,addPatient,getPatientById
};
