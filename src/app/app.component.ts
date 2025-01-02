import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssessmentScreenComponent } from "./pages/assessment-screen/assessment-screen.component";
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "./component/navbar/navbar.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, NgbModule, AssessmentScreenComponent, HttpClientModule, NavbarComponent]
})
export class AppComponent {
  title = 'wmpsc-preScreening';
}
