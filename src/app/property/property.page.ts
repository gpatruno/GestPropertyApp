import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { IProperty } from '../models/IProperty.model';
import { IAdress } from '../models/IAdress.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
})
export class PropertyPage implements OnInit {
  showAddEvent: boolean;
  showAddProperty: boolean;
  properties = [];
  nbrProperties: number;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
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

  segmentChanged($event) {
    this.showAddProperty = !this.showAddProperty;
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
  }

  showItemProperty(property) {
    console.log('showItem' , property);
  }

  getProperty(): IProperty[] {
    return [
      new IProperty('Frioul', 'T2', 550, new IAdress('8 Avenue des lauriers', 'Bagnols-sur-Cèze', '30330'), 'En face de l\'école ingénieur'),
      new IProperty('Riou', 'T3', 650, new IAdress('10 Boulevard des marins', 'Annonay', '89655'),'A côté du portail vert'),
      new IProperty('Exotique', 'T1', 500, new IAdress('35 Bis impasse du pêcheur', 'Bagnols-sur-Cèze', '30330'),'')
    ]
  }
}
