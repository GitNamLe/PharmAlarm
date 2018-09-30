import { Component } from '@angular/core';
import * as $ from 'jquery';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { MongoService } from '../../services/mongo.service';
import { LookieComponent } from '../../components/lookie/lookie';
import { CameraPreview } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  library;
  recent;
  cabinet;

  constructor(public navCtrl: NavController,
              private mongoService: MongoService,
              public modalCtrl: ModalController,
              public platform: Platform,
              public cameraPreview: CameraPreview) {
                this.platform.ready().then(()=> {
                  let options = {
                    x: 0,
                    y: 0,
                    width: window.screen.width,
                    height: window.screen.height,
                    camera: 'rear',
                    tapPhoto: true,
                    previewDrag: true,
                    toBack: true,
                  }
            
                  this.cameraPreview.startCamera(options).then(
                      (res)=> {
                      console.log(res)
                      },
                      (err) => {
                      console.log(err)
                      }
                    );
                })
  }

  ionViewWillEnter() {
    this.getLibrary();
  }

  async getLibrary() {
    this.recent = this.mongoService.receiveRecent();
    this.library = this.mongoService.receiveLibrary();
    this.cabinet = this.mongoService.receiveCabinet();

    console.log(this.recent);
    console.log(this.library);
    console.log(this.cabinet);
  }

  openModal(obj) {
    let modal = this.modalCtrl.create(LookieComponent,{obj});
    modal.onDidDismiss(data => {
      this.getLibrary();
    });
    modal.present();
  }
}
