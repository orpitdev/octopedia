import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { NativeAudio } from '@ionic-native/native-audio';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  public music

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private imageLoaderConfig: ImageLoaderConfig, private nativeAudio: NativeAudio) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //Check if is device or emulator
      this.nativeAudio.preloadComplex('music', 'assets/audio/music.mp3', 0.2, 1, 0)
        .then(() => {
          this.nativeAudio.play('music')
          this.nativeAudio.loop('music')
        })

    });
  }
}

