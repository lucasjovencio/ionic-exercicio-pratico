import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public lista_movies = new Array<any>();
  public loader;
  public refresher;
  public isRefresher:boolean = false;
  public page=1;
  public infiniteScroll;

  public objeto_feed = {
    qntd_likes: 12,
    qntd_coments: 4
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  doRefresh(refresher) {
    this.refresher=refresher;
    this.isRefresher=true;
    this.carregarFilmes();
  }

  abrirLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }
  fecharLoading() {
    this.loader.dismiss();
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter FeedPage');
    this.carregarFilmes();
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage,{ id: filme.id});
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    this.infiniteScroll=infiniteScroll;
    
    this.carregarFilmes(true);
  }

  carregarFilmes(newPage:boolean=false){
    this.abrirLoading();
    this.movieProvider.getLatesMoovies(this.page).subscribe(
      data => {
        const response = (data as any);
        if(newPage){
          this.lista_movies = this.lista_movies.concat(response.results);
          this.infiniteScroll.complete();
        }else{
          this.lista_movies = response.results;
        }
        
        this.fecharLoading();
        if(this.isRefresher){
            this.refresher.complete();
            this.isRefresher=false;
        }
      },
      error => {
        console.log(error);
        this.fecharLoading();
        if(this.isRefresher){
            this.refresher.complete();
            this.isRefresher=false;
        }
      }

    );

    

  }
}
