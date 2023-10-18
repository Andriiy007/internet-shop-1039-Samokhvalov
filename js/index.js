document.addEventListener('partialsLoaded',async () => {
    await import('./products-service.js');
    await import('./admin.js');
    await import('./search.js');
});
