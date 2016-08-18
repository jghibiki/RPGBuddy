'use strict';

angular.module('rpgBuddy.version', [
  'rpgBuddy.version.interpolate-filter',
  'rpgBuddy.version.version-directive'
])

.value('version', '0.3');
