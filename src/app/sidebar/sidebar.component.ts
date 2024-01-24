import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/services/admin.service';
import { TokenStorageService } from 'app/services/auth/TokenStorage.Service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTESAdmin: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/add-client',         title: 'Ajouter Client',             icon:'nc-circle-10',    class: '' },
    { path: '/view-client',         title: 'Consulter Clients',             icon:'nc-shop',    class: '' },
    { path: '/add-colis',         title: 'Ajouter Colis',             icon:'nc-delivery-fast',    class: '' },
    { path: '/view-colis',         title: 'Consulter Colis',             icon:'nc-zoom-split',    class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    // { path: '/add-client',         title: 'Ajouter Client',             icon:'nc-circle-10',    class: '' },
    // { path: '/view-client',         title: 'Consulter Clients',             icon:'nc-shop',    class: '' },
    { path: '/add-colis',         title: 'Ajouter Colis',             icon:'nc-delivery-fast',    class: '' },
    { path: '/view-colis',         title: 'Consulter Colis',             icon:'nc-zoom-split',    class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']

})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    private role : string = "";
    constructor(private tokenStorage : TokenStorageService, private adminService : AdminService){}
    ngOnInit() {
        
        this.adminService.getClientAccountByEmail(this.tokenStorage.getUser()).subscribe(
            (data)=> {
                this.role = data.role;
                if(this.role ==="USER"){
                    this.menuItems = ROUTES.filter(menuItem => menuItem);

                }else {
                    this.menuItems = ROUTESAdmin.filter(menuItem => menuItem);

                }
            }
        )

    }
}
