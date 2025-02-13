let currentStory = 1;
const totalStories = 8;
const storyDots = document.querySelectorAll('.story-dot');
const likeButtons = document.querySelectorAll('.like-button');
const heartIcons = document.querySelectorAll('.heart-icon');

function nextStory() {
    const currentStoryElement = document.getElementById(`story${currentStory}`);
    const nextStoryElement = document.getElementById(`story${currentStory + 1}`);

    currentStoryElement.classList.remove('active');
    nextStoryElement.classList.add('active');

    storyDots[currentStory - 1].classList.remove('active');
    storyDots[currentStory].classList.add('active');

    currentStory++;

    if (currentStory > totalStories) {
        currentStory = 1;
        nextStoryElement.classList.remove('active');
        document.getElementById(`story${currentStory}`).classList.add('active');
        storyDots[totalStories - 1].classList.remove('active');
        storyDots[currentStory - 1].classList.add('active');
    }
}

setInterval(nextStory, 5000);

window.addEventListener('load', function() {
    // Создаём объект аудио
    const audio = new Audio('music.mp3');
    
    // Устанавливаем небольшой таймаут для воспроизведения звука
    setTimeout(function() {
        audio.play().catch(error => {
            console.log('Ошибка воспроизведения звука:', error);
        });
    }, 100); // задержка 1 секунда
});


// Обработка лайков
heartIcons.forEach(heartIcon => {
    let isLiked = false; // Изначально не лайкнуто

    heartIcon.addEventListener('click', () => {
        isLiked = !isLiked;

        if (isLiked) {
            heartIcon.classList.add('active'); // Добавляем класс active (красное сердечко)

            // Клонируем сердечко для анимации
            const flyingHeart = heartIcon.cloneNode(true);
            flyingHeart.classList.remove('active');
            flyingHeart.classList.add('flying');

            // Получаем родительский элемент (кнопку)
            const parentRect = heartIcon.getBoundingClientRect();
            const x = parentRect.left + parentRect.width / 2 - flyingHeart.offsetWidth / 2;
            const y = parentRect.top - flyingHeart.offsetHeight;

            // Устанавливаем позицию клонированного сердечка относительно родителя
            flyingHeart.style.position = 'absolute';
            flyingHeart.style.left = `${x}px`;
            flyingHeart.style.top = `${y}px`;
            document.body.appendChild(flyingHeart);

            // Удаляем сердечко после завершения анимации
            setTimeout(() => {
                flyingHeart.remove();
            }, 1500);
        } else {
            heartIcon.classList.remove('active'); // Убираем класс active (белое сердечко)
        }
    });
});


// Генерация случайных звёзд
for (let i = 0; i < 150; i++) {
    let star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + 'vw'; /* Случайное положение по горизонтали */
    star.style.top = Math.random() * 100 + 'vh'; /* Случайное положение по вертикали */
    star.style.animationDelay = Math.random() * 3 + 's'; /* Задержка перед падением */
    document.getElementById('story3').appendChild(star);
}
// Генерация случайных огоньков
for (let i = 0; i < 50; i++) {
    let sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    document.getElementById('story6').appendChild(sparkle);
}