import { Component, OnInit } from '@angular/core';
// import { NavParams } from '@ionic/angular';
import { NavParams, PopoverController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firestore import
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent  implements OnInit {
  rating!: number;
  otherData!: string;

  uid:string='';

  
  constructor(private navParams: NavParams, 
    private firestore: AngularFirestore, 
    private popoverCtrl: PopoverController,
  private auth :AuthService) { }
 

  ngOnInit() {
  this.uid = this.navParams.get('uid');
  console.log('User UID:', this.uid);

  }

  async setRating(rating: number) {
    this.rating = rating;
    
  
    try {
  
      const ratingDocRef = await this.firestore.collection('ratings').doc(this.uid);

      // Use arrayUnion to append to the ratings array
      await ratingDocRef.set({
        uid: this.uid,
        ratings: firebase.firestore.FieldValue.arrayUnion({
          rating: rating,
          timestamp: new Date()
        })
      }, { merge: true });

      console.log('Rating saved successfully!');
this.auth.presentToast('Rating saved successfully!','success');
      // Dismiss popover
      this.popoverCtrl.dismiss();
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  }


}