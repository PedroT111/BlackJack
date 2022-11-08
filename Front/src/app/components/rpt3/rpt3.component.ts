import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { DatePipePipe } from 'src/app/date-pipe.pipe';
import { ReportesService } from 'src/services/reportes.service';

@Component({
  selector: 'app-rpt3',
  templateUrl: './rpt3.component.html',
  styleUrls: ['./rpt3.component.css']
})
export class Rpt3Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  constructor(private service:ReportesService) { }
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
        min: 1
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'>;

  getData(){
    this.subscription.add(this.service.reporte3().subscribe({
      next: (res) => {
        console.log(res);
        this.barChartData = {
          labels: res.map((d: any) => d.weekday),
          datasets: [
            { data: res.map((d: any) => d.count),
              backgroundColor: ["green", "red", "blue"],
              hoverBackgroundColor: ["darkgreen","darkred", "darkblue"],}
          ]
        };
      },
      error: () => {
        console.log('error');
      }
    }))
  }
}
