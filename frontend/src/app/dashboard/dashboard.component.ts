import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any[] = [];
  loading = true;

  @ViewChild('intensityCanvas') intensityCanvas!: ElementRef;
  @ViewChild('likelihoodCanvas') likelihoodCanvas!: ElementRef;

  constructor(private dataService: DataService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataService.getAllData().subscribe(res => {
      this.data = res;
      this.loading = false;

      this.cd.detectChanges();

      setTimeout(() => {
        this.createCharts();
      }, 300);
    });
  }

  createCharts() {

    // 🔥 INTENSITY (Unknown remove + sort)
    const countryMap = new Map<string, number>();

    this.data.forEach(item => {
      const country = item.country;
      const intensity = item.intensity || 0;

      if (country && country !== 'Unknown') {
        countryMap.set(country, (countryMap.get(country) || 0) + intensity);
      }
    });

    const sortedCountries = Array.from(countryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    new Chart(this.intensityCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: sortedCountries.map(x => x[0]),
        datasets: [{
          label: 'Intensity',
          data: sortedCountries.map(x => x[1]),
          backgroundColor: 'rgba(54,162,235,0.7)'
        }]
      }
    });

    // 🔥 LIKELIHOOD (Unknown remove + sort)
    const topicMap = new Map<string, number>();

    this.data.forEach(item => {
      const topic = item.topic;
      const likelihood = item.likelihood || 0;

      if (topic && topic !== 'Unknown') {
        topicMap.set(topic, (topicMap.get(topic) || 0) + likelihood);
      }
    });

    const sortedTopics = Array.from(topicMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    new Chart(this.likelihoodCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: sortedTopics.map(x => x[0]),
        datasets: [{
          label: 'Likelihood',
          data: sortedTopics.map(x => x[1]),
          backgroundColor: 'rgba(75,192,192,0.7)'
        }]
      }
    });
  }
}