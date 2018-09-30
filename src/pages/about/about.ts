import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as $ from 'jquery';
import { CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { MongoService } from '../../services/mongo.service';
import { OutputType } from '@angular/core/src/view';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  library;
  recent;
  cabinet;

  otcHash = ['advil','tylenol','zyrtec','ambien','benadryl','aspirin'];
  prescripedHash = ['prozac', 'xanax'];
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1440,
    height: 1920,
    quality: 72
  }

  constructor(public navCtrl: NavController,
              private cameraPreview: CameraPreview,
              private mongoService: MongoService) {
  }

  ionViewDidEnter() {
    this.updateMongoData();
  }

  async updateMongoData() {
      this.recent = this.mongoService.receiveRecent();
      this.cabinet = this.mongoService.receiveCabinet();
      this.library = this.mongoService.receiveLibrary();
  }
 
  async upload() {
    const subscriptionKey = '<subkey>';
    let output = '';
    let pic = '';

    await this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      pic = ('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      console.log(err);
    });    

    const data = pic.replace('data:image/jpeg;base64,', ''); // remove content type
    const request = {
      "requests":[
        {
          "image":{ "content": data },
          "features":[
            {
              "type":"TEXT_DETECTION",
            }
          ]
        }
      ]
    };
    
    await $.ajax({
      method: 'POST',
      url: `https://vision.googleapis.com/v1/images:annotate?key=${subscriptionKey}`,
      contentType: 'application/json',
      data: JSON.stringify(request),
      processData: false,
      success: function(data){
        console.log(data.responses);
        output = data.responses.reduce((fullText ,line) => {
          return fullText + line.textAnnotations.reduce((sum, word, idx) => {
            return idx !== 0 ? sum + word.description + ' ' : '';
          }, '') + ' ';
        }, '')
        console.log(output)
      },
      error: function (data, textStatus, errorThrown) {
        console.log('error: ' + data);
      }
    }) 

    /* 
    HERE we check if the ocr response is
      X A) a prescription drug or OTC 
      X B) shows there is drugs in the picture
      THEN we get dough and logically get the dosage/directions/limit/name of prescribed labels
    */
    output = output.toLowerCase()
    const otcName = await this.otcHash.find((drugName) => output.includes(drugName));
    const prescribedName = await this.prescripedHash.find((drugName) => output.includes(drugName));

    prescribedName !== undefined ? this.prescribedHelper(prescribedName, output) : '';
    otcName !== undefined ? this.otcHelper(otcName) : '';
    console.log(otcName);
    console.log(prescribedName)
  }

    prescribedHelper(name, ocrText) {
      const drugData = this.library.find((obj) => obj[name] !== undefined)
      console.log(drugData);
      const arr = ocrText.split(' ');
      const dosage = arr.slice(arr.indexOf(name.toUpperCase()) + 1, arr.indexOf(name.toUpperCase()) + 3).join('');
      const directions = arr.slice(arr.indexOf('tablets') + 1, arr.indexOf('rx')).join(' ');
      this.cabinet.push({
        name: name,
        dosage: dosage,
        limit: 2,
        taken: 0,
        directions: directions,
        desc: drugData.desc
      })
      this.mongoService.updateCabinet(this.cabinet);

      console.log(dosage);
      console.log(directions);
    }

    otcHelper(name) {
      const drugData = this.library.find(obj => obj[name] !== undefined);

      this.cabinet.push({
        name,
        dosage: drugData[name].dosage,
        limit:drugData[name].limit,
        taken: 0,
        directions: drugData[name].directions,
        desc: drugData.desc
      })

      this.mongoService.updateCabinet(this.cabinet);
    }

}
