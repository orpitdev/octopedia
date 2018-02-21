import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImageLoaderConfig } from 'ionic-image-loader';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  public music

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private imageLoaderConfig: ImageLoaderConfig) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.music = new Audio();
      this.music.src = "./assets/audio/music.mp3";
      this.music.load();
      this.music.volume = 0.2;
      this.music.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
      this.music.play();
    });
  }
}

