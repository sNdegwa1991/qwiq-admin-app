import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { OrderServerResponse } from 'src/app/models/order.model';
import { ParcelServerResponse } from 'src/app/models/parcel.model';
import { OrderService } from 'src/app/services/orders/order.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';

export type ChartOptions = {
  chart: ApexChart;
  series: ApexAxisChartSeries | any[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: any[];
  labels: any[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public options: any;
  public barOptions: any;
  orders: any;
  unconfirmed: any;
  unconfirmedParcel: any;
  unpaid: any;
  paid: any;
  undelivered: any;
  delivered: any;
  reviewed: any;
  cancelled: any;
  onway: any;
  dateArray: any[] = [];
  totalArray: any[] = [];
  tot = 0;
  monthStamp: any;

  shopping: any;
  shoppingList: any;

  unpaidParcel: any;
  undeliverParcel: any;
  reviewParcel: any;
  cancelledParcel: any;
  onwayParcel: any;
  deliverParcel: any;

  constructor(private orderService: OrderService, 
    private router: Router,private parcelService: ParcelService) {
    let date: Date = new Date();
    let dt = (date.getMonth()+1).toString();
    if(dt.length === 1){
      dt = '0'+(date.getMonth()+1).toString();
    }
    this.monthStamp = date.getFullYear().toString()+dt;

    this.orderService.getMonthDaysOrderTotals(this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.orders = res.orders;
      const len = this.orders.length;
      
      for(let i=0;i<this.orders.length;i++)
      {
        this.dateArray.push(this.orders[i].date)
        this.totalArray.push(this.orders[i].total_orders)
        this.tot = this.tot+this.orders[i].total_orders;
      }

    })
    this.populateData();
    this.spackLine();
    this.barChart();
  }

  ngOnInit() {
    setInterval(() => {
      this.populateData()
    }, 30000);
  }

  populateData(){
    //................................get pending shopping
    this.orderService.getAllShoppingList().subscribe((res:any) =>{
      this.shopping = res;
      this.shoppingList = this.shopping.orders;
    })
    
    //.............................unconfirmed orders
    this.orderService.getMonthAnyStatusOrders(0,this.monthStamp).subscribe((res: OrderServerResponse) =>{
     this.unconfirmed = res.orders;
    });

    this.parcelService.getStatusParcel(0).subscribe((res: ParcelServerResponse) =>{
      this.unconfirmedParcel = res.parcel;
     })

     //.............................unpaid orders
     this.orderService.getMonthAnyStatusOrders(1,this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.unpaid = res.orders;
     });

     this.parcelService.getStatusParcel(1).subscribe((res: ParcelServerResponse) =>{
      this.unpaidParcel = res.parcel;
     })

      //.............................undelivered orders
    this.orderService.getMonthAnyStatusOrders(2,this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.undelivered = res.orders;
     });

     this.parcelService.getStatusParcel(2).subscribe((res: ParcelServerResponse) =>{
      this.undeliverParcel = res.parcel;
     })

    //.............................Delivered orders
    this.orderService.getMonthAnyStatusOrders(4,this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.delivered = res.orders;
     });

     this.parcelService.getStatusParcel(4).subscribe((res: ParcelServerResponse) =>{
      this.deliverParcel = res.parcel;
     })
     
     //.............................Reviewed orders
    this.orderService.getMonthAnyStatusOrders(5,this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.reviewed = res.orders;
     });

     this.parcelService.getStatusParcel(5).subscribe((res: ParcelServerResponse) =>{
      this.reviewParcel = res.parcel;
     })

     //.............................Cancelled orders
    this.orderService.getMonthAnyStatusOrders(3,this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.cancelled = res.orders;
     });

     this.parcelService.getStatusParcel(3).subscribe((res: ParcelServerResponse) =>{
      this.cancelledParcel = res.parcel;
     })

      //.............................onway orders
    this.orderService.getMonthAnyStatusOrders(10,this.monthStamp).subscribe((res: OrderServerResponse) =>{
      this.onway = res.orders;
     });

     this.parcelService.getStatusParcel(10).subscribe((res: ParcelServerResponse) =>{
      this.onwayParcel = res.parcel;
     })
  }

  openSupermarketShopping(){
    this.router.navigate(['tabs/shopping-list'])
  }

  openOrders(stat: any){
    this.router.navigate(['tabs/orders-search/'+stat])
  }

  spackLine() {
    this.options = {
      chart: {
        type: 'line',
        height: 100,
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      series: [
        {
          data: this.totalArray,
        },
      ],
      stroke: {
        width: 3,
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 20,
          left: 110,
          bottom: 10,
        },
      },
      colors: ['#282C35'],
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function formatter(_val: any) {
              return ''; // remove title in tooltip
            },
          },
        },
      },
    };
  }

  barChart() {
    this.barOptions = {
      chart: {
        type: 'bar',
        height: 180,
        width: '100%',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: 'Complete',
          data: this.totalArray,
        },
        {
          name: 'Incomplete',
          data: [6, 12, 4, 7],
        },
      ],
      labels: this.dateArray,
      grid: {
        borderColor: '#343E59',
        padding: {
          right: 0,
          left: 0,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#78909c',
          },
        },
      },
      title: {
        text: 'Last 14 Days Orders',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#78909c',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        labels: {
          colors: '#78909c',
        },
      },
    };
  }

  

 
}
