const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainContainer = document.getElementById('main-container');
const celebrationContainer = document.getElementById('celebration');

let yesScale = 1;

function moveNoButton(e) {
    if (e) {
        e.preventDefault(); // 기본 동작(클릭 등) 방지
        e.stopPropagation(); // 이벤트 전파 방지
    }

    // 버튼 크기와 화면 크기 계산
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const padding = 20;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    // 안전한 랜덤 좌표 생성
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
    
    // 위치 적용
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.margin = '0';

    // "좋아" 버튼 키우기
    yesScale += 0.15;
    if (yesScale > 15) yesScale = 15;
    yesBtn.style.transform = `scale(${yesScale})`;

    // 모바일 진동 효과 (지원되는 기기에서만)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// [데스크톱] 마우스만 올라가도 도망
noBtn.addEventListener('mouseenter', moveNoButton);

// [모바일] 터치하는 순간 도망
noBtn.addEventListener('touchstart', moveNoButton, { passive: false });

// [공통] 혹시나 클릭이 발생해도 도망 (키보드 탭 등 대응)
noBtn.addEventListener('click', moveNoButton);

// 화면 크기가 바뀔 때 버튼이 화면 밖에 있으면 안으로 불러오기
window.addEventListener('resize', () => {
    if (noBtn.style.position === 'fixed') {
        const rect = noBtn.getBoundingClientRect();
        if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
            moveNoButton();
        }
    }
});

yesBtn.addEventListener('click', () => {
    mainContainer.classList.add('hidden');
    celebrationContainer.classList.remove('hidden');
    startHeartRain();
});

function startHeartRain() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}
