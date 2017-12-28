import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
})
export class FilmeDetalhesPage {
  public filme;
  public filmeId;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MoovieProvider
  ) {
  }

  
  ionViewDidEnter() {
    this.filmeId = this.navParams.get("id");
    console.log('ionViewDidEnter FilmeDetalhesPage');
    this.movieProvider.getLatesMoviesDetalhes(this.filmeId).subscribe(
      data => {
        const response = (data as any);
        this.filme = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
    console.log(this.filmeId);
  }

}
