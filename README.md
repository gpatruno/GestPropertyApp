Generer un Projet Ionic :

> ionic start

Generer une View :

> ng generate page <maPage>

Déployer sur Android : 

- Build l'application
> inonic build

- Build pour android
> ionic cap add ios
> ionic cap add android

- Si le dossier Anrdoid Existe déjà
> ionic cap copy

- Note: After making updates to the native portion of the code (such as adding a new plugin), use the sync command:
> ionic cap sync

- First, run the Capacitor open command, which opens the native Android project in Android Studio:
> ionic cap open android

- Live Reload
> ionic cap run ios -l --external
> ionic cap run android -l --external