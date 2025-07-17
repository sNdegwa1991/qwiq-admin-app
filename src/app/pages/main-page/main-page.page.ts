import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  @ViewChild('tabs tabs_resto', { static: false })
  tabs!: IonTabs;
  tabs_resto!: IonTabs;
  selectedTab: any;
  role: any;
  
  constructor() {
    this.role = JSON.parse(localStorage.getItem('user') || '{}')[0].role;
   }

  ngOnInit() {
    console.log(this.role)
  }

  setCurrentTab(){
    this.selectedTab = this.tabs.getSelected();
    //console.log(this.selectedTab);
  }

  setCurrentTab_resto(){
    this.selectedTab = this.tabs_resto.getSelected();
    console.log(this.selectedTab);
  }

}
