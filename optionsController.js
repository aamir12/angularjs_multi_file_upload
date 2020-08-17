var app = angular.module('myApp', []);
app.controller('optionController', function($scope,$http,$timeout) {
  $scope.Options = [];
  $scope.editOptions = [
    {
    optionKey:'Chandarkant singh',
    sortOrder:'1',
    img:'uploads/5f3a191686b5f.jpeg'
    },
    {
        optionKey:'Brijesh verma',
        sortOrder:'2',
        img:'uploads/5f3a191684788.jpeg'
    },
];
  $scope.maximumImgs = 4;
  $scope.addOption = function(){
	$scope.Options.push({
		optionKey:'',
        sortOrder:'',
        img:''
	})
  } 

  $scope.addEditOption = function(){
	$scope.editOptions.push({
		optionKey:'',
        sortOrder:'',
        img:''
	})
  } 

  $scope.deleteEditOption = function(index){
	$scope.editOptions.splice(index, 1);
  }

  $scope.deleteOption = function(index){
	$scope.Options.splice(index, 1);
  }

  $scope.chooseImg = function(index){
      $("#img_"+index).click();
  }

  $scope.chooseEditImg = function(index){
    $("#editImg_"+index).click();
  }

  $scope.removeImg = function(index){
    $scope.Options[index].img = '';
  }

  $scope.removeEditImg = function(index){
    $scope.editOptions[index].img = '';
  }

  
  $scope.saveOption = function(){
    
    $http({
		method: 'POST',
		url: 'server.php',
		data:{action:'add',body:$scope.Options},
		headers: {
			'Content-Type': "application/json"
		}
	}).then(function successCallback(res) {
        let data = res.data;
        console.log(data)
		if(data.status){
           alert('Add successfully upload');
           $scope.Options = [];
		}
	}, function errorCallback(error) {
		console.log('Error');
		console.log(error);
	});
  }

  $scope.updateOption = function(){
    $http({
		method: 'POST',
		url: 'server.php',
		data:{action:'edit',body:$scope.editOptions},
		headers: {
			'Content-Type': "application/json"
		}
	}).then(function successCallback(res) {
        let data = res.data;
        console.log(data)
		if(data.status){
           alert('Edit successfully');
           $scope.editOptions = [];
		}
	}, function errorCallback(error) {
		console.log('Error');
		console.log(error);
	});
  }

});

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var fileInput = document.getElementById(attributes.id);  
                var filePath = fileInput.value;
                // Allowing file type 
                var allowedExtensions =  
                        /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
                if (!allowedExtensions.exec(filePath)) { 
                    alert('Invalid file type'); 
                    fileInput.value = ''; 
                    return false; 
                }else{
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }
                
            });
        }
    }
}]);

app.directive('tonumber', function() {
	return {
	  require: 'ngModel',
	  link: function(scope, element, attrs, ngModel) {
		ngModel.$parsers.push(function(value) {
		  return '' + value;
		});
		ngModel.$formatters.push(function(value) {
		  return parseFloat(value);
		});
	  }
	};
});


