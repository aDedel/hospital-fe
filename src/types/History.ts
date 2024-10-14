import { DrugsEnum, type PatientsRegister } from 'hospital-lib'

export interface HistoryInterface {
  date: Date
  patientsRegister: PatientsRegister
  drugs: DrugsEnum[]
  report: PatientsRegister
}
