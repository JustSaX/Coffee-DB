
import React from 'react'
import { IonPage, IonCard, IonHeader, IonToolbar, IonBackButton, IonContent, IonTitle, 
    IonButtons ,IonCardContent} from '@ionic/react'

import { AddItems } from '../components/frontend/add-items'
import { brewsDataFileName } from '../components/objects/filenames'



const type = 'brews'
const fileName = brewsDataFileName


export const AddBrews =  () => {
    console.log('******************* ADD-BREWS *******************')
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                        <IonButtons slot='start'>
                           <IonBackButton defaultHref='home'/>
                        </IonButtons>
                <IonTitle>Kaffee brühen</IonTitle>
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
