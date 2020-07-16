import React from 'react'
import {IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow} from '@ionic/react'

import { SortItems } from '../components/frontend/sort-items'


import { brewsSettingsFileName } from '../components/objects/filenames'


const fileName = brewsSettingsFileName  //filename übergeben
const type = 'brews'



export const BrewsSettings = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Einstellungen Brühungen</IonTitle>
                </IonToolbar>
                <IonGrid>
                    <IonRow>Hier kann festgelegt werden, welche Felder zum Anlegen von Brühungen zur Verfügung stehen
                        und in welcher Reihenfolge sie angezeigt werden.</IonRow>
                </IonGrid>
            </IonHeader>
                
                <IonContent>
                    {SortItems(fileName, type)}

                </IonContent>
        </IonPage>
    )
}   