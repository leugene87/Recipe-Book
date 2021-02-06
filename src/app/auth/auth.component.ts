import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router, private compFactResolver: ComponentFactoryResolver) { }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.error = null;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      form.reset();
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError(): void {
    this.error = null;
  }

  private showErrorAlert(message: string): void {
    // const alertComp = new AlertComponent();
    const alertComponentFactory = this.compFactResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const compRef = hostViewContainerRef.createComponent(alertComponentFactory);
    compRef.instance.message = message;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    }
    );


  }

}
