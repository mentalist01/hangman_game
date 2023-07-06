// Массив доступных для игры слов
const words = ['дом', 'рыба', 'книга', 'душа', 'жизнь', 'лес', 'мир', 'дача', 'ребро', 'гора', 'часы', 'небо', 'рука', 'овца', 'звук', 'луна', 'свет', 'кость', 'лужа', 'знак', 'лось', 'рада', 'конь', 'глаз', 'лиса', 'куст', 'лист', 'гриб', 'свет', 'щит', 'лапа', 'облако', 'нить', 'шаг', 'зверь', 'бревно', 'пыль', 'ромашка', 'колесо', 'руль', 'копыто', 'крыльцо', 'дождь', 'трава', 'зола', 'веревка', 'провод', 'ветка', 'забота', 'речка', 'гусь', 'гнездо', 'птица', 'береза', 'бутон', 'ящик', 'груша', 'рог', 'кедр', 'хвост', 'дно', 'сосна', 'вода', 'кружка', 'мандарин', 'бокал', 'карта', 'курица', 'лимон', 'обувь', 'палка', 'пенал', 'печенье', 'степь', 'резинка', 'стропа', 'муха', 'паук', 'печать', 'борода', 'щенок', 'яблоко', 'капуста', 'хлеб', 'омлет', 'макарон', 'арбуз', 'дерево', 'банан', 'кровать', 'обезьяна', 'коробка', 'комод', 'карандаш', 'мебель', 'кресло', 'лампа', 'книжка', 'носки', 'подушка'];

// Выбираем случайное слово из 83 для текущей игры
const currentWord = words[Math.round(Math.random() * 83)];

// Получаем блок, в котором находится угадываемое слово и заполняем пустыми кнопками слово, которое надо угадать
const word = document.querySelector("#word");
for (let i = 0; i < currentWord.length; i++) {
    const newElement = document.createElement('button');
    word.append(newElement);
}

// Также выводим слово в окно победы и поражения
const end = document.querySelectorAll(".end");
end.forEach((item)=>{
    for (let i = 0; i < currentWord.length; i++) {
        const newElement = document.createElement('button');
        newElement.innerHTML=currentWord[i];
        item.append(newElement);
    }
})


// Получаем коллекцию кнопок, которые находятся внутри блока word
const wordChildren = word.children;

// Клавиатура визуальная
const keyboard = document.querySelector(".keyboard");

// Счетчик ошибочных выборов буквы
let mistakesCount = 0;

// Счетчик правильных выборов буквы
let rightCount = 0;

// Получаем всплывающее победное окно
let winPopup = document.querySelector(".popup");

// Получаем кнопку, для начала новой игры, и при нажатии обновляем страницу
let winButton = winPopup.querySelector(".play-again-button");
winButton.onclick = function () {
    location.reload();
}


console.log(currentWord);

// Получаем элементы виселицы в коллекцию и скрываем их
const hangElements = document.querySelector(".hangman").children;
for (let el of hangElements) {
    el.style.visibility = "hidden";
}

// Получение окна проигрыша и кнопки закрытия
const defeatPopup = document.querySelector(".modal-container");
const defeatButton = document.querySelector(".close-modal");
defeatButton.addEventListener("click", function () {
    location.reload();
});

// Добавляем обработчик событий к каждой кнопке-букве с помощью делегирования через родительский блок keyboard, чтобы она печаталась, при условии что буква не ошибочная

keyboard.addEventListener("click", function (event) {
    // Если нажата именно кнопка
    if (event.target.closest('button')) {
        const letter = event.target;
        // Проверка, если кнопка еще не была нажата
        if (!(letter.classList.contains("right") || letter.classList.contains("wrong"))) {
            fl = false;
            // Проходимся по всем буквам в слове чтобы понять попал ли пользователь в одну из них
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] == letter.textContent.toLowerCase() && wordChildren[i].textContent == "") {
                    fl = true;
                    // Добавление класса right к букве если прав, она будет зеленой
                    letter.classList.add("right");
                    // Записываем в нужную ячейку эту букву
                    wordChildren[i].textContent = letter.textContent;
                    // Прибавляем счетчик угадываний, когда он станет равен длине слова, мы победили
                    rightCount++;
                    if (rightCount == currentWord.length) {
                        winPopup.style.visibility = "visible";
                    }
                }
            }
            if (!fl) {
                // Добавление класса wrong к буке если ошибся, она будет красной
                letter.classList.add("wrong");
                hangElements[mistakesCount].style.visibility = "visible";
                mistakesCount++;
                // Если проигрыш, показываем слово и вылезает окно
                if (mistakesCount >= 8) {
                    defeatPopup.style.visibility = "visible";
                }
            }
        }

    }
})

// Добавляем обработчик для клавиш клавиатуры
// Функция для проверки нажатой клавиши
function isRussianLetter(str) {
    return /^[а-яА-ЯёЁ]+$/.test(str);
}
document.addEventListener("keydown",function(event){
    console.log(event.key);
    if(isRussianLetter(event.key)){
        // Получаем letter на виртуальной клавиатуре, чтобы проверить, была ли она нажата
        let letter;
        const letters = keyboard.children;
        for(const l of letters){
            if(l.textContent.toLowerCase()===event.key.toLowerCase()){
                letter = l;
                break;
            }
        }
        
        // Проверка, если кнопка еще не была нажата
        if (!(letter.classList.contains("right") || letter.classList.contains("wrong"))) {
            fl = false;
            // Проходимся по всем буквам в слове чтобы понять попал ли пользователь в одну из них
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] == letter.textContent.toLowerCase() && wordChildren[i].textContent == "") {
                    fl = true;
                    // Добавление класса right к букве если прав, она будет зеленой
                    letter.classList.add("right");
                    // Записываем в нужную ячейку эту букву
                    wordChildren[i].textContent = letter.textContent;
                    // Прибавляем счетчик угадываний, когда он станет равен длине слова, мы победили
                    rightCount++;
                    if (rightCount == currentWord.length) {
                        winPopup.style.visibility = "visible";
                    }
                }
            }
            if (!fl) {
                // Добавление класса wrong к буке если ошибся, она будет красной
                letter.classList.add("wrong");
                hangElements[mistakesCount].style.visibility = "visible";
                mistakesCount++;
                // Если проигрыш, показываем слово и вылезает окно
                if (mistakesCount >= 8) {
                    defeatPopup.style.visibility = "visible";
                }
            }
        }
    }
})