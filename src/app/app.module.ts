import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//  firebase imports, remove what you don't require
// Chacun de ces modules est utile à quelques chose de particulier dans notre application et son fonctionnement:

// AngularFireModule: permet d’associer notre application Ionic à notre projet Firebase grâce aux code de configuration
// AngularFireDatabaseModule: donne accès aux fonctions de base de données Firebase ( envoi et récupération d’informations sous forme d’objet et de liste)
// AngularFireAuthModule: contient toutes les fonctions d’authentification, par email et mot de passe, Facebook ou Google
// AngularFireStorageModule: permet de stocker et de récupérer des fichiers et du contenu dans la base de stockage Firebase (photos, vidéos, audio, PDF, etc)
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyDv1z1JonclFoLQrB5-0mDrTJAn1uTkFZA',
  authDomain: 'gestproperty-868f4.firebaseapp.com',
  databaseURL: 'https://gestproperty-868f4-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'gestproperty-868f4',
  storageBucket: 'gestproperty-868f4.appspot.com',
  messagingSenderId: '720445226352',
  appId: '1:720445226352:web:ef5bdf4ae5f6813cc663b5',
  measurementId: 'G-S13J10NSHW'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
