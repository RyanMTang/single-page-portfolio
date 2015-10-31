var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    activeTab: 'home'
  })

  .when('/portfolio', {
    activeTab: 'portfolio'
  })

  .when('/about', {
    activeTab: 'about'
  })

  .when('/contact', {
    activeTab: 'contact'
  });

});

mainApp.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function() {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
});

mainApp.controller('mainController', function($scope, $route) {
  $scope.$route = $route;
});

mainApp.controller('portfolioController', function($scope){
  $scope.projects = [
    {
      'title': 'Feed Reader Testing',
      'imageLoc': 'img/project6.png',
      'description': 'The goal of this project was to learn about testing with JavaScript. I wrote a number of test suites using Jasmine in order to test the business logic, event handling, and DOM manipulation of an existing application.',
      'link': 'https://github.com/rtang91/Udacity-P6-Feed-Reader-Testing' 
    },
    {
      'title': 'Health tracker app',
      'imageLoc': 'img/health-tracker.png',
      'description': 'This project helped me learn Backbone.js by creating a single page app that tracks calorie intake by searching for food items and adding them to a list. The nutritional information is provided using the Nutritionix API.',
      'link': 'https://github.com/rtang91/Udacity-P5-2-Health-Tracker-Project' 
    },
    {
      'title': 'Neighborhood Map',
      'imageLoc': 'img/neighborhood-map.png',
      'description': "The main objective of this project was to help me learn knockout as well as how to use asynchronous API's. I used the google maps API to display some of my favorite places to visit in Ottawa, ON.",
      'link': 'https://github.com/rtang91/Udacity-P5-1-Neighborhood-Map-Project'
    },
    {
      'title': 'Website Optimization',
      'imageLoc': 'img/project4.png',
      'description': 'The main goal of this project was to learn about the critical rendering path and how to make websites run smoothly. I was given a website which I optimized to achieve a PageSpeed Insights score that was above 90, and I optimized one of the pages to run consistently at 60 frames per second.',
      'link': 'https://github.com/rtang91/Udacity-P4-Website-Optimization'
    },
    {
      'title': 'Arcade Game Clone',
      'imageLoc': 'img/arcade-game.png',
      'description': 'The purpose of this project was to gain experience in object-oriented JavaScript by adding players and enemies to a game resembling the classic arcade game Frogger.',
      'link': 'https://github.com/rtang91/Udacity-P3-1-Arcade-Game'
    },
    {
      'title': 'Interactive Resume',
      'imageLoc': 'img/project2.png',
      'description': 'The goal of this project was to create a resume that uses JavaScript to dynamically fill in content. This project allowed me to practice working with JavaScript objects and helped me understand how jQuery can shorten the time it takes to make a website.',
      'link': 'https://github.com/rtang91/Udacity-P2-Resume'
    }
  ];
});

mainApp.controller('aboutController', function($scope) {
  $scope.about = {
    'paragraph': "Hi, my name is Ryan Tang and this is my design portfolio where I share some of my most recent work. When I'm not building things, I enjoy working out, playing basketball, and reading.",
    'alt': 'Photograph of Ryan Tang',
    'imageLoc': 'img/profile.jpg',
    'mapHeading': "Places I've Worked and Lived"
  }

  var styleArray = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#badfda"},{"visibility":"on"}]}];

  var mapOptions = {
    scrollwheel: false,
    styles: styleArray
  }

  $scope.map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);

  $scope.locations = [ 
    {
      'lat': 51.0486, 
      'lng': -114.0708,
      'title': 'Calgary'
    },
    {
      'lat': 48.4222, 
      'lng': -123.3657,
      'title': 'Victoria'
    },
    {
      'lat': 54.5970, 
      'lng': -5.9300,
      'title': 'Belfast'
    },
    {
      'lat': 22.5500, 
      'lng': 114.1000,
      'title': 'Shenzhen'
    },
    {
      'lat': 42.9837, 
      'lng': -81.2497,
      'title': 'London'
    },
    {
      'lat': 54.2667, 
      'lng': -110.7500,
      'title': 'Bonnyville'
    },
    {
      'lat': 39.9167, 
      'lng': 116.3833,
      'title': 'Beijing'
    },
    {
      'lat': 26.2667, 
      'lng': 50.1500,
      'title': 'Dhahran'
    },
    {
      'lat': 44.2333, 
      'lng': -76.5000,
      'title': 'Kingston'
    },
    {
      'lat': 45.4214, 
      'lng': -75.6919,
      'title': 'Ottawa'
    }
  ];

  var markers = [];

  for (i=0; i<$scope.locations.length; i++) {
    var marker = new google.maps.Marker ({
      position: new google.maps.LatLng($scope.locations[i].lat, $scope.locations[i].lng),
      map: $scope.map,
      title: $scope.locations[i].title
    });
    markers.push(marker);
  }

  var bounds = new google.maps.LatLngBounds();
  for(i=0;i<markers.length;i++) {
  bounds.extend(markers[i].getPosition());
  }

  $scope.map.fitBounds(bounds);
});