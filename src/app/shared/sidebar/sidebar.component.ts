import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { currentUser } from 'src/app/models/models';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  openedRight = false;
  opened = false;
  side_over = "side";
  fix_notfix ="notfix";
  isLoggedIn: boolean;
  currUser: currentUser;
  iconaCheck = "radio_button_unchecked";
  iconaCheck2 = "lock_open";

  //Versione Vasco: observable che si aggiorna in automatico al variare della variabile
  //AS: il dollaro indica che la variabile è un observable
  //isLoggedIn$: Observable<boolean>;
  //isLoggedOut$: Observable<boolean>;
  //pictureUrl$: Observable<string>;
  //UserName$: Observable<string>;

  constructor(private snackBar : MatSnackBar,
    private router: Router,
    private uService: UserService,
    public dialog: MatDialog) {
    //Ho messo la routine nel constructor perchè ci passa mentre nell'onInit non passa se F5 su login!
  }

  ngOnInit() {
    //console.log("DEBUG: sidebar ngOnInit");
    //console.log(localStorage.getItem('currentUser'));
    this.uService.obsLoggedIn.subscribe(val => this.isLoggedIn = val)

    if(localStorage.getItem('currentUser') != null){
      //console.log("DEBUG: check currentUser sidebar ngOnInit");

      /*
      this.userDetails = JSON.parse(localStorage.getItem('currentUser'));

      for (let prop in this.userDetails ) {
        if(prop == "fullname"){
          //console.log(this.userDetails [prop]);
          this.userFullName = this.userDetails [prop];
          break;
        }
      }
      */

      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  onLogout() {
    //this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
    this.currUser = null;
    this.uService.Logout();

    this.uService.changeLoggedIn(false);
    this.router.navigate(['/user/login']);
  }

  changeSide_Over () {
    if (this.side_over == "side") {
      this.side_over = "over";
      this.iconaCheck = "check_circle";
    } else {
      this.side_over = "side";
      this.iconaCheck = "radio_button_unchecked";
    }
  }

  changeFix () {
    console.log("fixnotfix prima di cambiarlo"+this.fix_notfix);
    if (this.fix_notfix == "notfix") {
      this.fix_notfix = "fix";
      //this.iconaCheck2 = "check_circle";
      this.iconaCheck2 = "lock";
      //quando fisso il menu devo sempre mettere a lato
      this.side_over = "side";
      this.iconaCheck = "radio_button_unchecked";

      this.opened = true;
      console.log("fixnotfix dopo averlo cambiato"+this.fix_notfix);
    } else {
      this.fix_notfix = "notfix";
      //this.iconaCheck2 = "radio_button_unchecked";
      this.iconaCheck2 = "lock_open";
      this.opened = false;
      console.log("fixnotfix dopo averlo cambiato"+this.fix_notfix);
    }
  }

  openclose () {
    console.log (this.fix_notfix);
    if (this.fix_notfix =="fix"){
      this.ShowMessage("Menu bloccato", "Sbloccare il lucchetto");
    } else {
      console.log("openclose prima di cambiare :"+this.fix_notfix);
      console.log("opened"+this.opened);
      if (this.opened == true) {
        if (this.fix_notfix=="fix") {
          //non deve fare nulla
        } else {
          this.opened = false;
        }
      } else {
        if (this.fix_notfix=="fix") {
          //non dovrebbe mai trovarsi in questa situazione
        } else {
          console.log("chiuso e notfix");
          this.opened = true;
        }
      }
   }
  }

  opencloseRight () {
    if (this.openedRight == true) {
      this.openedRight = false;
    } else {
      this.openedRight = true;
    }
  }

  opencloseicon () {
    if (this.opened == true) {
      if (this.fix_notfix=="fix") {
        //non deve fare nulla
      } else {
        this.opened = false;
      }
    }
  }

  ShowMessage(msg: string, title?: string, hasErrors: boolean= false ) {
    let config = new MatSnackBarConfig();
    config.verticalPosition  = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;

    if(hasErrors){
      config.panelClass =  ['error-class'];
      console.log("ShowMessage: hasErrors");
    }
    //else
    //  config.panelClass =  ['ng-deep'];

    if(title != null)
      this.snackBar.open(msg, title, config);
    else
      this.snackBar.open(msg,null, config);
  }

  @ViewChild('buttonUtente') buttonutente: ElementRef;
  apriModalUtente() {
    const dialogRef = this.dialog.open(DialogUtente, {

      width: '250px',
    });
    let buttonx = this.buttonutente.nativeElement.getBoundingClientRect().x;
    let buttonw = this.buttonutente.nativeElement.offsetWidth;
    let buttony = this.buttonutente.nativeElement.getBoundingClientRect().y;
    let modalx = buttonx + (buttonw/2) - 125;
    let modaly = buttony + 45;
    dialogRef.updatePosition({ left: modalx+'px', top: modaly+'px'  });
  }


}

@Component({
  templateUrl: 'dialog-utente.html',
})

export class DialogUtente {

  constructor(public dialogRef: MatDialogRef<DialogUtente>) { }

  onNoClick(): void {
    //click fuori dalla dialog chiude la dialog
    this.dialogRef.close();
  }

  onResize(){
    this.dialogRef.close();
  }

}
