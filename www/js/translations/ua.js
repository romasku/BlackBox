angular.module('starter.translations.ua', ['pascalprecht.translate']).config(function ($translateProvider) {
    $translateProvider.translations('ua', {
        Level: 'Рівень',
        Question: 'Питання',
        Select_level: 'Вибір рівня',
        Menu: 'Меню',
        Main_menu: 'Головне меню',
        Settings: 'Налаштування',
        Ask: 'Запитати',
        Answer: 'Відповісти',
        Your_number: 'Ваше число',
        Incorrect_number: 'Некоректне число',
        Please_lower_number: 'Будь ласка, введіть число менше за дане',
        Please_greater_number: 'Будь ласка, введіть число більше за дане',
        Please_valid_number: 'Будь ласка, введіть коректне число',
        Cancel: 'Скасувати',
        Wrong_answer: 'Невірна відповідь',
        Correct_answer_was: 'Вірна відповідь була',
        Congratulations: 'Вітаємо',
        Level_complete: 'Ви успішно завершили цей рівень',
        Play: 'Грати'
    });
});