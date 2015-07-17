angular.module('starter.translations.ru', ['pascalprecht.translate']).config(function ($translateProvider) {
    $translateProvider.translations('ru', {
        Level: 'Уровень',
        Question: 'Вопрос',
        Select_level: 'Выбор уровня',
        Menu: 'Меню',
        Main_menu: 'Главное меню',
        Settings: 'Настройки',
        Ask: 'Спросить',
        Answer: 'Ответить',
        Your_number: 'Ваше число',
        Incorrect_number: 'Некорректное число',
        Please_lower_number: 'Пожалуйста, введите число меньше данного',
        Please_greater_number: 'Пожалуйста, введите число больше данного',
        Please_valid_number: 'Пожалуйста, введите корректное число',
        Cancel: 'Отмена',
        Wrong_answer: 'Неправильный ответ',
        Correct_answer_was: 'Правильный ответ был',
        Congratulations: 'Поздравляем',
        Level_complete: 'Вы успешно завершили этот уровень',
        Play: 'Играть'
    });
});