import { useContext, useEffect} from 'react'

import { readData, readSettings, readPicture } from './data'
import { beansDefault, brewsDefault } from '../objects/default-values'
import { beansSettingsFileName, beansDataFileName, brewsSettingsFileName, brewsDataFileName  } from '../objects/filenames'
import { createTable } from '../frontend/create-table.js'
import { store } from './store'

export const LoadData = () => {
    const globalState = useContext(store)
    const {state, dispatch } = globalState
   //let isLoaded = false 

    let beansSettings
    let brewsSettings
    let beansData
    let brewsData
    let beansPics = []
    let brewsPics = []
    
    const folder = beansDataFileName.split('/')[0]

    
    useEffect( () => {

    const loadAsync = async () => {

        // Settings Beans
        const beansSettingsRaw = await readSettings(beansSettingsFileName)
        
        if (beansSettingsRaw) {
            beansSettings = JSON.parse(beansSettingsRaw)
        } else {
            beansSettings = beansDefault
        }
        
        // Settings Brews
        const brewsSettingsRaw = await readSettings(brewsSettingsFileName)
        
        if (brewsSettingsRaw) {
          brewsSettings = JSON.parse(brewsSettingsRaw)
        } else {
          brewsSettings = brewsDefault
          
        }

        // Data Beans
        const rawDataBeans = await readData(beansDataFileName)
        if (rawDataBeans) {
          beansData = createTable(rawDataBeans)
        } else {
          beansData = []
        }
        // Data Brews
        const rawDataBrews = await readData(brewsDataFileName)
       if (rawDataBrews) { 
          brewsData = createTable(rawDataBrews)
        } else {
          brewsData = []
        }

        // Pics Beans
        if(beansData.length > 0){  // I need an else here
          let tempBeansPics = {}
          for (let i=0; i<beansData.length; i++){
            const temp = await readPicture(folder + '/' + beansData[i].id.toString() + '.jpeg')

            tempBeansPics[beansData[i].id]=temp

          }
          if(Object.keys(tempBeansPics).length > 0){
            beansPics.push(tempBeansPics)
          }
        } else {
          beansPics.push({})
        }
        // Pics Brews
        if(brewsData.length > 0){
          let tempBrewsPics = {}
          for (let i=0; i<brewsData.length; i++){
            const temp = await readPicture(folder + '/' + brewsData[i].id.toString() + '.jpeg')
            tempBrewsPics[brewsData[i].id]=temp

          }

          if(Object.keys(tempBrewsPics).length > 0){
            brewsPics.push(tempBrewsPics)

          }
        } else {
          brewsPics.push({})
        }

        //isLoaded = true
        
        dispatch({type: 'setBeansSettings', value: beansSettings})
        dispatch({type: 'setBeansData', value: beansData})
        dispatch({type: 'setBeansPics', value: beansPics})

        dispatch({type: 'setBrewsSettings', value: brewsSettings})
        dispatch({type: 'setBrewsData', value: brewsData})
        dispatch({type: 'setBrewsPics', value: brewsPics})
    }
    loadAsync() 

} , [])
}


