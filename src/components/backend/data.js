
import { Plugins, FilesystemDirectory, FilesystemEncoding, Capacitor } from '@capacitor/core'
import { idCreator, dateCreator, timeCreator } from './idcreator'


const { Filesystem } = Plugins


const fileSettingsRead = {
  path: '',  //path  needs to be set in each function
  directory: FilesystemDirectory.External,
  encoding: FilesystemEncoding.UTF8,
}

const fileSettingsWrite= {
  path: '',  //path and data needs to be set in each function
  data: '',
  directory: FilesystemDirectory.External,
  encoding: FilesystemEncoding.UTF8,
  recursive: true    //create folders if they don't exist
}

const fileSettingsReadPicture = {
  path: '',  //path  needs to be set in each function
  directory: FilesystemDirectory.External,
}

const fileSettingsWritePicture = {
  path: '',  //path and data needs to be set in each function
  data: '',
  directory: FilesystemDirectory.External,
  recursive: true    //create folders if they don't exist
}


//************************
//Writing or storing Data
//************************


//dataset needs to be an object and not an array!
export const storeData = async (filename, dataset, photo) => {
   const id = idCreator()
   const date = dateCreator()
   const time = timeCreator()

    //const object = {[id]:dataset}
   const object = {id: id,
                  Datum: date,
                  Uhrzeit: time}
   Object.assign(object, dataset)

  await writeFile(filename, object)

  if(photo) {
    //filename contains something like data/beans.data, split will split the string into
    //[data, beans.data] and save data into path => [0] is the first element of the array created by split
    const path = filename.split('/')[0]
    const photoFilename = path +'/'+ id.toString() +'.jpeg'
    await writePhoto(photoFilename, photo)
  }

return object
} 

const writeFile = async (filename, object) => {
    let dataToWrite = JSON.stringify(object)

    // try to open the file if it exists, append if not create it
    try {
        const ret = await Filesystem.readFile({
          path: filename,
          directory: FilesystemDirectory.External
        })
        const append = await Filesystem.appendFile({
            path: filename,
            data: '\n'+ dataToWrite,
            directory: FilesystemDirectory.External,
            encoding: FilesystemEncoding.UTF8,
        })
 
      } catch (e) {

        if (e.message.includes('File does not exist')){
          const write = await Filesystem.writeFile({
              path: filename,
              data: dataToWrite,
              directory: FilesystemDirectory.External,  //set back to external!
              encoding: FilesystemEncoding.UTF8,
              recursive: true    //create folders if they don't exist
         })

        }
     }
}


//writing picture to file
const writePhoto = async (filename, photo) => {
  let fileSettingsWriteCopy = Object.assign({}, fileSettingsWritePicture) //careful shallow copy
  fileSettingsWriteCopy.path = filename
  fileSettingsWriteCopy.data = photo.dataUrl
  fileSettingsWriteCopy.encoding = 

  await Filesystem.writeFile(fileSettingsWriteCopy)
  //delete picture made by system
  try {
    let fileSettingsReadCopy = Object.assign({}, fileSettingsReadPicture) //carfeul shallow copy
    fileSettingsReadCopy.path = './Pictures'
    fileSettingsReadCopy.recursive = true
    await Filesystem.rmdir(fileSettingsReadCopy)
  } catch(e){
    console.log(e)
  }
}

//writing settings to file, if file does exist it will be overwritten
export const overWriteFile = async (filename, object) => {
 let fileSettingsWriteCopy = Object.assign({}, fileSettingsWrite) //careful shwallow copy
  fileSettingsWriteCopy.path = filename
  fileSettingsWriteCopy.data = JSON.stringify(object)

  const write = await Filesystem.writeFile(fileSettingsWriteCopy)
}

//************************
//Reading Data
//************************

// reading data from file, if file doesn't exist return false
export const readData = async (filename) => {
  let readFile = ''
  try {
  readFile = await Filesystem.readFile({
    path: filename,
    directory: FilesystemDirectory.External,
    encoding: FilesystemEncoding.UTF8
  })
} catch (e){
  return false
}
  return readFile.data
  }



//reading data from File, if file doesn't exist false will be returned
export const readSettings = async (filename) => {
  let fileSettingsReadCopy = Object.assign({}, fileSettingsRead)
  fileSettingsReadCopy.path = filename
  let readFile = ''
  try {
    readFile = await Filesystem.readFile(fileSettingsReadCopy)
  } catch(e){
    return false
  }
  return readFile.data
}



  
export const readPicture = async (filename) => {


    let fileSettingsReadCopy = Object.assign({}, fileSettingsReadPicture)
    fileSettingsReadCopy.path = filename
    
    let fileExists
    if (filename.length > 0){
      const filenameSplit = filename.split('/')
 
      const filenameNoPath = filenameSplit.pop()

      const path = filenameSplit.map( item => '/'+item)[0]
      
      const fileObj = {
        path: path,
        directory: fileSettingsReadCopy.directory
      }

      const directoryContent = await Filesystem.readdir(fileObj)

      
        fileExists = directoryContent.files.includes(filenameNoPath)
        //will return index or undefined
    }

    let readPicData
    if (fileExists){  
      try {
        readPicData = await Filesystem.getUri(fileSettingsReadCopy)

      } catch(e){

        return false
      }
      readPicData = Capacitor.convertFileSrc(readPicData.uri)
    } else readPicData = false

    return readPicData
}
