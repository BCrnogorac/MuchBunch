import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  ShoppingOutline,
  ShoppingFill,
  EuroCircleFill,
  BookFill,
  UserOutline,
  CalendarFill,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  ShoppingOutline,
  ShoppingFill,
  EuroCircleFill,
  BookFill,
  UserOutline,
  CalendarFill,
];

@NgModule({
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzIconModule.forChild(icons),
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzRadioModule,
    NzDatePickerModule,
    NzMenuModule,
  ],
})
export class NgZorroModule {}
