function navigateTo(route) {
    window.location.href = route;
}

document.addEventListener('DOMContentLoaded', () => {
    // Captura todos os elementos com o atributo 'data-route'
    document.querySelectorAll('[data-route]').forEach(button => {
        button.addEventListener('click', () => {
            const route = button.getAttribute('data-route');
            if (route) navigateTo(route); // Redireciona para a rota
        });
    });
});
