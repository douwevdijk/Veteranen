angular.module('veteranenF.controllers', [])

.controller('AppCtrl', function($scope, $http) {

  var PushNotApp = PushNotApp || {};

  PushNotApp.main = (function () {

      var pushNotification = window.plugins.pushNotification,

          showAlert = function (message, title) {
              if (navigator.notification) {
                  navigator.notification.alert(message, null, title, 'Sluit');
                  navigator.notification.vibrate(1000);
              } else {
                  alert(title ? (title + ": " + message) : message);
              }
          },

          addCallback = function (key, callback) {
              if (window.callbacks === undefined) {
                  window.callbacks = {};
              }
              window.callbacks[key] = callback;
          },

          addNotification = function (notificationTxt) {
              var el = document.getElementById('notification');
              el.innerHTML += notificationTxt;
          },

          registrationSuccessHandler = function (token) {
              addCallback('notificationHandler', notificationHandler);
              $http.post('http://www.dropandreport.nl:8081/device', {'device': token});
          },

          registrationFailedHandler = function (error) {
              showAlert(error, "Error");
          },

          notificationHandler = function (evt) {
              showAlert(evt.alert, 'Message');
          },

          deviceReady = function () {
              if (parseFloat(device.version) === 7.0) {}
              pushNotification.register(registrationSuccessHandler,
                  registrationFailedHandler, {
                      "badge": "true",
                      "sound": "true",
                      "alert": "true",
                      "ecb": "callbacks.notificationHandler"
                  });
          },
          initialize = function () {
              document.addEventListener("deviceready", deviceReady, false);
          }

      return {
          initialize: initialize
      }

  }());

  PushNotApp.main.initialize();

})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
