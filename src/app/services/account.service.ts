import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { Storage } from '@ionic/storage';
import Account from '../models/Account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private dbPath = '/Accounts';
  AccountsRef: AngularFireList<Account> = null;
  userData: Observable<any>;

  constructor(
    private db: AngularFireDatabase,
    public storage: Storage,
    private angularFireAuth: AngularFireAuth) {
    this.AccountsRef = this.db.list(this.dbPath);
    this.userData = angularFireAuth.authState;
    console.log('authState', this.userData);
  }

  getAll(): AngularFireList<Account> {
    return this.AccountsRef;
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
  }

  // Connexion
  async SignIn(email: string, password: string): Promise<any> {
    try {
      const res = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      console.log('Successfully signed in!', res);
      this.storage.set('userMail', res.user.email);
      var ref = this.AccountsRef.query;
      ref.orderByChild("Mail").equalTo(res.user.email).on("child_added", function (snapshot) {
        console.log('snapshot ' , snapshot.key);
      });
      return res;
    } catch (err) {
      console.log('Something is wrong:', err);
      return false;
    }
  }

  // Inscription
  SignUp(account: Account, password: string): any {
    //Ajout de l'utilisateur dans Accounts
    this.AccountsRef.push(account);
    //Création des Ids dans Firebase Auth
    this.angularFireAuth
      .createUserWithEmailAndPassword(account.User.Mail, password)
      .then(res => {
        console.log('Successfully signed up! ', res);
        return res;
      })
      .catch(error => {
        console.log('Something is wrong: ', error);
        return error;
      });
  }

  update(key: string, value: any): Promise<void> {
    return this.AccountsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.AccountsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.AccountsRef.remove();
  }
}
