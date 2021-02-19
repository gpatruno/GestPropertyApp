import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { IProperty } from '../models/IProperty.model';
import { IAdress } from '../models/IAdress.model';
import { IUser } from '../models/IUser.model';
import { Renter } from '../models/Renter.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit {
  propertySelected: boolean;
  showAddItem: boolean;

  // Traitement des Locataires
  renter = [];
  nbrRenter: number;
  newRenter: Renter = {
    User: {
      LastName: '',
      Name: '',
      Mail: '',
      Phone: '',
    },
    Adress: {
      City: '',
      Street: '',
      ZipCode: ''
    }
  }
  // Traitement des Propriétés
  properties = [];
  nbrProperties: number;
  newProperty: IProperty = {
    Name: '',
    Desc: '',
    Loyer: 0,
    Type: '',
    Adress: {
      City: '',
      Street: '',
      ZipCode: ''
    }
  }

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
    this.renter = this.getRenter();
    this.nbrRenter = this.renter.length;
    this.properties = this.getProperty();
    this.nbrProperties = this.properties.length;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      translucent: true
    });

    return await popover.present();
  }

  segmentChanged() {
    this.propertySelected = !this.propertySelected;
  }

  showHideAdd() {
    this.showAddItem = !this.showAddItem;
  }

  showItemProperty(property) {
    console.log('showItemProperty', property);
  }

  showItemRenter(aRenter) {
    console.log('showItemRenter', aRenter);
  }

  addItem() {
    if (!this.propertySelected) {
      console.log('newProperty', this.newProperty);
      this.properties.push(this.newProperty);
      this.newProperty = new IProperty('', '', 0, new IAdress('', '', ''), '');
    } else {
      console.log('newRenter', this.newRenter);
      this.renter.push(this.newRenter);
      this.newRenter = new Renter(new IUser('', '', '', ''), new IAdress('', '', ''));
    }
    this.showHideAdd();
  }

  getProperty(): IProperty[] {
    return [
      new IProperty('Frioul', 'T2', 550, new IAdress('8 Avenue des lauriers', 'Bagnols-sur-Cèze', '30330'), 'En face de l\'école ingénieur'),
      new IProperty('Riou', 'T3', 650, new IAdress('10 Boulevard des marins', 'Annonay', '89655'), 'A côté du portail vert'),
      new IProperty('Exotique', 'T1', 500, new IAdress('35 Bis impasse du pêcheur', 'Bagnols-sur-Cèze', '30330'), '')
    ]
  }

  getRenter(): Renter[] {
    return [
      new Renter(new IUser('Fredéric', 'ANIZERES', 'fred.ansire@mail.com', '0652525254'), new IAdress('157 des oliviers', 'Paris', '94000')),
      new Renter(new IUser('Amélie', 'MORMAN', 'Amélie.morman@mail.com', '0652525254'), new IAdress('4 boulevard rabato', 'Nice', '15000')),
      new Renter(new IUser('Juliette', 'DICAPRIO', 'juju.dicaprio@mail.com', '0652525254'), new IAdress('25 avenue de la République', 'Bagnols-sur-cèze', '30300'))
    ]
  }
}
