// 模拟韩语单词数据
const wordList = [
    { korean: '안녕하세요', chinese: '你好', level: 'easy' },
    { korean: '감사합니다', chinese: '谢谢', level: 'easy' },
    { korean: '미안합니다', chinese: '对不起', level: 'easy' },
    { korean: '반갑습니다', chinese: '很高兴见到你', level: 'medium' },
    { korean: '도와주세요', chinese: '请帮帮我', level: 'medium' },
    { korean: '잘 부탁드립니다', chinese: '请多多关照', level: 'medium' },
    { korean: '사랑합니다', chinese: '我爱你', level: 'hard' },
    { korean: '죄송합니다', chinese: '非常抱歉', level: 'hard' },
    { korean: '성공하길 바랍니다', chinese: '祝你成功', level: 'hard' }
];

let currentIndex = 0;
const favoriteList = [];
let filteredList = [...wordList];

// 初始化页面显示第一个单词
function init() {
    updateWordDisplay();
}

// 更新单词显示
function updateWordDisplay() {
    if (filteredList.length === 0) {
        document.getElementById('korean-word').textContent = '无匹配单词';
        document.getElementById('chinese-meaning').textContent = '';
        return;
    }
    const currentWord = filteredList[currentIndex];
    document.getElementById('korean-word').textContent = currentWord.korean;
    document.getElementById('chinese-meaning').textContent = currentWord.chinese;
}

// 显示中文释义
function showChinese() {
    const chineseMeaning = document.getElementById('chinese-meaning');
    chineseMeaning.style.display = chineseMeaning.style.display === 'none' ? 'inline' : 'none';
}

// 显示下一个单词
function nextWord() {
    if (filteredList.length > 0) {
        currentIndex = (currentIndex + 1) % filteredList.length;
        updateWordDisplay();
        document.getElementById('chinese-meaning').style.display = 'none';
    }
}

// 随机显示一个单词
function randomWord() {
    if (filteredList.length > 0) {
        currentIndex = Math.floor(Math.random() * filteredList.length);
        updateWordDisplay();
        document.getElementById('chinese-meaning').style.display = 'none';
    }
}

// 收藏当前单词
function favoriteWord() {
    const currentWord = wordList[currentIndex];
    if (!favoriteList.some(word => word.korean === currentWord.korean)) {
        favoriteList.push(currentWord);
        alert('已收藏该单词！');
    } else {
        alert('该单词已在收藏列表中！');
    }
}

// 显示收藏列表
function showFavoriteList() {
    const favoriteContainer = document.getElementById('favorite-list');
    if (favoriteList.length === 0) {
        favoriteContainer.textContent = '收藏列表为空';
    } else {
        favoriteContainer.innerHTML = favoriteList.map(word => `
            <div>${word.korean} - ${word.chinese} (${getLevelText(word.level)})</div>
        `).join('');
    }
    favoriteContainer.style.display = favoriteContainer.style.display === 'none' ? 'block' : 'none';
}

// 根据等级获取文本
function getLevelText(level) {
    switch (level) {
        case 'easy': return '简单';
        case 'medium': return '中等';
        case 'hard': return '高级';
        default: return '';
    }
}

// 筛选单词
function filterWords() {
    const filterValue = document.getElementById('word-filter').value;
    
    if (filterValue === 'favorite') {
        filteredList = [...favoriteList];
    } else if (filterValue === 'all') {
        filteredList = [...wordList];
    } else {
        filteredList = wordList.filter(word => word.level === filterValue);
    }
    
    currentIndex = 0;
    updateWordDisplay();
    // 筛选时隐藏收藏列表面板
    document.getElementById('favorite-list').style.display = 'none';
}

// 初始化筛选器
function init() {
    updateWordDisplay();
    filterWords();
}

// 页面加载完成后初始化
window.onload = init;