'use strict';

angular.module('rpgBuddy.navigation')
.directive('navigation', NavigationDirective);

function NavigationDirective(){
    return {
        templateUrl: "navigation/navigation.html"
    }
}
