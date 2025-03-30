var klaroConfig = {
    version: 1,
    elementID: 'klaro',
    privacyPolicy: '/privacy.html', // Link to your privacy policy page
    default: true, // Automatically enable all services until the user opts out
    services: [
        {
            name: 'google-analytics',
            title: 'Google Analytics',
            purposes: ['analytics'],
            cookies: [
                [/^_ga/, '/', '.siddysounds.com'], // Adjust domain if needed
                [/^_gid/, '/', '.siddysounds.com']
            ],
            required: false, // User must accept it
            optOut: true,
        },
        {
            name: 'microsoft-clarity',
            title: 'Microsoft Clarity',
            purposes: ['analytics'],
            required: false, // Make it optional for the user
            optOut: true,
        }
    ],
    translations: {
        en: {
            consentModal: {
                description: 'We use cookies to improve your experience. You can change your settings anytime.',
            },
            acceptAll: 'Accept All',
            acceptSelected: 'Accept Selected',
            decline: 'Decline',
        }
    }
};