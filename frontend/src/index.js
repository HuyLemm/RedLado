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
      })
      .catch(error => {
        console.error(`Error loading ${path}:`, error);
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

  const setupNavigation = () => {
    const links = document.querySelectorAll('a[data-link]');
    links.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
        const targetPage = link.getAttribute('data-link');
        if (targetPage) {
          loadPage(targetPage);
        }
      });
    });
  };

  const loadPage = (page) => {
    let pagePath, scriptPath, urlPath;
    
    switch(page) {
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
    }

    // Thay đổi URL trong thanh địa chỉ
    window.history.pushState({page}, "", urlPath);

    // Tải nội dung trang vào app-placeholder
    loadComponent(pagePath, 'app-placeholder', scriptPath);
  };

  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    } else {
      loadPage('homepage');
    }
  });

  loadComponent('components/header/header.html', 'header-placeholder', 'components/header/header.js', setupNavigation);
  loadComponent('components/footer/footer.html', 'footer-placeholder', 'components/footer/footer.js');
  loadComponent('components/modals/signInModal/signInModal.html', 'modals-placeholder', 'components/modals/signInModal/signInModal.js', () => {
    const signInModalStyle = document.createElement('link');
    signInModalStyle.rel = 'stylesheet';
    signInModalStyle.href = 'components/modals/signInModal/signInModal.module.css';
    document.head.appendChild(signInModalStyle);
  });

  // Tải trang mặc định là homepage khi trang được tải lần đầu
  loadPage('homepage');
});
