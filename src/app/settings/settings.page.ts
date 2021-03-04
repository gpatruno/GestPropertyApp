import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IUser } from '../models/IUser.model';
import Account from '../models/Account.model';
import { Storage } from '@ionic/storage';
import { SigninPage } from '../modals/signin/signin.page';
import { AccountService } from 'src/app/services/account.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isUserConnected: boolean;
  isOrgaConnected: boolean;
  userAccount: Account = new Account();
  newUser: IUser;
  userName: string;
  accounts: any;
  login = {
    mail: '',
    Password: ''
  }

  constructor(
    public afDB: AngularFireDatabase,
    public storage: Storage,
    public modalController: ModalController,
    private accountService: AccountService
  ) { }

  async ngOnInit() {
    this.retrieveAccounts();
    this.userName = 'Aucun utilisateur connecté';
    if (await this.storage.get('userMail') !== null) {
      this.isUserConnected = !this.isUserConnected;
      this.userName = '';
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SigninPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Inscription"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log('dataReturned ', dataReturned);
      if (dataReturned !== null) {
        this.userAccount = dataReturned.data.modelParam;
        this.SignUp(this.userAccount, dataReturned.data.password);
        this.storage.set('userMail', this.userAccount.User.Mail);
        this.showHideUserForm();
        this.userName = '';
      }
    });

    return await modal.present();
  }

  SignUp(paramAccount: Account, password: string) {
    let res = this.accountService.SignUp(paramAccount, password);
    console.log('SignUp ', res);
  }

  async connect() {
    if (this.login.mail !== '' && this.login.Password !== '') {
      let res = await this.accountService.SignIn(this.login.mail, this.login.Password);
      console.log('SignIn ', res);
      // this.showHideUserForm();
      this.userName = '' + this.storage.get('userMail');;
    }
  }

  getAllAccounts() {
    console.log('getAllAccounts', this.accounts);
  }

  disconnect() {
    this.login = {
      mail: '',
      Password: ''
    }
    this.userAccount = new Account();
    this.userName = 'Aucun utilisateur connecté';
    this.storage.clear();
    this.showHideUserForm();
  }

  showHideUserForm() {
    this.isUserConnected = !this.isUserConnected;
  }

  showHideOrgaForm() {
    this.isOrgaConnected = !this.isOrgaConnected;
  }

  retrieveAccounts() {
    console.log('retrieveTutorials');
    this.accountService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('data', data);
      this.accounts = data;
    });
  }
}
