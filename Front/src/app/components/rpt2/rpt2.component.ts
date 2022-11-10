import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ReportesService } from 'src/services/reportes.service';

@Component({
  selector: 'app-rpt2',
  templateUrl: './rpt2.component.html',
  styleUrls: ['./rpt2.component.css'],
})
export class Rpt2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(private service: ReportesService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getData();
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    color: '#f8f9fa',
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'>;

  getData() {
    this.subscription.add(
      this.service.reporte1().subscribe({
        next: (res) => {
          console.log(res.porcBlackjack);
          this.barChartData = {
            labels: ['Ganó', 'Perdió', 'Empató'],
            datasets: [
              {
                data: [res.gano, res.perdio, res.empato],
                backgroundColor: ['green', 'red', 'blue'],
                borderColor: '#f8f9fa',
                hoverBackgroundColor: ['darkgreen', 'darkred', 'darkblue'],
              },
            ],
          };
        },
        error: () => {
          console.log('error');
        },
      })
    );
  }
}
