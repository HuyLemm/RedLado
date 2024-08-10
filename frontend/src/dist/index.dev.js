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
    })["catch"](function (error) {
      console.error("Error loading ".concat(path, ":"), error);
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

  var setupNavigation = function setupNavigation() {
    var links = document.querySelectorAll('a[data-link]');
    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        var targetPage = link.getAttribute('data-link');

        if (targetPage) {
          loadPage(targetPage);
        }
      });
    });
  };

  var loadPage = function loadPage(page) {
    var pagePath, scriptPath, urlPath;

    switch (page) {
      case 'homepage':
        pagePath = 'pages/homePage/homePage.html';
        scriptPath = 'pages/homePage/homePage.js';
        urlPath = '/';
        break;

      case 'games':
        pagePath = 'pages/games/games.html';
        scriptPath = 'pages/games/games.js';
        urlPath = '/games';
        break;
      // Thêm các trang khác nếu có

      default:
        pagePath = 'pages/homePage/homePage.html';
        scriptPath = 'pages/homePage/homePage.js';
        urlPath = '/';
    } // Thay đổi URL trong thanh địa chỉ


    window.history.pushState({
      page: page
    }, "", urlPath); // Tải nội dung trang vào app-placeholder

    loadComponent(pagePath, 'app-placeholder', scriptPath);
  };

  window.addEventListener('popstate', function (event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    } else {
      loadPage('homepage');
    }
  });
  loadComponent('components/header/header.html', 'header-placeholder', 'components/header/header.js', setupNavigation);
  loadComponent('components/footer/footer.html', 'footer-placeholder', 'components/footer/footer.js');
  loadComponent('components/modals/signInModal/signInModal.html', 'modals-placeholder', 'components/modals/signInModal/signInModal.js', function () {
    var signInModalStyle = document.createElement('link');
    signInModalStyle.rel = 'stylesheet';
    signInModalStyle.href = 'components/modals/signInModal/signInModal.module.css';
    document.head.appendChild(signInModalStyle);
  }); // Tải trang mặc định là homepage khi trang được tải lần đầu

  loadPage('homepage');
});