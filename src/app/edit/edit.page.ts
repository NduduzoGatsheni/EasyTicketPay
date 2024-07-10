import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  users: any[] = [];
  editMode: boolean = false;
  editUserId: string = '';

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.firestore.collection('users').snapshotChanges().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      });
    });
  }

  addUser() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      // In a real application, do not store the password in plaintext
      password: this.password 
    };

    this.firestore.collection('users').add(user).then(() => {
      alert('Signup successful!');
      this.resetForm();
    }).catch((error) => {
      console.error('Error adding user: ', error);
      alert('Error signing up.');
    });
  }

  deleteUser(userId: string) {
    this.firestore.collection('users').doc(userId).delete().then(() => {
      alert('User deleted successfully!');
      this.loadUsers(); // Refresh the list of users
    }).catch((error) => {
      console.error('Error deleting user: ', error);
      alert('Error deleting user.');
    });
  }

  editUser(user: any) {
    this.editMode = true;
    this.editUserId = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.confirmPassword = user.password; // Pre-fill confirm password field for convenience
  }

  updateUser() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      // In a real application, do not store the password in plaintext
      password: this.password 
    };

    this.firestore.collection('users').doc(this.editUserId).update(user).then(() => {
      alert('User updated successfully!');
      this.loadUsers(); // Refresh the list of users
      this.resetForm();
    }).catch((error) => {
      console.error('Error updating user: ', error);
      alert('Error updating user.');
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.editMode = false;
    this.editUserId = '';
  }
}
