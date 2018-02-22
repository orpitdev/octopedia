import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { HomePage } from '../home/home';

/**
 * Generated class for the RandomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'RandomPage'
})
@Component({
  selector: 'page-random',
  templateUrl: 'random.html',
})
export class RandomPage {

  @ViewChild(Slides) slides: Slides;
  public showBtnBack: boolean
  public images: Array<string>
  public max_time_transition: number = 100 
  public execution_time = 5000
  public load_time: number = 10000
  public roleta

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private nativeAudio: NativeAudio) {
    
  }

  //Set to false showBtnBack - It not show button
  ionViewDidLoad() {
    this.showBtnBack = false
    this.images = this.shuffle([
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg',
      '8.jpg',
      '9.gif',
      '10.gif',
      '11.gif',
      '12.gif',
      '13.gif',
      '14.gif',
      '15.gif',
      '16.gif'
    ])

    let load = window.localStorage.getItem('load');

    if(load == 'true')
    {
      //Loading
      let loading = this.loadingCtrl.create({
        cssClass: 'loading-hidden'
      });
    
      loading.present()
    
      //Random number to timer
      let random_timer = this.execution_time

      setTimeout(() => {
        loading.dismiss();
        this.startSlides(random_timer)
      }, this.load_time);

      window.localStorage.setItem('load', 'false')
    }
    else
    {
      //Random number to timer
      let random_timer = this.execution_time
      this.startSlides(random_timer)
    }

    //Load audio
    this.nativeAudio.preloadComplex('roleta', 'assets/audio/roleta.mp3', 1, 1, 0)
    this.nativeAudio.preloadSimple('botao_random', 'assets/audio/botao.mp3')
  }

  //Set config on the slides
  ngAfterViewInit() {
    this.slides.loop = true
    this.slides.onlyExternal = true
  }

  ionViewDidEnter() {

    let load = window.localStorage.getItem('load')

    //If not true, dont preloading images
    if(load == 'true')
    {
      this.startSlides(this.load_time)
    }
  }

  startSlides(time){
    
    this.nativeAudio.loop('roleta')
    
    //Reset timer
    clearInterval(timer)

    //Start pass slides    
    let steps = Math.round(time/this.max_time_transition)
    let variation = 700/steps; //700 is the difference between min and max speed limit acceptable

    var timer = setInterval(() => {
      this.slides.slideNext(this.max_time_transition)
      this.max_time_transition = this.max_time_transition+variation
    }, this.max_time_transition)

    //After 5 seconds, stop slides and show button to back from the home.
    setTimeout(() => {
      clearInterval(timer)
      this.showBtnBack = true
      this.nativeAudio.stop('roleta')
    }, time)
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  goToRandom(){
    this.nativeAudio.play('botao_random')
    this.navCtrl.push('RandomPage')
  }

  goToHome(){
    this.nativeAudio.play('botao_random')
    this.navCtrl.push(HomePage)
  }
  
}
