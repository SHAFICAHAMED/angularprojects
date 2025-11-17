import { AfterViewInit, Component } from '@angular/core';
import { SalesRecord, SalesserviceService } from '../salesservice.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-salesdashboard',
  imports: [],
  templateUrl: './salesdashboard.component.html',
  styleUrl: './salesdashboard.component.css'
})
export class SalesdashboardComponent  implements AfterViewInit {
  salesData: SalesRecord[] = [];

  constructor(private salesService: SalesserviceService) {}

  ngAfterViewInit(): void {
    this.salesService.getSalesData().subscribe(data => {
      this.salesData = data;
      this.createChart();
    });
  }

  createChart() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.salesData.map(sale => sale.productName),
        datasets: [{
          label: 'Revenue ($)',
          data: this.salesData.map(sale => sale.revenue),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      }
    });
  }
}
