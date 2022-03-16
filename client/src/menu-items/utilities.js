// assets
import { IconBrowser, IconId } from '@tabler/icons';

// constant
const icons = {
    IconBrowser,
    IconId
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Page Encoding',
    type: 'group',
    children: [
        {
            id: 'registration',
            title: 'Registration',
            type: 'item',
            url: '/registration',
            icon: icons.IconBrowser,
            breadcrumbs: false
        },
        {
            id: 'view-users',
            title: 'View Users',
            type: 'item',
            url: '/view-users',
            icon: icons.IconId,
            breadcrumbs: false
        }
    ]
};

export default utilities;
