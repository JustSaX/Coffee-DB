import React, {useState, useEffect, useContext } from 'react'

import { IonLabel, IonItem, IonInput, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonImg, IonSelect, IonSelectOption} from '@ionic/react'

import { trash, save, camera, cameraReverse} from 'ionicons/icons'

import { storeData, readPicture } from '../backend/data'
import { store } from '../backend/store'


import { useCamera, availableFeatures } from '@ionic/react-hooks/camera';
import { CameraResultType } from '@capacitor/core'


export const AddItems = (fileName, type) => {
    console.log('******************* ADD-ITEMS *******************')
    const globalState = useContext(store)
    const { state, dispatch } = globalState

    const [newArray, setNewArray] = useState(state[type].settings.map((arrayItem, index) => arrayItem.concat([index, ''])))
    

    const dataString = 'set' + type.charAt(0).toUpperCase() + type.slice(1) + 'Data' //returns either 'setBeansData' or 'setBrewsData'
    const pictureString = 'set' + type.charAt(0).toUpperCase() + type.slice(1) + 'Pics'

    // example of arrray ['Bean', true, 0, '']
    // => Bean is the field title; true if it should be displayed; 0 is the index; '' will be filled with content eg. Malabar 

    const [inputValues, setInputValues] = useState(JSON.parse(JSON.stringify(newArray)) )

    let { photo, getPhoto } = useCamera();
    const  [ myPhoto, setMyPhoto ] = useState(photo)

    const handleTakePhoto = async () => {
        if(availableFeatures.getPhoto) {
            const pic = await  getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            height: 1000
            })
        }
    }

    useEffect(() => setMyPhoto(photo), [photo])

    const delFunc = () => {

        setInputValues(inputValues.map(arrayItem => arrayItem.splice(0,3).concat([''])))

        setMyPhoto(undefined)

    }

    const saveIt = async (fileName, array, photo, type) => {

        // https://stackoverflow.com/questions/42974735/create-object-from-array
        const objectToSave = array.reduce(( o, arrayItem) => ({...o, [arrayItem[0]]:arrayItem[3] }) , {})
        const objectWithID = await storeData(fileName, objectToSave, photo)
        
        state[type].data.push(objectWithID)
        dispatch({ type: dataString, value: state[type].data})

        console.log('objwithid',objectWithID)
        console.log('STATE', state)
        console.log('pic state', state[type].pics[0])
        if(photo){      //if no picture is done photo will be undefined
            const folder = fileName.split('/')[0]
            const pathToPhoto = await readPicture(folder + '/' + objectWithID.id.toString() + '.jpeg')

            if(pathToPhoto){
                state[type].pics[0][objectWithID.id]=pathToPhoto
            }
        } else {
            state[type].pics[0][objectWithID.id]=false
        }
        dispatch({type: pictureString, value: state[type].pics})

        delFunc()
    }

    const result = inputValues.filter(arrayItem => arrayItem[1])
                        .map((arrayItem) =>  {
        if (type==='brews' &&  state.beans.settings.filter( line => (line[0] === arrayItem[0]) && line[1] ).length > 0 && arrayItem[0] !== 'Kommentar') {

            return (
                <IonItem>
                    <IonLabel position='stacked' color='medium'><h1>{arrayItem[0]}:</h1></IonLabel>
                    <IonSelect 
                name={arrayItem[0]}
                id={arrayItem[2]}
                value={arrayItem[3]}
                onIonChange={ e => {inputValues[e.target.id][3]=e.detail.value; setInputValues(inputValues); console.log(inputValues)}}>
                        {
                            state.beans.data.filter(line => line[arrayItem[0]] !=='' && line[arrayItem[0]] !== undefined).map(line => 
                                <IonSelectOption value={line[arrayItem[0]]}>{line[arrayItem[0]]}</IonSelectOption>)
                        } 

                    </IonSelect>
                </IonItem>
            )
        } else {
            return(
        <IonItem>
            <IonLabel position='stacked' color='medium'><h1>{arrayItem[0]}:</h1></IonLabel>
            <IonInput 
                name={arrayItem[0]}
                id={arrayItem[2]}
                value={arrayItem[3]}
                onIonChange={ e => {inputValues[e.target.id][3]=e.detail.value; setInputValues(inputValues); console.log(inputValues)}}
            ></IonInput>

        </IonItem> )}  
        })
    return(<>
    <IonGrid>
        <IonRow>
            <IonCol>
            { myPhoto && <IonImg height='200px' src={myPhoto.dataUrl} />}
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
            <IonButton color='dark'
                onClick={() => handleTakePhoto()}>
                <IonIcon slot='icon-only' src={myPhoto ? cameraReverse : camera}/>
            </IonButton>
            </IonCol>
        </IonRow>
    </IonGrid>
    {result}
    <IonGrid>
        <IonRow>
            <IonCol>
                <IonButton color='dark'
                        routerLink='./Show-beans'
                        onClick={() => saveIt(fileName, inputValues, myPhoto, type)} >
                    <IonIcon icon={save} slot='icon-only'/>
                </IonButton>
            </IonCol>
            <IonCol>
            <IonButton color='dark'
                onClick={ () => delFunc()}>
                    <IonIcon icon={trash} slot='icon-only'/>
                </IonButton>
            </IonCol>
        </IonRow>
    </IonGrid>
    </>
    )
}
