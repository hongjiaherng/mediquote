import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router){}

  queryParams!: any;
  result!: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      this.result = this.queryParams.result;
      console.log(params);
    });
  }

  onRecalculate() {
    this.router.navigate(['/request-insurance']);
  }
}
