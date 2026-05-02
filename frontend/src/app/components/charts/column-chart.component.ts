import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartData {
  label: string;
  series: { name: string; value: number }[];
}

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ColumnChartComponent implements OnChanges, AfterViewInit {
  @Input() title = '';
  @Input() data: { [key: string]: [number, number] } = {};
  @Input() series = ['Serie 1', 'Serie 2'];
  @Input() colors = ['#4caf50', '#f44336'];
  @Input() height = 350;

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  chartData: ChartData[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.processData();
      this.drawChart();
    }
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  private processData(): void {
    this.chartData = Object.entries(this.data).map(([label, values]) => ({
      label,
      series: this.series.map((name, index) => ({
        name,
        value: Array.isArray(values) ? values[index] || 0 : 0
      }))
    }));
  }

  private drawChart(): void {
    if (!this.chartContainer || this.chartData.length === 0) return;

    const container = this.chartContainer.nativeElement;
    const width = container.offsetWidth || 800;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = this.height - padding * 2;

    // Find max value for scaling
    const maxValue = Math.max(
      ...this.chartData.flatMap(d => d.series.map(s => s.value))
    );

    // SVG namespace
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', this.height.toString());
    svg.setAttribute('class', 'chart-svg');

    // Background
    const bg = document.createElementNS(svgNS, 'rect');
    bg.setAttribute('width', width.toString());
    bg.setAttribute('height', this.height.toString());
    bg.setAttribute('fill', 'white');
    svg.appendChild(bg);

    // Title
    if (this.title) {
      const titleElement = document.createElementNS(svgNS, 'text');
      titleElement.setAttribute('x', (width / 2).toString());
      titleElement.setAttribute('y', '25');
      titleElement.setAttribute('text-anchor', 'middle');
      titleElement.setAttribute('class', 'chart-title');
      titleElement.textContent = this.title;
      svg.appendChild(titleElement);
    }

    // Grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', padding.toString());
      line.setAttribute('y1', y.toString());
      line.setAttribute('x2', (width - padding).toString());
      line.setAttribute('y2', y.toString());
      line.setAttribute('class', 'grid-line');
      svg.appendChild(line);

      // Y-axis labels
      const value = (maxValue * (gridLines - i)) / gridLines;
      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', (padding - 10).toString());
      label.setAttribute('y', (y + 5).toString());
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('class', 'axis-label');
      label.textContent = this.formatValue(value);
      svg.appendChild(label);
    }

    // X and Y axes
    const xAxis = document.createElementNS(svgNS, 'line');
    xAxis.setAttribute('x1', padding.toString());
    xAxis.setAttribute('y1', (padding + chartHeight).toString());
    xAxis.setAttribute('x2', (width - padding).toString());
    xAxis.setAttribute('y2', (padding + chartHeight).toString());
    xAxis.setAttribute('class', 'axis');
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS(svgNS, 'line');
    yAxis.setAttribute('x1', padding.toString());
    yAxis.setAttribute('y1', padding.toString());
    yAxis.setAttribute('x2', padding.toString());
    yAxis.setAttribute('y2', (padding + chartHeight).toString());
    yAxis.setAttribute('class', 'axis');
    svg.appendChild(yAxis);

    // Draw bars
    const barWidth = chartWidth / this.chartData.length / (this.series.length + 1);
    const barGap = barWidth * 0.5;

    this.chartData.forEach((item, index) => {
      const x = padding + (chartWidth / this.chartData.length) * index + barGap;

      item.series.forEach((serie, serieIndex) => {
        const barHeight = (serie.value / maxValue) * chartHeight;
        const barX = x + serieIndex * barWidth;
        const barY = padding + chartHeight - barHeight;

        // Bar
        const bar = document.createElementNS(svgNS, 'rect');
        bar.setAttribute('x', barX.toString());
        bar.setAttribute('y', barY.toString());
        bar.setAttribute('width', barWidth.toString());
        bar.setAttribute('height', barHeight.toString());
        bar.setAttribute('fill', this.colors[serieIndex] || '#999');
        bar.setAttribute('class', 'bar');
        svg.appendChild(bar);

        // Value label on bar
        if (barHeight > 20) {
          const text = document.createElementNS(svgNS, 'text');
          text.setAttribute('x', (barX + barWidth / 2).toString());
          text.setAttribute('y', (barY + barHeight / 2 + 4).toString());
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('class', 'bar-label');
          text.textContent = this.formatValue(serie.value);
          svg.appendChild(text);
        }
      });

      // X-axis label
      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', (x + (barWidth * this.series.length) / 2).toString());
      label.setAttribute('y', (padding + chartHeight + 20).toString());
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('class', 'axis-label');
      label.textContent = item.label;
      svg.appendChild(label);
    });

    // Legend
    let legendY = padding + 10;
    this.series.forEach((name, index) => {
      const legendX = width - 150;

      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', legendX.toString());
      rect.setAttribute('y', legendY.toString());
      rect.setAttribute('width', '12');
      rect.setAttribute('height', '12');
      rect.setAttribute('fill', this.colors[index] || '#999');
      svg.appendChild(rect);

      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', (legendX + 18).toString());
      text.setAttribute('y', (legendY + 10).toString());
      text.setAttribute('class', 'legend-label');
      text.textContent = name;
      svg.appendChild(text);

      legendY += 20;
    });

    // Clear and append
    container.innerHTML = '';
    container.appendChild(svg);
  }

  private formatValue(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toFixed(0);
  }
}
