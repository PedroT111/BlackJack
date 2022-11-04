import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ReportesService } from 'src/services/reportes.service';

@Component({
  selector: 'app-rpt1',
  templateUrl: './rpt1.component.html',
  styleUrls: ['./rpt1.component.css']
})
export class Rpt1Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(private service: ReportesService) { }
  data: any[] = [];
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.getData();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartData<'pie'>; 

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  }

  getData(){
    this.subscription.add(this.service.reporte2().subscribe({
      next: (res) => {
        this.pieChartData = {
          labels: [ 'Ganadas con Blackjack (%)', 'Ganadas sin Blackjack (%)'],
          datasets: [
            { data: [ res.porcBlackjack, res.porcSinBj],
              backgroundColor: ["#193BC2", "#F0DE72"],
              hoverBackgroundColor: ["#112C95","#D7C65C"]}
          ]
        };
      },
      error: () => {
        console.log('error');
      }
    }))
  }

}
