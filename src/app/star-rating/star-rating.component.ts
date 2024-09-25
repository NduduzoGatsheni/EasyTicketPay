import { Component, OnInit } from '@angular/core';
// import { NavParams } from '@ionic/angular';
import { NavParams, PopoverController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firestore import

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent  implements OnInit {
  rating!: number;
  otherData!: string;

  uid:string='';

  
  constructor(private navParams: NavParams, private firestore: AngularFirestore, private popoverCtrl: PopoverController) { }
 

  ngOnInit() {
  this.uid = this.navParams.get('uid');
  console.log('User UID:', this.uid);

  }

  async setRating(ratingValue: number) {
    this.rating = ratingValue;
    
    // Save the rating to Firestore
    try {
      await this.firestore.collection('ratings').doc(this.uid).set({
        rating: this.rating,
        timestamp: new Date()
      });
      console.log('Rating saved successfully!');

      // Dismiss popover
      this.popoverCtrl.dismiss();
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  }
}