"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import diaryData from '../data/diaryentries.json'
const diaries_1 = __importDefault(require("../data/diaries"));
//const diaries: DiaryEntry[] = diaryData;
//const diaries: DiaryEntry[] = diaryData as DiaryEntry[];
const getEntries = () => {
    return diaries_1.default;
};
const getNonSensitiveEntries = () => {
    return diaries_1.default.map(({ id, date, description, specialist }) => ({
        id,
        date,
        description,
        specialist
    }));
};
/* const addEntry = (
  date: string, weather: Weather, visibility: Visibility, comment: string
): DiaryEntry => { */
const addDiary = (entry) => {
    const newDiaryEntry = Object.assign({ 
        //id: Math.max(...diaries.map(d => d.id)) + 1,
        id: String(Math.floor(Math.random() * 10000)) }, entry);
    console.log('diaryService addDiary', newDiaryEntry);
    diaries_1.default.push(newDiaryEntry);
    return newDiaryEntry;
};
/* const newDiaryEntry = {
  id: Math.max(...diaries.map(d => d.id)) + 1,
  date,
  weather,
  visibility,
  comment,
}

diaries.push(newDiaryEntry);
return newDiaryEntry;
}; */
const findById = (id) => {
    //const entry = diaries.find(d => d.id === id);
    const entry = diaries_1.default.find(d => String(d.id) === String(id));
    return entry;
};
exports.default = {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};
