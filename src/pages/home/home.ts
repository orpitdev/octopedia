import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public audio

  constructor(public navCtrl: NavController, public plt: Platform, private screenOrientation: ScreenOrientation, private nativeAudio: NativeAudio) {
    //Check if is device or emulator
    if (this.plt.is('cordova')) {
      //Lock to portrair
      this.screenOrientation.lock('portrait');
    }

    //Audio on click
    this.audio = new Audio();
    this.audio.src = "./assets/audio/botao.mp3";
    this.audio.load();
  }

  ionViewDidLoad() { 
    window.localStorage.setItem('load', 'true');
  }

  goToRandom(){
    this.navCtrl.push('RandomPage');
    this.audio.play();
  }
}