const nightWatch = {
  src_folders: ['./e2e-tests'],
  output_folder: './e2e-tests/reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',

  selenium: {
    start_process: true,
    server_path: './node_modules/selenium-standalone/.selenium/selenium-server/3.12.0-server.jar',
    log_path: './e2e-tests/selenium-report',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': './node_modules/selenium-standalone/.selenium/chromedriver/2.40-x64-chromedriver',
      'webdriver.gecko.driver': './node_modules/selenium-standalone/.selenium/geckodriver/0.20.1-x64-geckodriver',
    },
  },

  test_settings: {
    default: {
      launch_url: 'localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      screenshots: {
        enabled: false,
        path: '',
      },
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true,
        javascriptEnabled: true,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
      chromeOptions: {
        args: [
          'window-size=1480,800',
        ],
      },
      acceptSslCerts: true,
    },
  },
};

module.exports = nightWatch;
