import { Route } from "@angular/router"
import { PoligonComponent } from "./poligon.component"
import { ReactFormComponent, DoctorformComponent, TestFormComponent } from "./../polygon-projects"
import { WelcomePoligonComponent } from "./welcome-poligon/welcome-poligon.component"

export const PolygonRouts: Route[] = [
  {
    path: '',
    component: PoligonComponent,
    children: [
      {
        path: '', component: WelcomePoligonComponent
      },
      {
        path: 'reactform', component: ReactFormComponent
      },
      {
        path: 'doctor', component: DoctorformComponent
      },
      {
        path: 'tempform', component: TestFormComponent
      }
    ]
  }
]