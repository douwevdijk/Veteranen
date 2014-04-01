angular.module('veteranenF.controllers', [])

.controller('AppCtrl', function($scope) {

	

})

.controller('lgCtrl', function($scope, $location, $timeout, $ionicLoading, auth) {

	$scope.msgIn = false;

	$scope.loading = function () {
	
		$ionicLoading.show({
		content: 'FF Checken',
		animation: 'fade-in',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,  
		});
		
	}
		
	$scope.chAccount = function () {
	
		auth.chAccount('douwevdijk@hotmail.com').success(function(data) {

		  if(!data) {
		  
			$scope.msgIn = true;
			$timeout(function () { $scope.msgIn = false; }, 3000);
		  } else {
		  
		    $location.path('app/playlists');
			
		  }
		  
		});
	}
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
