import React, { useContext } from 'react'

import { IonPage, IonCard, IonCardHeader, IonHeader, IonToolbar, 
    IonBackButton, IonContent, IonTitle, IonButtons,
     IonCardContent, IonLabel, IonItem, IonFab, IonFabButton, IonIcon, IonImg} from '@ionic/react'

import { add } from 'ionicons/icons'

import { beansDataFileName } from '../components/objects/filenames'

import { store } from '../components/backend/store'

//onst dataFileName = beansDataFileName

export const ShowBeans = () => {

    const globalState = useContext(store)
    const { state } = globalState


    const data = state.beans.data
    const settings = state.beans.settings
    const  picArray = state.beans.pics

let res2
if(picArray.length > 0 && data.length > 0){
    const data2 = JSON.parse(JSON.stringify(data))
    data2.sort((a, b) => b.id - a.id)
    res2 = data2.map((row, index1) =>
         
        <IonCard>

            {settings.filter(setting => setting[1] === true).map((setting, index2) =>
            <> 

            { (index2 === 0) ?
            <IonCardHeader> 
                <IonLabel>{setting[0]}:</IonLabel>
                <IonLabel color='dark'> <h1>{row[setting[0]]}</h1> </IonLabel>
                <IonItem lines='none'>
                {picArray[0][row.id] ?
                    <IonImg style={{height: '200px'}} src={picArray[0][row.id]}/>
                    :
                    <IonImg style={{height: '50px'}} src= '../../../assets/icon/Coffee-beans.png'/>
                    }
                </IonItem>
            </IonCardHeader>

            : <>
                <IonCardContent>
                        <IonLabel>{setting[0]}:</IonLabel>
                        <IonLabel color='dark'> <h2>{row[setting[0]]}</h2> </IonLabel>

                </IonCardContent>
            </>}               
            </>)}
            <IonCardContent>   
                <IonLabel>{Object.keys(row)[1]}: {row[Object.keys(row)[1]]}</IonLabel>
            </IonCardContent>
        </IonCard>
    )
}
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                        <IonButtons slot='start'>
                           <IonBackButton defaultHref='home'/>
                        </IonButtons>
                <IonTitle>Bohnen anzeigen</IonTitle>
                </IonToolbar>
                </IonHeader>
            <IonContent>
                <IonFab vertical='top' horizontal='center' slot='fixed'>
                    <IonFabButton color='dark' routerLink='./Add-beans'>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                {res2}
            </IonContent>
        </IonPage>
    )
}