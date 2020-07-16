import React from 'react'
import {IonPage, IonContent, IonHeader, IonGrid ,IonRow,
    IonToolbar, IonTitle} from '@ionic/react'

import { SortItems } from '../components/frontend/sort-items'

import { beansDefault } from '../components/objects/default-values'
import { beansSettingsFileName } from '../components/objects/filenames'


const fileName = beansSettingsFileName  //filename übergeben
//const defaultSettings = beansDefault
const type = 'beans'

/*const fields = [
    ['Bohne', true],
    ['Röster', true],
    ['Kommentar', false]] */

export const BeansSettings = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Einstellungen Bohnen</IonTitle>
                </IonToolbar>
                <IonGrid>
                    <IonRow>Hier kann festgelegt werden, welche Felder zum Anlegen von Bohnen zur Verfügung stehen 
                        und in welcher Reihenfolge sie angezeigt werden.</IonRow>
                 </IonGrid>
            </IonHeader>
                <IonContent>
                    {SortItems(fileName, type)}
                </IonContent>
        </IonPage>
    )
}   