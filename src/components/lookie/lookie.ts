import { Component } from '@angular/core';
import * as $ from 'jquery';
import { NavParams, ViewController } from 'ionic-angular';
import { MongoService } from '../../services/mongo.service';

@Component({
  selector: 'lookie',
  templateUrl: 'lookie.html'
})
export class LookieComponent {
  accountSid = 'AC431de3e54578cda4970ee1bdcf812b7f';
  authToken = '6e5e193f63295b2411536952899ff3a6';

  data;
  recent;
  cabinet;

  constructor(private params: NavParams, 
              public viewCtrl: ViewController,
              public mongoService: MongoService) {
    this.data = this.params.get('obj');
    console.log(this.data);

    this.recent = this.mongoService.receiveRecent();
    this.cabinet = this.mongoService.receiveCabinet();
  }

  twilioCall() {
    //make sure to npm install trilio
    $.ajax({
      type: "POST",
      url: 'https://puce-aardvark-6991.twil.io/sms',
    });
  }



  onDismiss() {
    this.viewCtrl.dismiss();
  }

  async onTakePill() {
    const date = new Date()
    this.cabinet = await this.cabinet.map((drug) => {
      if(drug.name === this.data.name) {
        drug.taken += 1;
        this.mongoService.addRecent({
          name: drug.name,
          date: `${date.getHours()}:${date.getMinutes()}`,
          log: `${drug.taken}/${drug.limit}` 
        })
        return drug;
      } else return drug;
    });

    this.mongoService.updateCabinet(this.cabinet);

  }

}
