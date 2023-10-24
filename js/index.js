document.addEventListener('partialsLoaded',async () => {
    await import('./products-service.js');
    await import('./products-catalogue.js');
    await import('./admin.js');
    await import('./search.js');
    await import('./login-validation.js');
});
