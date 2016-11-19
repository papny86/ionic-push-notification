angular.module('starter.controllers', [])

.controller('PushCtrl', function($scope, $http, $cordovaPushV5, $cordovaDialogs, $ionicPlatform, appConfig){

	$scope.deviceToken = "";

	$ionicPlatform.ready(function() {

		config =  {
			android: {
				senderID: "854832472486"
			},
			ios: {
				alert: 'true',
				badge: true,
				sound: 'false',
				clearBadge: true
			}
		};

		$cordovaPushV5.initialize(config).then(function(result) {
			$cordovaPushV5.onNotification();
			$cordovaPushV5.onError();
			$cordovaPushV5.register().then(function(registrationID) {
				$scope.deviceToken = registrationID;
			}, function(err) {
				alert(err);
			});
		}, function(err) {
			alert(err);
		});
	});

	$scope.deviceId = function()
	{
		$cordovaDialogs.alert('My phone device id is ' + $scope.deviceToken, 'Device ID', 'OK');
	}

	$scope.registerDevice = function(){

		$http.post(appConfig.apiEndPoint + "adddevice", 
		{ 
			"device_id": $scope.deviceToken 
		})
		.then(function(response){
			$cordovaDialogs.alert('Device has been registered successfully', 'Device ID', 'OK');
		}, function(error){
			$cordovaDialogs.alert('Error: ' + JSON.stringify(error), 'Error Device ID', 'OK');
		});
	}

	$scope.notification = false;

	$scope.acceptNotification = function(){

		if ($scope.notification == false){
			$scope.notification = true;
		}else{
			$scope.notification = false;
		}
	}
})