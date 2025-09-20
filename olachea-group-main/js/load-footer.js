document.addEventListener('DOMContentLoaded', function() {
    // Create footer placeholder if it doesn't exist
    if (!document.getElementById('footer-placeholder')) {
        const footerPlaceholder = document.createElement('div');
        footerPlaceholder.id = 'footer-placeholder';
        document.body.appendChild(footerPlaceholder);
    }

    // Load footer content
    const baseUrl = window.location.protocol + '//' + window.location.host;
    fetch(baseUrl + '/includes/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-placeholder').outerHTML = html;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});
