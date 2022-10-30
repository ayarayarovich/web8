document.addEventListener('DOMContentLoaded', () => {

    let feedbackModalIsShown = false;

    const feedbackModalEl = document.querySelector('#feedback-modal');
    const feedbackModal = new bootstrap.Modal(feedbackModalEl);

    const feedbackFormEl = feedbackModalEl.querySelector('form');
    const feedbackFormCacher = createFormCacher(feedbackFormEl);
    feedbackFormCacher.backup();

    feedbackModalEl.addEventListener('show.bs.modal', () => {
        feedbackModalIsShown = true;
        history.pushState(null, '', '/feedback');
    });
    feedbackModalEl.addEventListener('shown.bs.modal', () => {
        feedbackModalEl.querySelector('input, select, textarea').focus();
    });
    feedbackModalEl.addEventListener('hide.bs.modal', () => {
        if (!feedbackModalIsShown) return;

        history.back();
    });

    feedbackFormEl.addEventListener('submit', (e) => {
        e.preventDefault();

        feedbackFormEl.classList.add('was-validated')
        if (!feedbackFormEl.checkValidity()) {
            e.stopPropagation();
            return false;
        }

        const formData = new FormData(feedbackFormEl);

        // Convert FormData to plain JavaScript object
        const vals = Object.fromEntries(formData.entries());

        const waitResponse = fetch(feedbackFormEl.getAttribute('action'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(vals)
        });

        waitResponse.then(() => {
            pushSuccessToast('Отзыв успешно отправлен, спасибо!');
            feedbackFormCacher.clear();
        }).catch(() => {
            pushFailureToast('Произошла неизвестная ошибка, приносим свои извинения за предоставленные неудобства.');
        });
    });

    window.addEventListener('popstate', () => {
        feedbackModalIsShown = false;
        feedbackModal.hide();
    });

});
