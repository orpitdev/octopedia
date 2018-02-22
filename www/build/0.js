webpackJsonp([0],{

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RandomPageModule", function() { return RandomPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__random__ = __webpack_require__(290);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RandomPageModule = (function () {
    function RandomPageModule() {
    }
    RandomPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__random__["a" /* RandomPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__random__["a" /* RandomPage */]),
            ],
        })
    ], RandomPageModule);
    return RandomPageModule;
}());

//# sourceMappingURL=random.module.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RandomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the RandomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RandomPage = (function () {
    function RandomPage(navCtrl, navParams, loadingCtrl, nativeAudio) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.nativeAudio = nativeAudio;
        this.max_time_transition = 100;
        this.execution_time = 5000;
        this.load_time = 10000;
    }
    //Set to false showBtnBack - It not show button
    RandomPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.showBtnBack = false;
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
        ]);
        var load = window.localStorage.getItem('load');
        if (load == 'true') {
            //Loading
            var loading_1 = this.loadingCtrl.create({
                cssClass: 'loading-hidden'
            });
            loading_1.present();
            //Random number to timer
            var random_timer_1 = this.execution_time;
            setTimeout(function () {
                loading_1.dismiss();
                _this.startSlides(random_timer_1);
            }, this.load_time);
            window.localStorage.setItem('load', 'false');
        }
        else {
            //Random number to timer
            var random_timer = this.execution_time;
            this.startSlides(random_timer);
        }
        //Load audio
        this.nativeAudio.preloadComplex('roleta', 'assets/audio/roleta.mp3', 1, 1, 0);
        this.nativeAudio.preloadComplex('botao', 'assets/audio/botao.mp3', 1, 1, 0);
    };
    //Set config on the slides
    RandomPage.prototype.ngAfterViewInit = function () {
        this.slides.loop = true;
        this.slides.onlyExternal = true;
    };
    RandomPage.prototype.ionViewDidEnter = function () {
        var load = window.localStorage.getItem('load');
        //If not true, dont preloading images
        if (load == 'true') {
            this.startSlides(this.load_time);
        }
    };
    RandomPage.prototype.startSlides = function (time) {
        var _this = this;
        this.nativeAudio.loop('roleta');
        //Reset timer
        clearInterval(timer);
        //Start pass slides    
        var steps = Math.round(time / this.max_time_transition);
        var variation = 700 / steps; //700 is the difference between min and max speed limit acceptable
        var timer = setInterval(function () {
            _this.slides.slideNext(_this.max_time_transition);
            _this.max_time_transition = _this.max_time_transition + variation;
        }, this.max_time_transition);
        //After 5 seconds, stop slides and show button to back from the home.
        setTimeout(function () {
            clearInterval(timer);
            _this.showBtnBack = true;
            _this.nativeAudio.stop('roleta');
        }, time);
    };
    RandomPage.prototype.shuffle = function (array) {
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
    };
    RandomPage.prototype.goToRandom = function () {
        this.nativeAudio.stop('botao');
        this.nativeAudio.play('botao');
        this.navCtrl.push('RandomPage');
    };
    RandomPage.prototype.goToHome = function () {
        this.nativeAudio.stop('botao');
        this.nativeAudio.play('botao');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Slides */])
    ], RandomPage.prototype, "slides", void 0);
    RandomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-random',template:/*ion-inline-start:"E:\Projetos - App\polvo\octopedia\src\pages\random\random.html"*/'<ion-content>\n  <img src="./assets/imgs/logo.png" class="logo" alt="" [ngClass]="showBtnBack ? \'hide-btn-back\' : \'\'">\n  <span class="pulse" (click)="goToRandom()" [ngClass]="showBtnBack ? \'show-btn-back\' : \'\'">\n    <img src="./assets/imgs/btn_play.png" alt="">\n  </span>\n  <img src="./assets/imgs/btn_back.png" class="back" alt="" [ngClass]="showBtnBack ? \'show-btn-back\' : \'\'" (click)="goToHome()">\n\n  <ion-slides>\n    <ion-slide *ngFor="let image of images" [ngStyle]="{\'background-image\': \'url(./assets/imgs/\'+image+\')\'}"></ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"E:\Projetos - App\polvo\octopedia\src\pages\random\random.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__["a" /* NativeAudio */]])
    ], RandomPage);
    return RandomPage;
}());

//# sourceMappingURL=random.js.map

/***/ })

});
//# sourceMappingURL=0.js.map