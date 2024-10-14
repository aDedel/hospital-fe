import { DrugsEnum } from 'hospital-lib'

const hospitalApiService =
  import.meta.env.VITE_HOSPITAL_API_URL || 'http://localhost:7200'
const listDrugs: string[] = Object.values(DrugsEnum)

export class HospitalApiService {
  /**
   * Get patients
   */
  public async getPatients(): Promise<Record<string, number>> {
    return fetch(`${hospitalApiService}/patients`)
      .then(response => response.json())
      .then(data => {
        if (typeof data !== 'string') {
          throw new Error('Cannot get patients when calling hospital API')
        }

        return data
          .split(',')
          .reduce<Record<string, number>>((result, value) => {
            if (!result[value]) {
              result[value] = 0
            }
            result[value]++

            return result
          }, {})
      })
  }

  /**
   * Get drugs
   */
  public async getDrugs(): Promise<DrugsEnum[]> {
    return fetch(`${hospitalApiService}/drugs`)
      .then(response => response.json())
      .then(data => {
        if (typeof data !== 'string') {
          throw new Error('Cannot get drugs when calling hospital API')
        }

        return data
          .split(',')
          .filter(drug => listDrugs.includes(drug)) as DrugsEnum[]
      })
  }
}
