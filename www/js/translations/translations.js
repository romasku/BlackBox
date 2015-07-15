angular.module('starter.translations', ['starter.translations.en', 'starter.translations.ru', 'starter.translations.ua'])
    .config(function($translateProvider) {
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
        $translateProvider.useSanitizeValueStrategy(null);
    });