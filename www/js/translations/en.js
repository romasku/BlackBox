angular.module('starter.translations.en', ['pascalprecht.translate']).config(function ($translateProvider) {
    $translateProvider.translations('en', {
        Level: 'Level',
        Question: 'Question',
        Select_level: 'Select level',
        Menu: 'Menu',
        Main_menu: 'Main menu',
        Settings: 'Settings',
        Ask: 'Ask',
        Answer: 'Answer',
        Your_number: 'Your Number',
        Incorrect_number: 'Incorrect number',
        Please_lower_number: 'Please, enter a lower number',
        Please_greater_number: 'Please, enter a greater number',
        Please_valid_number: 'Please, enter a valid number',
        Cancel: 'Cancel',
        Wrong_answer: 'Wrong answer',
        Correct_answer_was: 'Correct answer was',
        Congratulations: 'Congratulations',
        Level_complete: 'You successfully completed this level',
        Play: 'Play',
        Quit: 'Quit',
        Attempts_done: 'Attempts done:',
        Select_chapter: 'Select chapter',
        Chapter_1: 'First chapter',
        Chapter_2: 'Second chapter',
        Chapter_3: 'Third chapter'
    });
});