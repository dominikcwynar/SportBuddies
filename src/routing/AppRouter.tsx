import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useAuth } from '../authentication/context/AuthProvider';
import { LoginView } from '../authentication/views/LoginView';
import { RegisterView } from '../authentication/views/RegisterView';
import { RegisteredInfoView } from '../authentication/views/RegisteredInfoView';
import { HomeView } from '../map/views/HomeView';
import { Routes } from './routes';
import { RestrictedRoute } from './RestrictedRoute';
import { ActivationView } from '../authentication/components/Activation';
import { ResetPasswordView } from '../authentication/views/ResetPasswordView';
import { ResetPasswordConfirmView } from '../authentication/views/ResetPasswordConfirmView';
import { EventsView } from '../events/views/EventsView';
import { ExploreView } from '../disciplines_and_facilities/views/ExploreView';
import { ProfileView } from '../profile/views/ProfileView';
export const AppRouter: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return (
        <Router>
            <Switch>
                <Route path={Routes.LOGIN}>{!isAuthenticated ? <LoginView /> : <Redirect to={Routes.HOME} />}</Route>
                <Route path={Routes.REGISTER}>{!isAuthenticated ? <RegisterView /> : <Redirect to={Routes.HOME} />}</Route>
                <Route path={Routes.REGISTERED}>
                    <RegisteredInfoView />
                </Route>
                <Route path={Routes.ACTIVATE}>
                    <ActivationView />
                </Route>
                <Route path={Routes.RESET_PASSWORD}>
                    <ResetPasswordView />
                </Route>
                <Route path={Routes.RESET_PASSWORD_CONFIRM} render={(props) => <ResetPasswordConfirmView {...props} />} />
                <RestrictedRoute path={Routes.EVENTS}>
                    <EventsView />
                </RestrictedRoute>
                <RestrictedRoute path={Routes.PROFILE}>
                    <ProfileView />
                </RestrictedRoute>
                <RestrictedRoute path={Routes.EXPLORE}>
                    <ExploreView />
                </RestrictedRoute>
                <RestrictedRoute path={Routes.HOME}>
                    <HomeView />
                </RestrictedRoute>
            </Switch>
        </Router>
    );
};
