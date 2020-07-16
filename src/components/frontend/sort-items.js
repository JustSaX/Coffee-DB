import React, { useContext, useState, useReducer} from 'react'
import { IonItem, IonReorder, IonReorderGroup, IonCheckbox, IonGrid, IonRow, IonCol,
    IonLabel, IonContent, IonButton, IonIcon, IonInput } from '@ionic/react'

import { trash, save, close, addCircle } from 'ionicons/icons'

import { overWriteFile } from '../backend/data'
import { store } from '../backend/store'


// fields is the basic array of fields that's available upon installation
/*
const fields = [
    ['Bohne', true],
    ['Röster', true],
    ['Kommentar', false]]

const fileName = 'data/beans-settings.data'
*/


export const SortItems = (fileName, type) => {

    const globalState = useContext(store)
    const { state, dispatch } = globalState
    const [tempItem, setTempItem] = useState('')
    const settingsString = 'set' + type.charAt(0).toUpperCase() + type.slice(1) + 'Settings' //returns either 'setBeansSettings' or 'setBrewsSettings' 
    
    const reducer = (myState, action) => {
        let tempArray = JSON.parse(JSON.stringify(myState))
        switch (action.type){
            case 'swap':
                return action.value
            case 'addRow':
                tempArray.push([action.itemName, true])

                return tempArray
            case 'delRow':
                
                //tempArray = JSON.parse(JSON.stringify(state))
                tempArray.splice(action.index, 1)
                return tempArray
                //return state.splice(action.index, 1)
            case 'check':
                tempArray[action.index][1] = action.checkState
                return tempArray
                //return state[action.index][1] = action.checkState
            case 'reset':
                return JSON.parse(JSON.stringify(state[type].settings))
            default:
                throw new Error()

        }
    }

    
    const [items, setItems] = useReducer(reducer, JSON.parse(JSON.stringify(state[type].settings)))

    const fileSave = async (fileName, object) => {
        await overWriteFile(fileName, object)
        dispatch({type: settingsString, value: object})

    }

    const addItem = (newItem) => {
        setItems({type: 'addRow', itemName: newItem})
        setTempItem('')
    }

    function doReorder(itemsSort, event) {
        itemsSort = event.detail.complete(itemsSort)
        setItems({type: 'swap', value: itemsSort})
    }
    const delItem = (index) => {
        setItems({type:'delRow', index:index})

    }

    const checkBox = (index, checkState) => {

        setItems({type:'check', index: index, checkState: checkState})

    }


    const displayItems = (itemsToDisplay) => {
        const result = itemsToDisplay.map((arrayItem, index) => 
            <IonItem> 
                <IonCheckbox slot='start' color='dark' checked={arrayItem[1]}
                        name={index}
                        onIonChange={ e => checkBox(e.target.name, e.detail.checked, JSON.parse(JSON.stringify(items)) )}/>
                <IonLabel>{arrayItem[0]}</IonLabel>
                <IonButton color='dark'
                            name={index}
                            onClick={ e => delItem(e.target.name, JSON.parse(JSON.stringify(items)) )}
                            > <IonIcon icon={trash}/></IonButton>
                <IonReorder slot='end'/>
            </IonItem>
            )
    return result
    }
    const toDisplay = displayItems(items)

    return (
        <IonContent>

            <IonGrid><IonRow class='ion-no-margin'>
                <IonCol class='ion-text-left'><br/>Anzeigen</IonCol>
                <IonCol class='ion-text-right'><br/>Reihenfolge</IonCol>    
            </IonRow></IonGrid>


            <IonReorderGroup disabled={false}  onIonItemReorder={ (e) => doReorder(items, e)}>
                {toDisplay}
            </IonReorderGroup>
        
        <IonItem class='ion-padding'>
            <IonInput background='dark'
                    placeholder='Feld hinzufügen'
                    onIonChange={e => setTempItem(e.detail.value)} value={tempItem}></IonInput>
            <IonButton color='dark' style={{height: '35px', width: '35px'}} 
                    onClick={() => addItem(tempItem,items)}>
                    <IonIcon icon={addCircle} style={{fontSize: '50px'}}  />
                    </IonButton>
        </IonItem>

            <IonGrid><IonRow><IonCol>
            {/* Save */}
            <IonButton color='dark'
                    class="ion-text-capitalize"
                    size='default'
                    routerLink='./Home'
                    onClick={() => {fileSave(fileName, items)}}
                    ><IonIcon icon={save} slot='start'size='large'/>Speichern</IonButton>
            </IonCol>
            <IonCol>
            {/* Cancel */}          
            <IonButton color='dark'
                    class="ion-text-capitalize"
                    size='default'
                    routerLink='./Home'
                    onClick={() => setItems({type:'reset'})}
                    ><IonIcon icon={close} slot='start' size='large'/>Abbrechen</IonButton>
            </IonCol></IonRow></IonGrid> 
        </IonContent>
          
    ) 
}