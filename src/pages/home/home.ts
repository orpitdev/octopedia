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
  }

  ionViewDidLoad() { 
    window.localStorage.setItem('load', 'true');
    this.nativeAudio.preloadSimple('botao', 'assets/audio/botao.mp3')
  }

  goToRandom(){
    this.navCtrl.push('RandomPage');
    this.nativeAudio.play('botao')
  }
}