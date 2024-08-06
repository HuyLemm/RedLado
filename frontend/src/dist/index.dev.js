"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var loadComponent = function loadComponent(path, placeholderId, scriptPath, callback) {
    axios.get(path).then(function (response) {
      console.log("".concat(path, " loaded"));
      document.getElementById(placeholderId).innerHTML = response.data;

      if (scriptPath) {
        loadScript(scriptPath, callback);
      } else if (callback) {
        callback();
      }
    });
  };

  var loadScript = function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;

    script.onload = function () {
      console.log("".concat(src, " loaded"));
      if (callback) callback();
    };

    document.body.appendChild(script);
  };

  loadComponent('components/header/header.html', 'header-placeholder', 'components/header/header.js');
  loadComponent('components/footer/footer.html', 'footer-placeholder', 'components/footer/footer.js');
  loadComponent('pages/homePage/homePage.html', 'app-placeholder', 'pages/homePage/homePage.js');
  loadComponent('components/modals/signInModal/signInModal.html', 'modals-placeholder', null, function () {
    var signInModalStyle = document.createElement('link');
    signInModalStyle.rel = 'stylesheet';
    signInModalStyle.href = 'components/modals/signInModal/signInModal.module.css';
    document.head.appendChild(signInModalStyle);
    loadScript('components/modals/signInModal/signInModal.js');
  });
});