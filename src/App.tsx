import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { Plugins } from '@capacitor/core'

//import AddBeans from './pages/add-beans'
import { AddBeans } from './pages/Add-beans'
import { BeansSettings } from './pages/Beans-settings'
import { BrewsSettings } from './pages/Brews-settings'
import { ShowBeans } from './pages/Show-beans3';
import { AddBrews } from './pages/Add-brews'
import { ShowBrews } from './pages/Show-brews'
import { Credits } from './pages/icon-credits'


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const { SplashScreen } = Plugins
SplashScreen.hide()


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path='/Add-beans' component={AddBeans}/>
        <Route path='/Beans-settings' component={BeansSettings} />
        <Route path='/Show-beans3' component={ShowBeans} />
        <Route path='/Add-brews' component={AddBrews}/>
        <Route path='/Brews-settings' component={BrewsSettings} />
        <Route path='/Show-brews' component={ShowBrews} />
        <Route path='/icon-credits' component={Credits} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
