import { Component, OnInit } from '@angular/core';
import { BunchService } from '../services/bunch.service';
import { BunchDTO } from '../models/DTO/bunchDto.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  public bunches: BunchDTO[] = [];

  constructor(private bunchService: BunchService) {}

  ngOnInit() {
    this.getBunches();
  }

  getBunches() {
    this.bunchService.getBunches().subscribe((response) => {
      console.log(response);
      this.bunches = response;
    });
  }
}
