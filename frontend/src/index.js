document.addEventListener('DOMContentLoaded', function() {
  const loadComponent = (path, placeholderId, scriptPath, callback) => {
    axios.get(path)
      .then(response => {
        console.log(`${path} loaded`);
        document.getElementById(placeholderId).innerHTML = response.data;
        if (scriptPath) {
          loadScript(scriptPath, callback);
        } else if (callback) {
          callback();
        }
      });
  };

  const loadScript = (src, callback) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log(`${src} loaded`);
      if (callback) callback();
    };
    document.body.appendChild(script);
  };

  loadComponent('components/header/header.html', 'header-placeholder', 'components/header/header.js');
  loadComponent('components/footer/footer.html', 'footer-placeholder', 'components/footer/footer.js');
  loadComponent('pages/homePage/homePage.html', 'app-placeholder', 'pages/homePage/homePage.js');
  loadComponent('components/modals/signInModal/signInModal.html', 'modals-placeholder', null, () => {
    const signInModalStyle = document.createElement('link');
    signInModalStyle.rel = 'stylesheet';
    signInModalStyle.href = 'components/modals/signInModal/signInModal.module.css';
    document.head.appendChild(signInModalStyle);
    loadScript('components/modals/signInModal/signInModal.js');
  });
});
