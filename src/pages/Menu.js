import React, { useState } from 'react'

import { IonButton, IonPopover, IonItem, IonIcon, IonCheckbox, IonButtons, IonBackButton } from "@ionic/react"


import { ellipsisVerticalOutline  } from 'ionicons/icons'


export const Menu = (props) =>  {

    const [showPopover, setShowPopover] = useState(false)

    return (
    <div>
        
        <IonPopover
        isOpen={showPopover}
        onDidDismiss={e => setShowPopover(false)}
        animated={true}
        showBackdrop={true}
      > 
        <IonButtons>
          <IonBackButton/>
        </IonButtons>
        {/*<IonItem><IonCheckbox slot='end' color='light'></IonCheckbox>Sprachsteuerung</IonItem>*/}
        <IonItem routerLink='./Brews-settings'
                onClick={() => setShowPopover(false)} >Einstellungen Brühungen</IonItem>
        <IonItem routerLink='./Beans-settings'
              onClick={()=>setShowPopover(false)}>Einstellungen Bohnen</IonItem>
        <IonItem routerLink='./icon-credits'
              onClick={()=>setShowPopover(false)}>About</IonItem>
      </IonPopover>
    
      <IonButton fill='clear'
                color='dark'
        onClick={(e) => setShowPopover(true)}>
          <IonIcon slot="icon-only" icon={ellipsisVerticalOutline}></IonIcon>
        </IonButton> 
    </div>
    )
} 