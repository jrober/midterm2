angular.module('comment', [])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
		$scope.comments = [];
		$scope.addPost = function()  {
			var newObject = {title:$scope.formContent, ordered:0}
			$scope.comments.push(newObject);
			if($scope.formContent === '') { return; }
      				console.log("In addComment with "+$scope.title);
      				$scope.create({
        				title: $scope.title,
                price: $scope.price,
                url: $scope.url,
        				ordered: 0,
                cart: 0,
      					});
      				$scope.title = '';
              $scope.price = '';
              $scope.url = '';
              $scope.getAll();
			}
		$scope.upvote = function(comment) {
      			return $http.put('/comments/' + comment._id + '/upvote')
      			.success(function(data){
         		console.log("upvote worked");
          		comment.ordered += 1;
        	});
    		};

		$scope.incrementUpvotes = function(comment) {
			$scope.upvote(comment);
		}

		$scope.getAll = function() {
    			return $http.get('/comments').success(function(data){
     			angular.copy(data, $scope.comments);
    			});
  		};
		$scope.delete = function(comment) {
            console.log('in delete controller');
      			$http.delete('/comments/' + comment._id )
        		.success(function(data){
          		console.log("delete worked");
        	});
      $scope.getAll();
    };
  	$scope.getAll();
		$scope.create = function(comment) {
			console.log('in create');
			console.log(comment);
    			return $http.post('/comments', comment).success(function(data){
				console.log('inpost');
    			});
  		};

    $scope.addToCart = function(comment) {
            return $http.put('/comments/' + comment._id + '/addToCart')
            .success(function(data){
            console.log("addCart worked");
          });
        };

    $scope.deleteCart = function(comment) {
        return $http.put('/comments/' + comment._id + '/deleteCart')
        .success(function(data){
        console.log("deleteCart worked");
      });
    };

    $scope.submitPurchase = function() {
      angular.forEach($scope.comments, function(value, key){
      $scope.deleteCart(value)
      if(value.selected == 1)
         $scope.incrementUpvotes(value);
         $scope.addToCart(value);
      });
    };
    $scope.getAll();
 
  }
]);
