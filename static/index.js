function renderRoute(route = window.location.pathname) {
    switch (route) {
        case '/feedback': {
            MicroModal.show('feedbackModal');
            break;
        }
        // for '/' and others
        default: {
            MicroModal.close('feedbackModal');
            break;
        }
    }
}

window.addEventListener("popstate", (popStateEvent) => {
    renderRoute(popStateEvent.state.route)
});

document.addEventListener("DOMContentLoaded", () => {
    MicroModal.init({
        onShow: modal => history.pushState({route: '/feedback'}, "", '/feedback'),
        onClose: modal => history.back(),
        openClass: "show",
        awaitOpenAnimation: true,
        awaitCloseAnimation: true
    });

    // initial render;
    renderRoute();
});
