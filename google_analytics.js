<!-- Google Analytics Script -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HFMLHSXTWF"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-HFMLHSXTWF', {'anonymize_ip': true});
    
    // Social media click tracking
    document.querySelectorAll('.tile a').forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'social_click', {
                'event_category': 'social',
                'event_label': link.href
            });
        });
    });
</script>
