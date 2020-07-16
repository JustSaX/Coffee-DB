import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonCol, IonRow, IonImg, IonCard, IonItem, IonBackButton, IonLabel, IonButtons, IonIcon } from '@ionic/react';
import React from 'react';
import './Home.css';

import { RouteComponentProps } from 'react-router'

import { Menu } from './Menu'

import { LoadData} from '../components/backend/loadData'


const Home: React.FC <RouteComponentProps>= (props) =>{
    console.log('******************* HOME *******************')

  LoadData()

  return (  
    <IonPage>
      <IonHeader> 
        <IonToolbar>
          <IonTitle size='large'>Coffee DB</IonTitle>
          <IonButtons slot='end'>{Menu()}</IonButtons>

        </IonToolbar>
      </IonHeader>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*<IonImg src='../../../assets/img/coffee-beans.jpg'/>*/}
        <IonContent> {LoadData()}
        <IonGrid>
          <IonRow><br/><br/>
            <IonCol color='dark' size='8' offset='2' class='ion-padding'>
              <IonImg src='../../../assets/img/coffee-machine.png'/>
            </IonCol>
          </IonRow>
          <IonRow >
            <IonCol>
              <IonButton color='dark'
                        strong={true}
                        size='large'
                        mode='ios'
                        onClick={()=> props.history.push('./add-brews')}
                        >Kaffee<br/>brühen</IonButton>
            </IonCol>
            <IonCol>
              <IonButton color='dark'
                 strong={true} 
                 size='large' 
                 mode='ios'
                 onClick={() => props.history.push('./add-beans')}
                 >Bohne<br/>anlegen</IonButton>
            </IonCol>
          </IonRow>
          <IonRow >
            <IonCol>
              <IonButton color='dark'
                        strong={true}
                        size='large'
                        mode='ios'
                        onClick={ () => props.history.push('./show-brews')}
                        >Brühungen<br/>anzeigen</IonButton>
            </IonCol>
            <IonCol>
              <IonButton color='dark' 
                  strong={true} 
                  size='large' 
                  mode='ios'
                  onClick={() => props.history.push('./Show-beans3')}>
                    {/*<IonIcon icon={eyeOutline}/>*/}
                    Bohnen<br/>anzeigen</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        </IonContent>
    </IonPage>
  )
}

export default Home