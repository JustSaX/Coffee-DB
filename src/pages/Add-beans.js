//import './My-Style.css'

import React from 'react'
import { IonPage, IonCard, IonHeader, IonToolbar, IonBackButton, IonContent, IonTitle, IonButtons,
     IonCardContent} from '@ionic/react'


import { AddItems } from '../components/frontend/add-items'

import { beansDataFileName } from '../components/objects/filenames'

const type = 'beans'
const fileName = beansDataFileName


export const AddBeans =  () => {
    console.log('******************* ADD-BEANS1 *******************')
    //fileSettingsRead()
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                        <IonButtons slot='start'>
                           <IonBackButton defaultHref='home'/>
                        </IonButtons>
                <IonTitle>Bohne anlegen</IonTitle>
                </IonToolbar>
                </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardContent>
                        {AddItems(fileName, type)}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}
