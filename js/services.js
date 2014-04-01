angular.module('veteranenF.services', [])

	.factory('onlineStatus', ["$window", "$rootScope", function ($window, $rootScope) {
		var onlineStatus = {};

		function checkConnection() {
			var networkState = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN]  = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.CELL]     = 'Cell generic connection';
			states[Connection.NONE]     = 'No network connection';

			return ( (states[networkState])=='No network connection' || (states[networkState])=='Unknown connection' )? false: true;


		}

		onlineStatus.onLine = checkConnection();

		onlineStatus.isOnline = function() {
			return onlineStatus.onLine;
		}

		$window.addEventListener("online", function () {
			onlineStatus.onLine = true;
			$rootScope.$digest();
		}, true);

		$window.addEventListener("offline", function () {
			onlineStatus.onLine = false;
			$rootScope.$digest();
		}, true);

		return onlineStatus;

	}])
	
	.factory('auth', function ($window, $http) {

	 	return {

			chAccount : function (email) {

			   var promise = $http.get('http://www.dropandreport.nl:8081/account/' + email).success(function (data) { return data; } );
							 return promise;
			}
		}

	})
