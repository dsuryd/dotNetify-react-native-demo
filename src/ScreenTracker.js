import dotnetify from 'dotnetify';

class ScreenTracker {
    screen = "";
    handlers = [];

    reset() {
        this.screen = "";
        this.handlers = [];
    }

    subscribe(handler) {
        this.handlers.push(handler);
        return handler;
    }

    unsubscribe(handler) {
        this.handlers = this.handlers.filter(item => item != handler);
    }

    setScreen(navState) {
        if (navState) {
            this.screen = this.findRoute(navState);
            this.handlers.forEach(handler => handler(this.screen));
        }
    }

    findRoute = (navState) => {
        return navState.index !== undefined ?
            this.findRoute(navState.routes[navState.index]) : navState.routeName;
    }

    goToLoginScreen = (navigate, exception) => {
        this.reset();
        dotnetify.react.getViewModels().forEach(vm => vm.$destroy());
        navigate("Login", exception);
    }
}

export default new ScreenTracker();