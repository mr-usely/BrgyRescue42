import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Registration = Loadable(lazy(() => import('views/utilities/Registration')));
const ViewUsers = Loadable(lazy(() => import('views/utilities/ViewUsers')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/oldfiles/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/oldfiles/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/oldfiles/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/registration',
            element: <Registration />
        },
        {
            path: '/view-users',
            element: <ViewUsers />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
