import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "@app/spinner/spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  loading: boolean = false;

  constructor(private loaderService: SpinnerService) {
    this.loaderService.isLoading.subscribe((v: any) => {
      // console.log(v);
      this.loading = v;
    });
  }

  ngOnInit(): void {}

}
