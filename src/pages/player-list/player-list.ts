import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'player-list',
  templateUrl: 'player-list.html'
})
export class PlayerListPage {
  icons: string[];
  players: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['person', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.players = [];
    for(let i = 1; i < 11; i++) {
      this.players.push({
        title: 'player ' + i,
        note: 'This is player #' + i,
        icon: this.icons[0]
      });
    }
  }

  playerTapped(event, player) {
    this.navCtrl.push(ItemDetailsPage, {
      player: player
    });
  }
}
