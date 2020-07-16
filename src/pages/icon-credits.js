import React from 'react'

import { IonPage, IonCard, IonHeader, IonToolbar, IonBackButton, IonContent, IonTitle, IonButtons,
    IonCardContent,
    IonCardHeader,
    IonCardTitle} from '@ionic/react'

export const Credits = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot='start'>
                           <IonBackButton defaultHref='home'/>
                </IonButtons>
                <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Credits für Icons und Bilder</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Vielen Dank an folgende Künstler die Bilder und Icons umsonst zur Verfügung gestellt haben:<br/>
                        - <a href="http://www.freepik.com">Designed by coolvector / Freepik</a><br/>
                        - Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a><br/>
                        - <a href="https://ionicons.com/">Designed by Ionic Framework team</a><br/>
                        - <a href="http://www.freepik.com">Designed by dooder / Freepik</a>
                        
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                    <IonCardTitle>Framework</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Coffee DB wurde mit dem <a href='https://ionicframework.com'>Ionic  React Framework</a> erstellt.
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                    <IonCardTitle>App Version</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    Coffee DB Version 0.0.1 ;-) <br/>
                    <a href='https://github.com/JustSaX/Coffee-DB'>Coffee DB auf Github</a>
                    </IonCardContent>
                </IonCard> 
            </IonContent>
        </IonPage>
    )
}