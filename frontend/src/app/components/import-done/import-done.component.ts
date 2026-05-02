import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-import-done',
  templateUrl: './import-done.component.html',
  styleUrls: ['./import-done.component.scss'],
  imports: [RouterModule],
  standalone: true
})
export class ImportDoneComponent implements OnInit {
  imported = 0;
  skipped = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.imported = params['imported'] || 0;
      this.skipped = params['skipped'] || 0;
    });
  }
}
