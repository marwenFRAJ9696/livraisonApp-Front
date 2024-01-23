import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AddClientComponent } from 'app/pages/add-client/add-client.component';
import { ViewClientComponent } from 'app/pages/view-client/view-client.component';
import { AddColisComponent } from 'app/pages/add-colis/add-colis.component';
import { ConsulterColisComponent } from 'app/pages/consulter-colis/consulter-colis.component';
import { ProfileComponent } from 'app/pages/profile/profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'add-client',           component: AddClientComponent },
    { path: 'view-client',           component: ViewClientComponent },
    { path: 'add-colis',           component: AddColisComponent },
    { path: 'view-colis',           component: ConsulterColisComponent },
    { path: 'profil',           component: ProfileComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
