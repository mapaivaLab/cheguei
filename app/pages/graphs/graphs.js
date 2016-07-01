import {Page} from 'ionic-angular';
import {ElementRef} from '@angular/core';

import {Report} from '../../core/report';

import moment from 'moment';

@Page({
  templateUrl: 'build/pages/graphs/graphs.html'
})
export class StatsPage {
  static get parameters() {
    return [[ElementRef]];
  }

  constructor(el) {
    this.el = el.nativeElement;
    this.average = 0;
    this.loading = true;

    setTimeout(() => {
      this.createChart();
    }, 1000);
  }

  createChart() {
    let ctx = this.el.querySelector('#reportChart');

    if (ctx) {

      Report.getReportInfo((reportInfo) => {
        let data = [];
        let labels = [];
        let total = 0;

        for (let report of reportInfo.visitsReport) {
          let cost = parseFloat(Report.sumReportCost(report));

          total += cost;

          data.push(cost);
          labels.push( moment(report.data).format('DD') );
        }

        this.average = (total / reportInfo.visitsReport.length).toFixed(2);

        let myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Gasto diário',
              data: data,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(181, 49, 77, 1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 4,
              pointHoverBackgroundColor: "rgba(181, 49, 77, 1)",
              pointHoverBorderColor: "rgba(181, 49, 77, 1)",
              pointHoverBorderWidth: 1,
              pointRadius: 1,
              pointHitRadius: 20
            }]
          },
          options: {
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
            }
          }
        });

        this.loading = false;
      });
    }
  }

  getMonthName() {
    return Report.getMonthName();
  }
}
