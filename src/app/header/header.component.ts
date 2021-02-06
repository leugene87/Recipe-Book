import { Subscription } from 'rxjs';
import { User } from './../auth/user.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated = false;
  collapsed = true;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user: User) => {
        if (user == null) {
          this.isAuthenticated = false;
        } else {
          this.isAuthenticated = true;
        }
      }
    );
  }

  saveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
