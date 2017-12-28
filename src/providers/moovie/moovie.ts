import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {
  private base_api_path = "https://api.themoviedb.org/3";
  private chave_api = "30f718754250744e3e4be327d40852f6";
  constructor(public http: HttpClient) {
    console.log('Hello MoovieProvider Provider');
  }
  
  
  getLatesMoovies(page = 1){
    return this.http.get(this.base_api_path+`/movie/popular?page=${page}&api_key=`+this.chave_api);
  }
  getLatesMoviesDetalhes(filmeid){
    return this.http.get(this.base_api_path+`/movie/${filmeid}?api_key=`+this.chave_api);
  }
  
} 
