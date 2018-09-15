import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/home',
        title: 'Home',
        icon: 'fa fa-lock',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: [
            {
                path: '/home/portfolio',
                title: 'Portfolio',
                icon: 'fa fa-lock',
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: []
            }
        ]
    },
    {
        path: '/about',
        title: 'About Us',
        icon: 'fa fa-square',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '/contact',
        title: 'Contact Us',
        icon: 'fa fa-square',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    }
];
