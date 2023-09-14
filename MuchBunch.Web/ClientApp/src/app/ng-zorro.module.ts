import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

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
    NzCarouselModule,
    NzCardModule,
    NzListModule,
    NzSelectModule,
    NzAlertModule,
    NzDividerModule,
    NzMessageModule,
    NzModalModule,
    NzCollapseModule,
    NzTabsModule,
    NzPaginationModule,
    NzTreeViewModule,
    NzTableModule,
    ScrollingModule,
    NzMenuModule,
    NzCheckboxModule,
    NzSwitchModule,
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
    NzCarouselModule,
    NzCardModule,
    NzListModule,
    NzAlertModule,
    NzDividerModule,
    NzMessageModule,
    NzModalModule,
    NzCollapseModule,
    NzTabsModule,
    NzPaginationModule,
    NzTreeViewModule,
    NzTableModule,
    ScrollingModule,
    NzCheckboxModule,
    NzSwitchModule,
  ],
})
export class NgZorroModule {}
