function navigateTo(route) {
    window.location.href = route;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-route]').forEach(button => {
        button.addEventListener('click', () => {
            const route = button.getAttribute('data-route');
            if (route) navigateTo(route); 
        });
    });
});
