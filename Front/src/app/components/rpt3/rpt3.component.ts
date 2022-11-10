import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportesService } from 'src/services/reportes.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-rpt3',
  templateUrl: './rpt3.component.html',
  styleUrls: ['./rpt3.component.css'],
})
export class Rpt3Component implements OnInit {
  diaSemana: string;

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public radarChartLabels: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  public radarChartType: ChartType = 'radar';

  public radarChartData: ChartData<'radar'>;

  subscription: Subscription = new Subscription();

  constructor(private service: ReportesService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.subscription.add(
      this.service.reporte3().subscribe({
        next: (res) => {
          const largoRespuesta = res.jugadas.length;
          let conteos: number[] = [0, 0, 0, 0, 0, 0, 0];

          for (let i = 0; i < largoRespuesta; i++) {
            conteos[res.jugadas[i].weekday] = res.jugadas[i].count;
          }

          this.radarChartData = {
            labels: this.radarChartLabels,
            datasets: [
              {
                data: conteos,
                label: 'Partidas jugadas en el día',
                backgroundColor: ['violet'],
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
