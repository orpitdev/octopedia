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
  public muted

  constructor(public navCtrl: NavController, public plt: Platform, private screenOrientation: ScreenOrientation, private nativeAudio: NativeAudio) {
    //Check if is device or emulator
    if (this.plt.is('cordova')) {
      //Lock to portrair
      this.screenOrientation.lock('portrait');
    }

    this.mute();
  }

  ionViewDidLoad() { 
    this.nativeAudio.preloadComplex('botao_play', 'assets/audio/botao.mp3', 1, 1, 0)
  }

  goToRandom(){
    this.nativeAudio.stop('botao_play')
    this.nativeAudio.play('botao_play')
    this.navCtrl.push('RandomPage');
  }

  mute(){
    
    let muted_save = window.localStorage.getItem('muted');
    var first_time = true

    if(this.muted == undefined)
    {
      if(muted_save != null)
      {
        this.muted = muted_save == 'true' ? true : false
      }
      else
      {
        this.muted = false
      }

      first_time = true
    }
    else
    {
      if(this.muted == false)
      {
        this.muted = true
      }
      else
      {
        this.muted = false
      }
    }
    
    if(this.muted)
    {
      this.nativeAudio.stop('music')      
      window.localStorage.setItem('muted', 'true')
    }
    else
    {
      this.nativeAudio.loop('music')
      window.localStorage.setItem('muted', 'false')
    }
    
  }
}