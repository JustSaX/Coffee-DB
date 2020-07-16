import { readPicture } from '../backend/data'

// createTable returns an array containing per line an object with the stored data
// e.g. [{id:51346431, date:02.01.2020}]
export const createTable = (stringData) => {

    const stringArray = stringData.split('\n')

    //const header = Object.keys(JSON.parse(stringArray[0]))  // array from all the keys
    let tableData = []

    for (let i = 0; i < stringArray.length; i++){
      tableData.push(JSON.parse(stringArray[i]))   
    }
    return tableData  
  }

export const picData = async (array, filename) => {

    const folder = filename.split('/')[0]

   const picArray = []
   const createPicArray = async () => {
       for (let i=0; i<array.length; i++){
           const temp = await readPicture(folder + '/' + array[i].id.toString() + '.jpeg')
           picArray.push(temp)

       }
   }
  createPicArray()
 return picArray
}
