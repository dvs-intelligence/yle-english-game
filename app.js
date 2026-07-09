/* ==========================================================================
   CAMBRIDGE YLE ENGLISH GAME DATABASE (Starters, Movers, Flyers)
   ========================================================================== */
const GAME_DATABASE = {
  starters: {
    title: "Pre A1 Starters",
    icon: "🎈",
    themes: [
      { id: "starters_match", title: "詞彙連連看", icon: "🧩", desc: "日常名詞配對", mode: "match", questions: [] },
      { id: "starters_spell", title: "單字拼拼樂", icon: "✏️", desc: "基礎單字拼寫", mode: "spell", questions: [] },
      { id: "starters_grammar", title: "語法挑戰賽", icon: "📚", desc: "介系詞與簡單代名詞", mode: "grammar", questions: [] },
      { id: "starters_listening", title: "聽力大考驗", icon: "🎧", desc: "聽發音選正確圖片", mode: "listening", questions: [] }
    ],
    vocabPool: YLE_VOCABULARY.starters,
    grammarPool: YLE_VOCABULARY.starters.filter(w => w.mode === 'grammar')
  },
  movers: {
    title: "A1 Movers",
    icon: "🚀",
    themes: [
      { id: "movers_match", title: "詞彙連連看", icon: "🧩", desc: "公共場所與天氣配對", mode: "match", questions: [] },
      { id: "movers_spell", title: "單字拼拼樂", icon: "✏️", desc: "日常生活單字拼寫", mode: "spell", questions: [] },
      { id: "movers_grammar", title: "語法挑戰賽", icon: "📚", desc: "過去式與比較級", mode: "grammar", questions: [] },
      { id: "movers_listening", title: "聽力大考驗", icon: "🎧", desc: "聽發音選正確圖片", mode: "listening", questions: [] }
    ],
    vocabPool: YLE_VOCABULARY.movers,
    grammarPool: YLE_VOCABULARY.movers.filter(w => w.mode === 'grammar')
  },
  flyers: {
    title: "A2 Flyers",
    icon: "🦅",
    themes: [
      { id: "flyers_match", title: "詞彙連連看", icon: "🧩", desc: "職業與旅行裝備配對", mode: "match", questions: [] },
      { id: "flyers_spell", title: "單字拼拼樂", icon: "✏️", desc: "高難度單字拼寫", mode: "spell", questions: [] },
      { id: "flyers_grammar", title: "語法挑戰賽", icon: "📚", desc: "條件句與完成式", mode: "grammar", questions: [] },
      { id: "flyers_listening", title: "聽力大考驗", icon: "🎧", desc: "聽發音選正確圖片", mode: "listening", questions: [] }
    ],
    vocabPool: YLE_VOCABULARY.flyers,
    grammarPool: YLE_VOCABULARY.flyers.filter(w => w.mode === 'grammar')
  }
};

/* ==========================================================================
   PROGRAMMATIC WEB AUDIO SOUND EFFECTS
   ========================================================================== */
class SoundEffectsManager {
  constructor() {
    this.ctx = null;
    this.volume = 0.7;
  }
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  
  playClick() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.06);
    
    gain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }
  
  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const playTone = (freq, startTime, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    playTone(523.25, now, 0.12); // C5
    playTone(659.25, now + 0.06, 0.2); // E5
  }
  
  playFail() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.25);
    
    gain.gain.setValueAtTime(this.volume * 0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    
    osc.start();
    osc.stop(now + 0.25);
  }
  
  playLevelClear() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    const playTone = (freq, startTime, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.22, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    playTone(523.25, now, 0.12);      // C5
    playTone(659.25, now + 0.1, 0.12);  // E5
    playTone(783.99, now + 0.2, 0.12);  // G5
    playTone(1046.50, now + 0.3, 0.4);  // C6
  }
}

const Sounds = new SoundEffectsManager();

/* ==========================================================================
   GAME ENGINE STATE & MANAGER
   ========================================================================== */
class GameEngine {
  constructor() {
    this.currentLevel = null; // starters, movers, flyers
    this.currentTheme = null; // theme object
    this.currentQuestionIdx = 0;
    this.score = 0;
    this.lives = 3;
    this.correctAnswersCount = 0;
    
    // Spelling mode states
    this.spelledWord = [];
    
    // Word Match state
    this.selectedMatchCard = null;
    this.remainingPairs = 0;

    // Vocab learned in current session
    this.sessionVocab = [];

    // Speech Configuration
    this.speechVoiceName = null;
    this.speechRate = 0.9;
    
    // UI Screens mapping
    this.screens = {
      splash: document.getElementById('splashScreen'),
      map: document.getElementById('mapScreen'),
      game: document.getElementById('gameScreen'),
      summary: document.getElementById('summaryScreen')
    };
  }

  // Get SVG vector image URL for standard emojis via Twemoji CDN
  getEmojiSvgUrl(emojiChar) {
    if (!emojiChar) return '';
    if (emojiChar.startsWith('http') || emojiChar.startsWith('./')) {
      return emojiChar;
    }
    const codePoints = [];
    for (let char of emojiChar) {
      codePoints.push(char.codePointAt(0).toString(16).toLowerCase());
    }
    const cleanCodePoints = codePoints.filter(cp => cp !== 'fe0f');
    const hexStr = cleanCodePoints.join('-');
    return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${hexStr}.svg`;
  }

  // Generate vector HTML structure with fallback
  getEmojiHtml(emojiChar, className = '') {
    if (!emojiChar) return '';
    
    // Support direct local or remote image files
    if (emojiChar.startsWith('./') || emojiChar.startsWith('http')) {
      return `<img class="emoji-vector ${className}" src="${emojiChar}" alt="image">`;
    }

    const firstCodePoint = emojiChar.codePointAt(0);
    // Fallback directly to text if it's a circle letter or generic alphanumeric
    if (firstCodePoint < 0x1F000) {
      return `<span class="emoji-text ${className}">${emojiChar}</span>`;
    }
    const url = this.getEmojiSvgUrl(emojiChar);
    return `<img class="emoji-vector ${className}" src="${url}" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';" alt="${emojiChar}"><span class="emoji-text ${className}" style="display:none;">${emojiChar}</span>`;
  }

  init() {
    this.setupListeners();
    this.generateBackgroundParticles();
    this.loadProgress();
    this.initSpeechSynth();
    this.updateDashboard();
    this.checkLogin();
  }

  checkLogin() {
    const username = localStorage.getItem('yle_quest_username');
    const modal = document.getElementById('loginModal');
    const input = document.getElementById('loginNameInput');
    const greeting = document.getElementById('userGreeting');
    const nameDisplay = document.getElementById('userNameDisplay');

    if (!username) {
      if (greeting) greeting.style.display = 'none';
      if (modal) {
        // Prevent closing via Escape key to force login
        modal.addEventListener('cancel', (e) => {
          e.preventDefault();
        });
        modal.showModal();
        if (input) input.focus();
      }
    } else {
      if (nameDisplay) nameDisplay.textContent = username;
      if (greeting) greeting.style.display = 'flex';
      if (modal) modal.close();
    }
  }

  // Generate random animated floating particles in background
  generateBackgroundParticles() {
    const container = document.getElementById('bgBubbles');
    if (!container) return;
    
    const count = 15;
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bg-bubble');
      
      const size = Math.random() * 80 + 30; // 30px to 110px
      const left = Math.random() * 100;    // percentage
      const delay = Math.random() * 20;   // seconds
      const duration = Math.random() * 15 + 15; // 15s to 30s
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDelay = `${delay}s`;
      bubble.style.animationDuration = `${duration}s`;
      
      container.appendChild(bubble);
    }
  }

  // Setup UI event handlers
  setupListeners() {
    // Logo returns to main screen
    document.getElementById('headerLogoBtn').addEventListener('click', () => {
      Sounds.playClick();
      this.switchScreen('splash');
    });

    // Reset learning progress
    document.getElementById('resetProgressBtn').addEventListener('click', () => {
      Sounds.playClick();
      if (confirm('確定要清除所有學習紀錄與成績嗎？此動作將無法復原。')) {
        this.userProgress = {
          lifetimeScore: 0,
          starters: { learnedWords: [], themes: {} },
          movers: { learnedWords: [], themes: {} },
          flyers: { learnedWords: [], themes: {} }
        };
        this.completedThemes = this.currentLevel ? this.userProgress[this.currentLevel].themes : {};
        this.saveProgress();
        
        // Remove username record to prompt for login again
        localStorage.removeItem('yle_quest_username');
        const loginNameInput = document.getElementById('loginNameInput');
        if (loginNameInput) loginNameInput.value = '';

        this.updateDashboard();
        if (this.currentLevel) {
          this.renderLevelMap();
        }
        alert('✨ 紀錄已成功重設！');
        this.checkLogin();
      }
    });

    // Settings Modal controls
    const settingsModal = document.getElementById('settingsModal');
    document.getElementById('settingsBtn').addEventListener('click', () => {
      Sounds.playClick();
      settingsModal.showModal();
    });
    document.getElementById('closeSettingsBtn').addEventListener('click', () => {
      Sounds.playClick();
      settingsModal.close();
    });
    document.getElementById('saveSettingsBtn').addEventListener('click', () => {
      Sounds.playClick();
      settingsModal.close();
    });

    // Settings adjustments
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
      Sounds.volume = parseFloat(e.target.value);
    });
    document.getElementById('speechRate').addEventListener('input', (e) => {
      this.speechRate = parseFloat(e.target.value);
      document.getElementById('speechRateVal').textContent = this.speechRate.toFixed(1);
    });
    document.getElementById('speechVoice').addEventListener('change', (e) => {
      this.speechVoiceName = e.target.value;
    });

    // Level selector cards (Screen 1)
    document.querySelectorAll('.level-card').forEach(card => {
      card.addEventListener('click', () => {
        Sounds.playClick();
        const level = card.dataset.level;
        this.selectLevel(level);
      });
    });

    // Back to Level Select from Map
    document.getElementById('mapBackBtn').addEventListener('click', () => {
      Sounds.playClick();
      this.switchScreen('splash');
    });

    // Exit Game mid-session
    document.getElementById('gameExitBtn').addEventListener('click', () => {
      Sounds.playClick();
      if (confirm('確定要退出遊戲嗎？目前的進度將不會被儲存。')) {
        if (this.currentTheme && this.currentTheme.mode === 'wrong_words_review') {
          this.switchScreen('splash');
        } else {
          this.switchScreen('map');
        }
      }
    });

    // Summary screen actions
    document.getElementById('summaryMapBtn').addEventListener('click', () => {
      Sounds.playClick();
      if (this.currentTheme && this.currentTheme.mode === 'wrong_words_review') {
        this.switchScreen('splash');
      } else {
        this.switchScreen('map');
      }
    });
    document.getElementById('summaryRestartBtn').addEventListener('click', () => {
      Sounds.playClick();
      this.startLevelGame(this.currentTheme);
    });

    // Special challenge button listener (wrong words review)
    const wrongWordsBtn = document.getElementById('wrongWordsChallengeBtn');
    if (wrongWordsBtn) {
      wrongWordsBtn.addEventListener('click', () => {
        Sounds.playClick();
        const wrongList = this.userProgress.wrongWords || [];
        if (wrongList.length === 0) {
          alert('你目前沒有任何錯字紀錄喔，太棒了！');
          return;
        }
        
        // Generate a custom review theme structure
        const reviewTheme = {
          id: 'wrong_words_review',
          title: '錯題特訓大挑戰',
          mode: 'wrong_words_review'
        };
        
        // Set level to the first wrong word's level
        if (wrongList[0] && wrongList[0].level) {
          this.currentLevel = wrongList[0].level;
        }
        
        this.startLevelGame(reviewTheme);
      });
    }

    // Export Report Modal triggers
    const reportModal = document.getElementById('reportModal');
    const exportReportBtn = document.getElementById('exportReportBtn');
    const closeReportBtn = document.getElementById('closeReportBtn');
    const closeReportBtn2 = document.getElementById('closeReportBtn2');
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    
    if (exportReportBtn && reportModal) {
      exportReportBtn.addEventListener('click', () => {
        Sounds.playClick();
        const score = this.userProgress.lifetimeScore || 0;
        if (score < 200) {
          alert('你還沒有解鎖任何榮譽勳章喔！累積達到 200 分（解鎖第一枚勳章：單字探險家 🐥）即可匯出證書，繼續加油挑戰吧！');
          return;
        }
        this.prepareReportModal();
        reportModal.showModal();
      });
    }
    
    if (closeReportBtn && reportModal) {
      closeReportBtn.addEventListener('click', () => {
        Sounds.playClick();
        reportModal.close();
      });
    }
    if (closeReportBtn2 && reportModal) {
      closeReportBtn2.addEventListener('click', () => {
        Sounds.playClick();
        reportModal.close();
      });
    }
    if (downloadReportBtn) {
      downloadReportBtn.addEventListener('click', () => {
        Sounds.playClick();
        this.downloadReportAsImage();
      });
    }

    // Login Submission controls
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const loginNameInput = document.getElementById('loginNameInput');
    
    if (loginSubmitBtn && loginNameInput) {
      const submitLogin = () => {
        const val = loginNameInput.value.trim();
        if (!val) {
          alert('請輸入你的英文名字喔！');
          loginNameInput.focus();
          return;
        }

        // Force English names only (letters, spaces, dots, hyphens) to protect privacy in GA4
        const englishPattern = /^[A-Za-z\s.\-]+$/;
        if (!englishPattern.test(val)) {
          alert('只能輸入「英文名字」或「英文暱稱」喔！(例如：Kevin，只接受英文字母、空格、點 . 或連字號 -)');
          loginNameInput.focus();
          return;
        }
        Sounds.playClick();
        localStorage.setItem('yle_quest_username', val);
        if (typeof gtag === 'function') {
          gtag('event', 'login_success', {
            'user_name': val
          });
        }
        this.checkLogin();
      };

      loginSubmitBtn.addEventListener('click', submitLogin);
      loginNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          submitLogin();
        }
      });
    }
  }

  // Speech synthesizers setup
  initSpeechSynth() {
    if (!('speechSynthesis' in window)) return;
    
    const populateVoicesList = () => {
      const select = document.getElementById('speechVoice');
      if (!select) return;
      
      select.innerHTML = '<option value="default">預設英文語音</option>';
      const voices = window.speechSynthesis.getVoices();
      
      // Filter primarily English voices
      const englishVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
      
      englishVoices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        select.appendChild(option);
      });

      // Select default if exists
      const usVoice = englishVoices.find(voice => voice.lang.includes('US') || voice.lang.includes('en-US'));
      if (usVoice) {
        select.value = usVoice.name;
        this.speechVoiceName = usVoice.name;
      }
    };

    populateVoicesList();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = populateVoicesList;
    }
  }

  // Speak a word using text to speech
  speakWord(word) {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = this.speechRate;
    
    if (this.speechVoiceName && this.speechVoiceName !== 'default') {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === this.speechVoiceName);
      if (selectedVoice) utterance.voice = selectedVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }

  // Screen navigator state machine
  switchScreen(screenName) {
    Object.keys(this.screens).forEach(key => {
      if (key === screenName) {
        this.screens[key].classList.add('active');
      } else {
        this.screens[key].classList.remove('active');
      }
    });

    // Refresh dashboard if returning to welcome splash
    if (screenName === 'splash') {
      this.updateDashboard();
    }

    // Refresh map if entering map screen
    if (screenName === 'map') {
      this.renderLevelMap();
    }
  }

  // Select level (Starters, Movers, Flyers)
  selectLevel(level) {
    this.currentLevel = level;
    this.completedThemes = this.userProgress[level].themes; // Point completedThemes to active level
    
    // Set body theme class for CSS dynamic colors
    document.body.className = '';
    document.body.classList.add(`theme-${level}`);
    
    // Update map headers
    const levelInfo = GAME_DATABASE[level];
    document.getElementById('mapLevelIcon').textContent = levelInfo.icon;
    document.getElementById('mapLevelName').textContent = levelInfo.title;
    
    if (typeof gtag === 'function') {
      gtag('event', 'select_level', {
        'level_name': level
      });
    }

    this.switchScreen('map');
  }

  // Render the level nodes progress map
  renderLevelMap() {
    const container = document.getElementById('themeNodesContainer');
    if (!container) return;
    container.innerHTML = '';

    const levelData = GAME_DATABASE[this.currentLevel];
    if (!levelData) return;

    const vocabPool = levelData.vocabPool || [];
    const learnedWords = this.userProgress[this.currentLevel].learnedWords || [];

    levelData.themes.forEach((theme, index) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('theme-node-wrapper');

      // Count unlearned words in this category
      const categoryWords = vocabPool.filter(w => w.mode === theme.mode);
      let totalWords = categoryWords.length;
      let learnedCount = categoryWords.filter(w => learnedWords.includes(w.word)).length;

      if (theme.mode === 'grammar') {
        const grammarPool = levelData.grammarPool;
        totalWords = grammarPool.length;
        learnedCount = grammarPool.filter(q => {
          const correctWord = q.correct.toLowerCase();
          const baseWord = q.word ? q.word.toLowerCase() : null;
          return learnedWords.includes(correctWord) || (baseWord && learnedWords.includes(baseWord));
        }).length;
      }

      const remaining = totalWords - learnedCount;
      const isCompleted = remaining === 0 && totalWords > 0;
      
      const node = document.createElement('div');
      node.classList.add('theme-node');
      if (isCompleted) node.classList.add('completed');

      node.innerHTML = `
        <div class="theme-node-icon">${theme.icon}</div>
        <div class="theme-node-info">
          <span class="theme-node-title">${theme.title}</span>
          <span class="theme-node-status">${isCompleted ? '🎉 已全部學會！' : `⚡ 剩餘 ${remaining} 個單字`}</span>
        </div>
      `;

      node.addEventListener('click', () => {
        if (isCompleted) {
          Sounds.playClick();
          alert('🎉 此關卡已全部學會，挑戰成功囉！請前去挑戰其他關卡吧！');
          return;
        }
        Sounds.playClick();
        this.startLevelGame(theme);
      });

      wrapper.appendChild(node);
      container.appendChild(wrapper);
    });
  }

  // Start a theme game challenge
  startLevelGame(theme) {
    this.currentTheme = theme;
    this.generateDynamicQuestions(theme); // Populate dynamic random questions
    
    this.currentQuestionIdx = 0;
    this.score = 0;
    this.lives = 3;
    this.correctAnswersCount = 0;
    this.sessionVocab = [];

    // Reset HUDS
    document.getElementById('gameScore').textContent = this.score;
    document.getElementById('gameLives').textContent = this.lives;
    const progressBar = document.getElementById('gameProgressBar');
    if (progressBar) progressBar.style.width = '0%';
    
    // Render Question progress label
    const totalQ = this.getTotalQuestionsCount();
    document.getElementById('totalQuestionsNum').textContent = totalQ;
    
    this.switchScreen('game');
    this.loadQuestion();
  }

  // Randomly pull and prepare questions from the level pools, prioritizing unlearned words
  generateDynamicQuestions(theme) {
    const levelData = GAME_DATABASE[this.currentLevel];
    const vocabPool = levelData.vocabPool;
    const grammarPool = levelData.grammarPool;
    
    // Get learned words for the active level
    const learnedWords = this.userProgress[this.currentLevel].learnedWords || [];
    
    // Helper to get N random elements from array, prioritizing unlearned words
    const getRandomSlice = (arr, n, fallbackArr = []) => {
      let selected = [];
      if (arr.length >= n) {
        selected = [...arr].sort(() => Math.random() - 0.5).slice(0, n);
      } else {
        selected = [...arr];
        const remainingCount = n - arr.length;
        const shuffledFallback = [...fallbackArr].sort(() => Math.random() - 0.5);
        selected = selected.concat(shuffledFallback.slice(0, remainingCount));
      }
      return selected;
    };

    // Filter vocabPool to get only words assigned to this theme mode
    const modeVocab = vocabPool ? vocabPool.filter(w => w.mode === theme.mode) : [];
    const unlearnedVocab = modeVocab.filter(w => !learnedWords.includes(w.word));

    if (theme.mode === 'wrong_words_review') {
      const wrongList = this.userProgress.wrongWords || [];
      const selected = [...wrongList].sort(() => Math.random() - 0.5).slice(0, 10);
      theme.questions = selected.map(w => ({
        word: w.word,
        emoji: w.emoji,
        hint: w.hint,
        isReview: true
      }));
    } else if (theme.mode === 'match') {
      const selectedWords = getRandomSlice(unlearnedVocab, 5, modeVocab);
      theme.questions = selectedWords.map(w => ({
        type: "image",
        value: w.emoji,
        match: w.word,
        hint: w.hint
      }));
    } else if (theme.mode === 'spell') {
      const selectedWords = getRandomSlice(unlearnedVocab, 5, modeVocab);
      theme.questions = selectedWords.map(w => ({
        word: w.word,
        emoji: w.emoji,
        hint: w.hint
      }));
    } else if (theme.mode === 'grammar') {
      // For grammar theme, we prioritize unlearned pre-defined grammar sentences from grammarPool
      const unlearnedGrammar = grammarPool.filter(q => {
        const correctWord = q.correct.toLowerCase();
        const baseWord = q.word ? q.word.toLowerCase() : null;
        return !learnedWords.includes(correctWord) && (!baseWord || !learnedWords.includes(baseWord));
      });
      const learnedGrammar = grammarPool.filter(q => {
        const correctWord = q.correct.toLowerCase();
        const baseWord = q.word ? q.word.toLowerCase() : null;
        return learnedWords.includes(correctWord) || (baseWord && learnedWords.includes(baseWord));
      });
      
      theme.questions = getRandomSlice(unlearnedGrammar, 5, learnedGrammar);
    } else if (theme.mode === 'listening') {
      const selectedWords = getRandomSlice(unlearnedVocab, 5, modeVocab);
      theme.questions = selectedWords.map(w => {
        // Find 2 other random words from vocabPool that have real pictures (avoid circular letter distractors for clean visual aesthetics)
        const otherWords = vocabPool.filter(ow => ow.word !== w.word && ow.emoji && !ow.emoji.match(/^[\u24B6-\u24CF]$/));
        const randomOthers = getRandomSlice(otherWords, 2, vocabPool);
        
        const options = [
          { emoji: w.emoji, label: w.word },
          { emoji: randomOthers[0]?.emoji || '❓', label: randomOthers[0]?.word || '?' },
          { emoji: randomOthers[1]?.emoji || '❓', label: randomOthers[1]?.word || '??' }
        ];
        options.sort(() => Math.random() - 0.5);
        
        return {
          word: w.word,
          options: options
        };
      });
    }
  }

  // Get total question count based on mode
  getTotalQuestionsCount() {
    if (this.currentTheme.mode === 'match') {
      return 1; // Match is treated as a single compound screen
    }
    return this.currentTheme.questions.length;
  }

  // Update the HUD progress bar
  updateGameProgressBar(completedCount) {
    const bar = document.getElementById('gameProgressBar');
    if (!bar) return;
    
    if (this.currentTheme.mode === 'match') {
      const totalPairs = this.currentTheme.questions.length || 5;
      const pct = Math.min(Math.round((completedCount / totalPairs) * 100), 100);
      bar.style.width = `${pct}%`;
    } else {
      const total = this.getTotalQuestionsCount();
      const pct = Math.min(Math.round((completedCount / total) * 100), 100);
      bar.style.width = `${pct}%`;
    }
  }

  // Load active question into the playground
  loadQuestion() {
    const totalQuestions = this.getTotalQuestionsCount();
    
    // Update progress bar
    this.updateGameProgressBar(this.currentQuestionIdx);
    document.getElementById('currentQuestionNum').textContent = Math.min(this.currentQuestionIdx + 1, totalQuestions);

    // Hide all playground modes
    document.querySelectorAll('.game-mode-layout').forEach(mode => mode.classList.remove('active'));

    const mode = this.currentTheme.mode;
    
    // Activate appropriate mode template
    if (mode === 'match') {
      document.getElementById('modeWordMatch').classList.add('active');
      this.setupWordMatchMode();
    } else if (mode === 'spell' || mode === 'wrong_words_review') {
      document.getElementById('modeSpellMaster').classList.add('active');
      this.setupSpellMode();
    } else if (mode === 'grammar') {
      document.getElementById('modeGrammarQuest').classList.add('active');
      this.setupGrammarMode();
    } else if (mode === 'listening') {
      document.getElementById('modeListeningPop').classList.add('active');
      this.setupListeningMode();
    }
  }

  // Next question controller
  nextQuestion(immediate = false) {
    this.currentQuestionIdx++;
    const total = this.getTotalQuestionsCount();
    
    if (this.currentQuestionIdx >= total) {
      this.completeGameLevel();
    } else {
      if (immediate) {
        this.loadQuestion();
      } else {
        setTimeout(() => {
          this.loadQuestion();
        }, 1000);
      }
    }
  }

  // Deduct lives and check for Game Over
  deductLife() {
    this.lives--;
    Sounds.playFail();
    document.getElementById('gameLives').textContent = this.lives;
    
    // Add red vibration trigger to hud stat
    const livesStat = document.querySelector('.hud-stat.lives');
    livesStat.classList.add('error-match');
    setTimeout(() => livesStat.classList.remove('error-match'), 500);

    if (this.lives <= 0) {
      setTimeout(() => {
        alert('💔 挑戰失敗，生命值歸零。別氣餒，再試一次吧！');
        this.switchScreen('map');
      }, 600);
    }
  }

  /* ==========================================================================
     MODE 1: WORD MATCH (詞彙連連看)
     ========================================================================== */
  setupWordMatchMode() {
    document.getElementById('instructionIcon').textContent = "🧩";
    document.getElementById('instructionText').textContent = "請配對正確的圖片卡片與英文單字卡片！";

    const questions = this.currentTheme.questions;
    
    // Prepare card structures (10 cards total: 5 images, 5 matching texts)
    const cards = [];
    questions.forEach(q => {
      cards.push({ id: q.match, type: 'image', value: q.value, matchId: q.match, hint: q.hint });
      cards.push({ id: q.match, type: 'text', value: q.match, matchId: q.match });
    });

    // Shuffle cards list
    cards.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('matchGrid');
    grid.innerHTML = '';
    
    this.selectedMatchCard = null;
    this.remainingPairs = questions.length;

    cards.forEach(cardData => {
      const card = document.createElement('div');
      card.classList.add('match-card');
      card.dataset.matchId = cardData.matchId;
      card.dataset.type = cardData.type;

      if (cardData.type === 'image') {
        const emojiHtml = this.getEmojiHtml(cardData.value, 'match-card-emoji-vector');
        card.innerHTML = `
          <div class="match-card-content">
            ${emojiHtml}
            <span class="match-card-hint">${cardData.hint}</span>
          </div>
        `;
      } else {
        card.textContent = cardData.value;
      }

      card.addEventListener('click', () => {
        this.handleMatchCardClick(card);
      });

      grid.appendChild(card);
    });
  }

  handleMatchCardClick(card) {
    if (card.classList.contains('success-match') || card.classList.contains('selected')) return;
    
    Sounds.playClick();

    if (!this.selectedMatchCard) {
      // First selection
      this.selectedMatchCard = card;
      card.classList.add('selected');
    } else {
      // Second selection
      const prevCard = this.selectedMatchCard;
      
      // Prevent selecting matching card of the same exact type
      if (prevCard.dataset.type === card.dataset.type) {
        prevCard.classList.remove('selected');
        this.selectedMatchCard = card;
        card.classList.add('selected');
        return;
      }

      // Check if match IDs are identical
      if (prevCard.dataset.matchId === card.dataset.matchId) {
        // Success match
        prevCard.classList.remove('selected');
        prevCard.classList.add('success-match');
        card.classList.add('success-match');
        
        Sounds.playSuccess();
        this.score += 20;
        document.getElementById('gameScore').textContent = this.score;
        
        // Add to session vocab list
        const vocabWord = card.dataset.matchId;
        const imgCard = prevCard.dataset.type === 'image' ? prevCard : card;
        const emojiVal = imgCard.querySelector('.emoji-text').textContent;
        
        if (!this.sessionVocab.some(v => v.word === vocabWord)) {
          this.sessionVocab.push({ word: vocabWord, emoji: emojiVal });
        }

        // Voice output word
        this.speakWord(vocabWord);

        this.remainingPairs--;
        this.updateGameProgressBar(this.currentTheme.questions.length - this.remainingPairs);
        this.selectedMatchCard = null;

        if (this.remainingPairs === 0) {
          this.correctAnswersCount = 1; // Perfect accuracy for completing matches
          setTimeout(() => {
            this.completeGameLevel();
          }, 1200);
        }
      } else {
        // Mismatch error
        prevCard.classList.remove('selected');
        prevCard.classList.add('error-match');
        card.classList.add('error-match');
        
        this.deductLife();

        this.addWrongWordByWord(prevCard.dataset.matchId);
        this.addWrongWordByWord(card.dataset.matchId);

        this.selectedMatchCard = null;

        setTimeout(() => {
          prevCard.classList.remove('error-match');
          card.classList.remove('error-match');
        }, 600);
      }
    }
  }

  /* ==========================================================================
     MODE 2: SPELL MASTER (單字拼拼樂)
     ========================================================================== */
  setupSpellMode() {
    document.getElementById('instructionIcon').textContent = "✏️";
    document.getElementById('instructionText').textContent = "聽發音並參考提示，拼寫出正確的英文單字！";

    const q = this.currentTheme.questions[this.currentQuestionIdx];
    
    // Note: sessionVocab is populated on correct answer, not on question load

    // Set UI elements
    document.getElementById('spellImage').innerHTML = this.getEmojiHtml(q.emoji, 'spell-image-vector');
    document.getElementById('spellChineseHint').textContent = q.hint;
    
    // Play voice immediately
    setTimeout(() => {
      this.speakWord(q.word);
    }, 400);

    // Audio repeat button trigger
    const audioBtn = document.getElementById('spellAudioBtn');
    // Recreate clean listener to prevent duplicates
    const newAudioBtn = audioBtn.cloneNode(true);
    audioBtn.parentNode.replaceChild(newAudioBtn, audioBtn);
    newAudioBtn.addEventListener('click', () => {
      Sounds.playClick();
      this.speakWord(q.word);
    });

    // Clear spelling line
    const slots = document.getElementById('spellSlots');
    slots.innerHTML = '';
    this.spelledWord = [];

    // Create target slots
    for (let i = 0; i < q.word.length; i++) {
      const slot = document.createElement('span');
      if (q.word[i] === ' ') {
        slot.classList.add('spell-space-slot');
        slot.innerHTML = '&nbsp;';
        slot.style.borderBottom = 'none';
        slot.style.width = '24px'; // Custom spacing for word separation
      } else {
        slot.classList.add('spell-slot');
      }
      slots.appendChild(slot);
    }

    // Prepare letter bubbles magnets (filter out spaces)
    const wordLetters = q.word.split('').filter(char => char !== ' ');
    // Scramble letters
    const scrambled = [...wordLetters].sort(() => Math.random() - 0.5);
    
    const magnetsContainer = document.getElementById('letterMagnets');
    magnetsContainer.innerHTML = '';

    scrambled.forEach((letter, index) => {
      const magnet = document.createElement('button');
      magnet.classList.add('letter-magnet');
      magnet.textContent = letter;
      magnet.dataset.index = index;

      magnet.addEventListener('click', () => {
        this.handleLetterMagnetClick(magnet, letter, q.word);
      });

      magnetsContainer.appendChild(magnet);
    });

    // Clear button action
    const clearBtn = document.getElementById('spellClearBtn');
    const newClearBtn = clearBtn.cloneNode(true);
    newClearBtn.disabled = false; // Reset disabled state from previous questions
    clearBtn.parentNode.replaceChild(newClearBtn, clearBtn);
    newClearBtn.addEventListener('click', () => {
      Sounds.playClick();
      this.resetSpelledWord();
    });

    // Give Up button action
    const giveUpBtn = document.getElementById('spellGiveUpBtn');
    const newGiveUpBtn = giveUpBtn.cloneNode(true);
    newGiveUpBtn.textContent = '放棄';
    newGiveUpBtn.disabled = false;
    newGiveUpBtn.classList.remove('primary-btn');
    newGiveUpBtn.classList.add('danger-btn');
    giveUpBtn.parentNode.replaceChild(newGiveUpBtn, giveUpBtn);

    let hasGivenUp = false;
    newGiveUpBtn.addEventListener('click', () => {
      Sounds.playClick();

      if (hasGivenUp) {
        // Second stage click: advance to the next question
        if (this.lives > 0) {
          this.nextQuestion(true);
        }
        return;
      }

      // First stage click: Give up this question
      hasGivenUp = true;

      // Disable letter magnets and clear button to prevent modifications
      const magnets = document.querySelectorAll('.letter-magnet');
      magnets.forEach(m => m.disabled = true);
      newClearBtn.disabled = true;

      // Fill in correct letters visually
      const wordLetters = q.word.split('');
      const slots = document.querySelectorAll('.spell-slot');
      wordLetters.forEach((letter, i) => {
        if (slots[i]) {
          slots[i].textContent = letter;
          slots[i].classList.add('filled');
          // Highlight with warm orange / amber warning color to show it was revealed
          slots[i].style.borderBottomColor = 'hsl(35, 90%, 50%)';
          slots[i].style.color = 'hsl(35, 90%, 50%)';
        }
      });

      // Deduct life
      this.deductLife();

      // Log spelling mistake (it goes to the review/wrong words book)
      this.addWrongWordByWord(q.word);

      // Speak the correct word
      this.speakWord(q.word);

      // If they still have lives left, change the button to "Next Question"
      if (this.lives > 0) {
        newGiveUpBtn.textContent = '下一題';
        newGiveUpBtn.classList.remove('danger-btn');
        newGiveUpBtn.classList.add('primary-btn');
      } else {
        // If game is over, keep button disabled
        newGiveUpBtn.disabled = true;
      }
    });
  }

  handleLetterMagnetClick(magnet, letter, targetWord) {
    if (magnet.classList.contains('used')) return;
    
    Sounds.playClick();
    
    // Add letter to spelled word list
    this.spelledWord.push({ letter, magnetRef: magnet });
    magnet.classList.add('used');

    // Update the visual slots
    const slots = document.querySelectorAll('.spell-slot');
    const fillIndex = this.spelledWord.length - 1;
    
    if (slots[fillIndex]) {
      slots[fillIndex].textContent = letter;
      slots[fillIndex].classList.add('filled');
    }

    // Check if word completed (excluding spaces)
    const targetNoSpaces = targetWord.replace(/\s+/g, '');
    if (this.spelledWord.length === targetNoSpaces.length) {
      const q = this.currentTheme.questions[this.currentQuestionIdx];
      const combined = this.spelledWord.map(item => item.letter).join('');
      if (combined === targetNoSpaces) {
        // Success
        Sounds.playSuccess();
        this.score += 20;
        document.getElementById('gameScore').textContent = this.score;
        
        // Green highlight on slots
        slots.forEach(slot => {
          slot.style.borderBottomColor = 'var(--color-success)';
          slot.style.color = 'var(--color-success)';
        });
        
        this.correctAnswersCount++;
        this.updateGameProgressBar(this.currentQuestionIdx + 1);
        this.speakWord(targetWord);
        
        // If it's a review session, remove from wrong words list
        if (q.isReview) {
          this.userProgress.wrongWords = this.userProgress.wrongWords.filter(w => w.word !== targetWord);
          this.saveProgress();
        }

        // Add to session vocab on correct answer
        if (!this.sessionVocab.some(v => v.word === q.word)) {
          this.sessionVocab.push({ word: q.word, emoji: q.emoji });
        }
        setTimeout(() => {
          this.nextQuestion();
        }, 1500);
      } else {
        // Failed word spelling
        this.deductLife();
        
        // Log spelling mistake
        this.addWrongWordByWord(targetWord);

        // Red glow warning
        slots.forEach(slot => {
          slot.style.borderBottomColor = 'var(--color-error)';
          slot.style.color = 'var(--color-error)';
        });

        // Reset spelling after a short time
        setTimeout(() => {
          slots.forEach(slot => {
            slot.style.borderBottomColor = '';
            slot.style.color = '';
          });
          this.resetSpelledWord();
        }, 800);
      }
    }
  }

  resetSpelledWord() {
    this.spelledWord.forEach(item => {
      item.magnetRef.classList.remove('used');
    });
    this.spelledWord = [];
    
    const slots = document.querySelectorAll('.spell-slot');
    slots.forEach(slot => {
      slot.textContent = '';
      slot.classList.remove('filled');
    });
  }

  /* ==========================================================================
     MODE 3: GRAMMAR QUEST (語法挑戰賽)
     ========================================================================== */
  setupGrammarMode() {
    document.getElementById('instructionIcon').textContent = "📚";
    document.getElementById('instructionText').textContent = "選出最適當的英文單字，填補句子中的空格！";

    const q = this.currentTheme.questions[this.currentQuestionIdx];

    // Sentence structures
    const sentenceEl = document.getElementById('grammarSentence');
    sentenceEl.innerHTML = q.sentence.replace('___', '<span class="blank-space" id="grammarBlank">___</span>');
    
    // Visual indicators
    document.querySelector('.grammar-mascot').innerHTML = this.getEmojiHtml(q.emoji, 'grammar-mascot-vector');

    // Load options grid
    const optionsContainer = document.getElementById('grammarOptions');
    optionsContainer.innerHTML = '';

    const alphabet = ['A', 'B', 'C', 'D'];
    
    q.options.forEach((opt, idx) => {
      const card = document.createElement('button');
      card.classList.add('option-card');
      card.innerHTML = `
        <span class="option-badge">${alphabet[idx]}</span>
        <span class="option-text">${opt}</span>
      `;

      card.addEventListener('click', () => {
        this.handleGrammarOptionClick(card, opt, q);
      });

      optionsContainer.appendChild(card);
    });
  }

  handleGrammarOptionClick(card, selectedOption, qData) {
    // Prevent double clicking choices
    const allOptions = document.querySelectorAll('.option-card');
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');

    const blank = document.getElementById('grammarBlank');

    if (selectedOption === qData.correct) {
      // Success
      Sounds.playSuccess();
      card.classList.add('correct');
      blank.textContent = selectedOption;
      blank.style.color = 'var(--color-success)';
      blank.style.borderBottomColor = 'var(--color-success)';
      
      this.score += 20;
      document.getElementById('gameScore').textContent = this.score;
      this.correctAnswersCount++;
      this.updateGameProgressBar(this.currentQuestionIdx + 1);
      
      // Speak the completed sentence
      const cleanSentence = qData.sentence.replace('___', selectedOption);
      this.speakWord(cleanSentence);

      // Collect vocab review if it is a grammar vocabulary word
      if (qData.correct && !this.sessionVocab.some(v => v.word === qData.correct)) {
        this.sessionVocab.push({ word: qData.correct, emoji: qData.emoji || '📚' });
      }

      setTimeout(() => {
        this.nextQuestion();
      }, 2200);
    } else {
      // Fail option
      card.classList.add('incorrect');
      this.deductLife();
      this.addWrongWord(qData.correct, qData.emoji || '📚', qData.translation || '?', 'grammar');
      
      // Find and highlight correct answer cards
      allOptions.forEach(optCard => {
        const text = optCard.querySelector('.option-text').textContent;
        if (text === qData.correct) {
          optCard.classList.add('correct');
        }
      });

      // Show completed correct sentence voice
      const cleanSentence = qData.sentence.replace('___', qData.correct);
      this.speakWord(cleanSentence);
      this.updateGameProgressBar(this.currentQuestionIdx + 1);

      setTimeout(() => {
        this.nextQuestion();
      }, 2400);
    }
  }

  /* ==========================================================================
     MODE 4: LISTENING POP (聽力大考驗)
     ========================================================================== */
  setupListeningMode() {
    document.getElementById('instructionIcon').textContent = "🎧";
    document.getElementById('instructionText').textContent = "點擊發音按鈕，聽英文發音並點選對應的正確卡片！";

    const q = this.currentTheme.questions[this.currentQuestionIdx];

    // Trigger Speech synthesis voice
    setTimeout(() => {
      this.speakWord(q.word);
    }, 400);

    const speakBtn = document.getElementById('listeningAudioBtn');
    const newSpeakBtn = speakBtn.cloneNode(true);
    speakBtn.parentNode.replaceChild(newSpeakBtn, speakBtn);
    newSpeakBtn.addEventListener('click', () => {
      Sounds.playClick();
      this.speakWord(q.word);
    });

    const optionsContainer = document.getElementById('listeningOptions');
    optionsContainer.innerHTML = '';

    q.options.forEach(opt => {
      const card = document.createElement('div');
      card.classList.add('listening-option-card');
      card.dataset.label = opt.label;
      card.innerHTML = this.getEmojiHtml(opt.emoji, 'listening-option-card-emoji');

      card.addEventListener('click', () => {
        this.handleListeningOptionClick(card, opt.label, q.word);
      });

      optionsContainer.appendChild(card);
    });
  }

  handleListeningOptionClick(card, selectedLabel, targetWord) {
    const allOptions = document.querySelectorAll('.listening-option-card');
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');

    if (selectedLabel === targetWord) {
      // Correct card matching
      Sounds.playSuccess();
      card.classList.add('correct');
      
      // Reveal the English word on the card
      const wordText = document.createElement('div');
      wordText.classList.add('listening-reveal-word');
      wordText.textContent = targetWord;
      card.appendChild(wordText);
      
      this.score += 20;
      document.getElementById('gameScore').textContent = this.score;
      this.correctAnswersCount++;
      this.updateGameProgressBar(this.currentQuestionIdx + 1);

      // Speak word once again
      this.speakWord(targetWord);

      // Collect vocab review
      const currentQData = this.currentTheme.questions[this.currentQuestionIdx];
      const correctOpt = currentQData.options.find(o => o.label === targetWord);
      if (correctOpt && !this.sessionVocab.some(v => v.word === targetWord)) {
        this.sessionVocab.push({ word: targetWord, emoji: correctOpt.emoji });
      }

      setTimeout(() => {
        this.nextQuestion();
      }, 1800);
    } else {
      // Incorrect choice
      card.classList.add('incorrect');
      this.deductLife();

      const currentQData = this.currentTheme.questions[this.currentQuestionIdx];
      const correctOpt = currentQData.options.find(o => o.label === targetWord);
      this.addWrongWord(targetWord, correctOpt ? correctOpt.emoji : '❓', '聽力字彙', 'listening');
      allOptions.forEach(optCard => {
        // Highlight correct card choice and reveal the word
        if (optCard.dataset.label === targetWord) {
          optCard.classList.add('correct');
          
          const wordText = document.createElement('div');
          wordText.classList.add('listening-reveal-word');
          wordText.textContent = targetWord;
          optCard.appendChild(wordText);
        }
      });

      this.speakWord(targetWord);
      this.updateGameProgressBar(this.currentQuestionIdx + 1);
      
      setTimeout(() => {
        this.nextQuestion();
      }, 2200);
    }
  }

  /* ==========================================================================
     LEVEL COMPLETE / SUMMARY
     ========================================================================== */
  completeGameLevel() {
    Sounds.playLevelClear();
    
    // Accuracy calculations
    const totalQuestions = this.getTotalQuestionsCount();
    const accuracy = totalQuestions > 0 ? Math.round((this.correctAnswersCount / totalQuestions) * 100) : 100;
    
    // Configure star ratings
    let starsCount = 3;
    if (accuracy < 60 || this.lives <= 1) {
      starsCount = 1;
    } else if (accuracy < 90 || this.lives === 2) {
      starsCount = 2;
    }

    if (typeof gtag === 'function') {
      gtag('event', 'level_completed', {
        'level_name': this.currentLevel,
        'theme_name': this.currentTheme.title,
        'score': this.score,
        'stars': starsCount,
        'accuracy': accuracy
      });
    }

    // Save completion & high score/stars to database states
    const prevRecord = this.completedThemes[this.currentTheme.id] || { score: 0, stars: 0 };
    const savedScore = (typeof prevRecord === 'object') ? (prevRecord.score || 0) : 100;
    const savedStars = (typeof prevRecord === 'object') ? (prevRecord.stars || 0) : 1;
    
    this.completedThemes[this.currentTheme.id] = {
      completed: true,
      score: Math.max(savedScore, this.score),
      stars: Math.max(savedStars, starsCount)
    };

    // Add current session score to global lifetime score (so it keeps going up with every play!)
    this.userProgress.lifetimeScore = (this.userProgress.lifetimeScore || 0) + this.score;

    // Save newly learned words to level.learnedWords list
    const levelProgressData = this.userProgress[this.currentLevel];
    this.sessionVocab.forEach(item => {
      if (!levelProgressData.learnedWords.includes(item.word)) {
        levelProgressData.learnedWords.push(item.word);
      }
    });
    
    this.saveProgress();
    this.updateDashboard();

    // Render accuracy and score metrics
    document.getElementById('summaryScore').textContent = this.score;
    document.getElementById('summaryAccuracy').textContent = `${accuracy}%`;

    // Calculate and display remaining words count for this theme
    const vocabPool = GAME_DATABASE[this.currentLevel].vocabPool || [];
    const learnedWords = this.userProgress[this.currentLevel].learnedWords || [];
    const categoryWords = vocabPool.filter(w => w.mode === this.currentTheme.mode);
    let totalWords = categoryWords.length;
    let learnedCount = categoryWords.filter(w => learnedWords.includes(w.word)).length;

    if (this.currentTheme.mode === 'grammar') {
      const grammarPool = GAME_DATABASE[this.currentLevel].grammarPool;
      totalWords = grammarPool.length;
      learnedCount = grammarPool.filter(q => {
        const correctWord = q.correct.toLowerCase();
        const baseWord = q.word ? q.word.toLowerCase() : null;
        return learnedWords.includes(correctWord) || (baseWord && learnedWords.includes(baseWord));
      }).length;
    }

    const remaining = totalWords - learnedCount;

    const remainingWordsEl = document.getElementById('summaryRemainingWords');
    const remainingLabelEl = document.getElementById('summaryRemainingLabel');
    const restartBtnEl = document.getElementById('summaryRestartBtn');

    if (remainingWordsEl && remainingLabelEl) {
      if (remaining === 0 && totalWords > 0) {
        remainingWordsEl.textContent = '🎉';
        remainingLabelEl.textContent = '已全部學會！';
        if (restartBtnEl) restartBtnEl.style.display = 'none';
      } else {
        remainingWordsEl.textContent = remaining;
        remainingLabelEl.textContent = '剩餘未學單字';
        if (restartBtnEl) {
          restartBtnEl.style.display = 'inline-block';
          restartBtnEl.textContent = '繼續挑戰';
        }
      }
    }

    // Configure star ratings
    const starsDisplay = document.getElementById('starsDisplay');
    starsDisplay.innerHTML = '';

    for (let i = 0; i < 3; i++) {
      const star = document.createElement('span');
      star.classList.add('star');
      star.classList.add('animate-pop-in');
      star.style.animationDelay = `${i * 0.15}s`;
      
      if (i < starsCount) {
        star.textContent = '⭐';
      } else {
        star.textContent = '☆';
        star.classList.add('empty');
      }
      starsDisplay.appendChild(star);
    }

    // Trigger sweet confetti party animation
    this.triggerConfetti();

    // Populate word pills for review section
    const vocabList = document.getElementById('vocabPillList');
    vocabList.innerHTML = '';

    if (this.sessionVocab.length === 0) {
      vocabList.innerHTML = '<span style="color:var(--color-text-muted)">無複習單字</span>';
    } else {
      this.sessionVocab.forEach(item => {
        const pill = document.createElement('button');
        pill.classList.add('vocab-pill');
        pill.innerHTML = `
          ${this.getEmojiHtml(item.emoji, 'vocab-pill-emoji')}
          <span>${item.word}</span>
          <span class="vocab-pill-audio">🔊</span>
        `;
        
        pill.addEventListener('click', () => {
          Sounds.playClick();
          this.speakWord(item.word);
        });

        vocabList.appendChild(pill);
      });
    }

    // Update Level clear titles based on performance
    const titleEl = document.getElementById('summaryTitle');
    if (starsCount === 3) {
      titleEl.textContent = '🏆 太完美了！三星挑戰成功！';
      titleEl.style.color = 'var(--color-success)';
    } else if (starsCount === 2) {
      titleEl.textContent = '✨ 表現優異！繼續保持！';
      titleEl.style.color = 'var(--color-primary-dark)';
    } else {
      titleEl.textContent = '👍 挑戰成功！再接再厲！';
      titleEl.style.color = 'var(--color-text-main)';
    }

    const summaryMapBtn = document.getElementById('summaryMapBtn');
    if (summaryMapBtn) {
      if (this.currentTheme && this.currentTheme.mode === 'wrong_words_review') {
        summaryMapBtn.textContent = '回首頁';
      } else {
        summaryMapBtn.textContent = '回關卡';
      }
    }

    this.switchScreen('summary');
  }

  // Trigger colorful paper particles fall from screen top
  triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      
      const left = Math.random() * 100;
      const size = Math.random() * 6 + 6;
      const delay = Math.random() * 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.style.left = `${left}%`;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.animationDelay = `${delay}s`;
      
      container.appendChild(confetti);
    }
  }

  // Calculate and update local storage scores and completion percentages in the HTML DOM
  updateDashboard() {
    let totalScore = 0;
    
    // Count completed themes and accumulated scores per level
    const levelStats = {
      starters: { completedCount: 0, score: 0 },
      movers: { completedCount: 0, score: 0 },
      flyers: { completedCount: 0, score: 0 }
    };

    Object.keys(this.completedThemes).forEach(themeId => {
      const record = this.completedThemes[themeId];
      const isCompleted = record === true || (record && record.completed);
      
      if (isCompleted) {
        const recordScore = (record && typeof record === 'object') ? (record.score || 0) : 100;
        totalScore += recordScore;
        
        if (themeId.startsWith('starters')) {
          levelStats.starters.completedCount++;
          levelStats.starters.score += recordScore;
        } else if (themeId.startsWith('movers')) {
          levelStats.movers.completedCount++;
          levelStats.movers.score += recordScore;
        } else if (themeId.startsWith('flyers')) {
          levelStats.flyers.completedCount++;
          levelStats.flyers.score += recordScore;
        }
      }
    });

    // Update global score display
    const totalScoreEl = document.getElementById('dashTotalScore');
    if (totalScoreEl) totalScoreEl.textContent = totalScore;

    // Calculate level specific percentages based on word list size
    const startersTotalWords = GAME_DATABASE.starters.vocabPool.length;
    const moversTotalWords = GAME_DATABASE.movers.vocabPool.length;
    const flyersTotalWords = GAME_DATABASE.flyers.vocabPool.length;

    const startersLearned = this.userProgress.starters.learnedWords.length;
    const moversLearned = this.userProgress.movers.learnedWords.length;
    const flyersLearned = this.userProgress.flyers.learnedWords.length;

    const startersScore = Object.values(this.userProgress.starters.themes).reduce((sum, t) => sum + (t.score || 0), 0);
    const moversScore = Object.values(this.userProgress.movers.themes).reduce((sum, t) => sum + (t.score || 0), 0);
    const flyersScore = Object.values(this.userProgress.flyers.themes).reduce((sum, t) => sum + (t.score || 0), 0);
    
    // Set default lifetimeScore if undefined using high scores sum
    if (this.userProgress.lifetimeScore === undefined) {
      this.userProgress.lifetimeScore = startersScore + moversScore + flyersScore;
    }

    if (totalScoreEl) totalScoreEl.textContent = this.userProgress.lifetimeScore;

    const startersPercent = Math.round((startersLearned / startersTotalWords) * 100);
    const moversPercent = Math.round((moversLearned / moversTotalWords) * 100);
    const flyersPercent = Math.round((flyersLearned / flyersTotalWords) * 100);

    // Update dashboard level rows DOM
    const startersStatText = document.getElementById('startersStatText');
    const startersProgressBar = document.getElementById('startersProgressBar');
    if (startersStatText) startersStatText.textContent = `已記住 ${startersLearned} / ${startersTotalWords} 單字 (官方共 497 字)`;
    if (startersProgressBar) startersProgressBar.style.width = `${startersPercent}%`;

    const moversStatText = document.getElementById('moversStatText');
    const moversProgressBar = document.getElementById('moversProgressBar');
    if (moversStatText) moversStatText.textContent = `已記住 ${moversLearned} / ${moversTotalWords} 單字 (官方共 898 字)`;
    if (moversProgressBar) moversProgressBar.style.width = `${moversPercent}%`;

    const flyersStatText = document.getElementById('flyersStatText');
    const flyersProgressBar = document.getElementById('flyersProgressBar');
    if (flyersStatText) flyersStatText.textContent = `已記住 ${flyersLearned} / ${flyersTotalWords} 單字 (官方共 1,411 字)`;
    if (flyersProgressBar) flyersProgressBar.style.width = `${flyersPercent}%`;

    // Update level-specific completion percentages on cards (Welcome Screen)
    const progressStartersEl = document.getElementById('progress-starters');
    const progressMoversEl = document.getElementById('progress-movers');
    const progressFlyersEl = document.getElementById('progress-flyers');

    if (progressStartersEl) progressStartersEl.textContent = `完成度 ${startersPercent}%`;
    if (progressMoversEl) progressMoversEl.textContent = `完成度 ${moversPercent}%`;
    if (progressFlyersEl) progressFlyersEl.textContent = `完成度 ${flyersPercent}%`;

    // Update wrong words challenge banner
    const wrongWordsCard = document.getElementById('wrongWordsCard');
    const wrongWordsCountText = document.getElementById('wrongWordsCountText');
    const wrongList = this.userProgress.wrongWords || [];
    
    if (wrongWordsCard && wrongWordsCountText) {
      if (wrongList.length > 0) {
        wrongWordsCard.style.display = 'block';
        wrongWordsCountText.textContent = `目前累積 ${wrongList.length} 個錯字`;
      } else {
        wrongWordsCard.style.display = 'none';
      }
    }

    // Render badges
    this.renderBadges();

    // Update user greeting with mascot
    this.updateUserGreeting();

    // Update Export Report Button based on score threshold (200 pts required for 1st badge)
    const exportReportBtn = document.getElementById('exportReportBtn');
    if (exportReportBtn) {
      const score = this.userProgress.lifetimeScore || 0;
      if (score < 200) {
        exportReportBtn.innerHTML = '🔒 匯出報告';
        exportReportBtn.title = '需累積達 200 分解鎖第一枚勳章以匯出報告';
        exportReportBtn.style.opacity = '0.5';
      } else {
        exportReportBtn.innerHTML = '📊 匯出報告';
        exportReportBtn.title = '匯出你的學習成就報告單';
        exportReportBtn.style.opacity = '1';
      }
    }
  }

  /* ==========================================================================
     LOCAL STORAGE STATE PERSISTENCE
     ========================================================================== */
  saveProgress() {
    localStorage.setItem('yle_quest_progress', JSON.stringify(this.userProgress));
  }

  loadProgress() {
    const raw = localStorage.getItem('yle_quest_progress');
    this.userProgress = {
      lifetimeScore: 0,
      wrongWords: [],
      starters: { learnedWords: [], themes: {} },
      movers: { learnedWords: [], themes: {} },
      flyers: { learnedWords: [], themes: {} }
    };
    
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.starters && parsed.starters.learnedWords) {
          this.userProgress = parsed;
          if (!this.userProgress.wrongWords) {
            this.userProgress.wrongWords = [];
          }
        } else {
          // Legacy migration
          Object.keys(parsed).forEach(themeId => {
            const record = parsed[themeId];
            const isCompleted = record === true || (record && record.completed);
            if (isCompleted) {
              const score = (record && typeof record === 'object') ? (record.score || 0) : 100;
              const stars = (record && typeof record === 'object') ? (record.stars || 1) : 1;
              
              let level = 'starters';
              if (themeId.startsWith('movers')) level = 'movers';
              if (themeId.startsWith('flyers')) level = 'flyers';
              
              this.userProgress[level].themes[themeId] = { completed: true, score, stars };
            }
          });
        }
      } catch (e) {
        console.error("Failed to parse progress, resetting", e);
      }
    }
    
    this.completedThemes = {};
  }

  /* ==========================================================================
     NEW FEATURES: BADGES, MASCOTS, WRONG WORDS, REPORT EXPORT
     ========================================================================== */
  getActiveMascot() {
    const score = this.userProgress.lifetimeScore || 0;
    let mascot = '探險家'; // default
    if (score >= 20000) mascot = '🐉 神龍';
    else if (score >= 10000) mascot = '🦅 神鷹';
    else if (score >= 5000) mascot = '🦁 獅子王';
    else if (score >= 2000) mascot = '🦊 小狐狸';
    else if (score >= 800) mascot = '🐰 小兔';
    else if (score >= 200) mascot = '🐥 小雞';
    return mascot;
  }

  updateUserGreeting() {
    const username = localStorage.getItem('yle_quest_username');
    const greeting = document.getElementById('userGreeting');
    const nameDisplay = document.getElementById('userNameDisplay');
    if (username && greeting && nameDisplay) {
      nameDisplay.textContent = `${this.getActiveMascot()} ${username}`;
      greeting.style.display = 'flex';
    }
  }

  renderBadges() {
    const list = document.getElementById('badgesList');
    if (!list) return;
    list.innerHTML = '';
    
    const score = this.userProgress.lifetimeScore || 0;
    const badges = [
      { name: '單字探險家', score: 200, emoji: '🐥' },
      { name: '智慧冒險王', score: 800, emoji: '🐰' },
      { name: '字彙魔法師', score: 2000, emoji: '🦊' },
      { name: '英檢小學霸', score: 5000, emoji: '🦁' },
      { name: '至尊飛翔者', score: 10000, emoji: '🦅' },
      { name: '英檢至尊王', score: 20000, emoji: '🐉' }
    ];
    
    badges.forEach(b => {
      const isUnlocked = score >= b.score;
      const badgeEl = document.createElement('div');
      badgeEl.classList.add('badge-item');
      
      const reqText = b.score >= 1000 ? `${(b.score/1000).toFixed(0)}k 分` : `${b.score} 分`;
      
      if (!isUnlocked) {
        badgeEl.classList.add('locked');
        badgeEl.title = `未解鎖：需達到 ${b.score} 分`;
        badgeEl.innerHTML = `<span class="badge-icon">🔒</span><span class="badge-name" style="font-weight: 700; font-size: 0.85rem; color: var(--color-text-muted);">${b.name} <span style="font-size: 0.75rem; color: #a2a2a2; font-weight: normal;">(${reqText})</span></span>`;
      } else {
        badgeEl.title = `已解鎖！達標分數 ${b.score} 分`;
        badgeEl.innerHTML = `<span class="badge-icon">${b.emoji}</span><span class="badge-name" style="font-weight: 700; font-size: 0.85rem; color: var(--color-text);">${b.name} <span style="font-size: 0.75rem; color: var(--color-success); font-weight: bold;">(已解鎖)</span></span>`;
      }
      list.appendChild(badgeEl);
    });
  }

  addWrongWordByWord(word) {
    if (!this.currentTheme || !this.currentTheme.questions) return;
    const q = this.currentTheme.questions.find(item => item.word === word || (item.match && item.match === word) || (item.correct && item.correct === word));
    if (q) {
      this.addWrongWord(q.word || q.match || q.correct, q.emoji || q.value || '❓', q.hint || q.translation || '?', q.mode || this.currentTheme.mode);
    }
  }

  addWrongWord(word, emoji, hint, mode) {
    if (!this.userProgress.wrongWords) {
      this.userProgress.wrongWords = [];
    }
    
    // Check if already exists in wrong words
    const exists = this.userProgress.wrongWords.some(w => w.word === word);
    if (!exists) {
      this.userProgress.wrongWords.push({
        word,
        emoji,
        hint,
        mode,
        level: this.currentLevel,
        addedTime: Date.now()
      });
      this.saveProgress();
      
      // Update counts immediately if on splash screen
      const wrongWordsCountText = document.getElementById('wrongWordsCountText');
      if (wrongWordsCountText) {
        wrongWordsCountText.textContent = `目前累積 ${this.userProgress.wrongWords.length} 個錯字`;
      }
    }
  }

  prepareReportModal() {
    const username = localStorage.getItem('yle_quest_username') || '探險家';
    const score = this.userProgress.lifetimeScore || 0;
    
    const startersTotalWords = GAME_DATABASE.starters.vocabPool.length;
    const moversTotalWords = GAME_DATABASE.movers.vocabPool.length;
    const flyersTotalWords = GAME_DATABASE.flyers.vocabPool.length;

    const startersLearned = this.userProgress.starters.learnedWords.length;
    const moversLearned = this.userProgress.movers.learnedWords.length;
    const flyersLearned = this.userProgress.flyers.learnedWords.length;

    const startersPercent = Math.round((startersLearned / startersTotalWords) * 100) || 0;
    const moversPercent = Math.round((moversLearned / moversTotalWords) * 100) || 0;
    const flyersPercent = Math.round((flyersLearned / flyersTotalWords) * 100) || 0;

    document.getElementById('reportNameText').textContent = username;
    document.getElementById('reportScoreText').textContent = `${score} 分`;
    document.getElementById('reportTitleText').textContent = `${this.getActiveMascot()}`;
    document.getElementById('reportProgressText').innerHTML = `
      Starters: ${startersPercent}% | Movers: ${moversPercent}% | Flyers: ${flyersPercent}%
    `;
  }

  downloadReportAsImage() {
    const username = localStorage.getItem('yle_quest_username') || '探險家';
    const score = this.userProgress.lifetimeScore || 0;
    
    const startersTotalWords = GAME_DATABASE.starters.vocabPool.length;
    const moversTotalWords = GAME_DATABASE.movers.vocabPool.length;
    const flyersTotalWords = GAME_DATABASE.flyers.vocabPool.length;

    const startersLearned = this.userProgress.starters.learnedWords.length;
    const moversLearned = this.userProgress.movers.learnedWords.length;
    const flyersLearned = this.userProgress.flyers.learnedWords.length;

    const startersPercent = Math.round((startersLearned / startersTotalWords) * 100) || 0;
    const moversPercent = Math.round((moversLearned / moversTotalWords) * 100) || 0;
    const flyersPercent = Math.round((flyersLearned / flyersTotalWords) * 100) || 0;

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const gradient = ctx.createRadialGradient(400, 300, 50, 400, 300, 450);
    gradient.addColorStop(0, '#fffbf2');
    gradient.addColorStop(1, '#fff6e0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Outer double border
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#d4af37';
    ctx.strokeRect(20, 20, 760, 560);
    
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#a47e1b';
    ctx.strokeRect(34, 34, 732, 532);

    // Watermark
    ctx.font = 'bold 80px sans-serif';
    ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.save();
    ctx.translate(400, 300);
    ctx.rotate(-15 * Math.PI / 180);
    ctx.fillText('YLE QUEST', 0, 0);
    ctx.restore();

    // Medal seal (Vector drawn for high contrast, shifted up by 15px for breathing room)
    ctx.save();
    
    // Draw ribbon tails (Red gradient)
    const ribbonGrad = ctx.createLinearGradient(370, 75, 430, 135);
    ribbonGrad.addColorStop(0, '#e74c3c');
    ribbonGrad.addColorStop(1, '#c0392b');
    ctx.fillStyle = ribbonGrad;
    
    // Left ribbon tail
    ctx.beginPath();
    ctx.moveTo(388, 75);
    ctx.lineTo(370, 127);
    ctx.lineTo(385, 119);
    ctx.lineTo(400, 127);
    ctx.lineTo(392, 75);
    ctx.closePath();
    ctx.fill();
    
    // Right ribbon tail
    ctx.beginPath();
    ctx.moveTo(408, 75);
    ctx.lineTo(400, 127);
    ctx.lineTo(415, 119);
    ctx.lineTo(430, 127);
    ctx.lineTo(412, 75);
    ctx.closePath();
    ctx.fill();
    
    // Draw outer shiny gold medal circle
    const medalGrad = ctx.createRadialGradient(392, 67, 4, 400, 75, 32);
    medalGrad.addColorStop(0, '#fef9e7');
    medalGrad.addColorStop(0.3, '#f4d03f');
    medalGrad.addColorStop(0.8, '#d4ac0d');
    medalGrad.addColorStop(1, '#9a7d0a');
    
    ctx.beginPath();
    ctx.arc(400, 75, 32, 0, 2 * Math.PI);
    ctx.fillStyle = medalGrad;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.fill();
    ctx.restore();
    
    // Inner medal detail circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(400, 75, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fbfcfc';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Draw gold star (★) or number '1' inside medal center
    ctx.font = 'bold 22px "Outfit", "Arial Black", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1.5;
    ctx.fillText('★', 400, 76);
    ctx.restore();

    // Certificate Title
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = '#a47e1b';
    ctx.fillText('學習成就證書', 400, 160);

    // Body congrats text
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('恭喜勇士', 400, 220);

    // Username
    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = '#111111';
    ctx.fillText(username, 400, 270);
    
    // Draw underline
    ctx.beginPath();
    ctx.moveTo(250, 290);
    ctx.lineTo(550, 290);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#d4af37';
    ctx.stroke();

    // Description text
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#333333';
    ctx.fillText('在《YLE 劍橋兒童英檢單字大冒險》中展現非凡毅力，', 400, 335);
    ctx.fillText('成功挑戰各大英檢關卡，特頒此證以茲鼓勵！', 400, 365);

    // Dashboard card background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Polyfill for roundRect on older browser engines
    if (ctx.roundRect) {
      ctx.roundRect(150, 405, 500, 110, 12);
    } else {
      ctx.rect(150, 405, 500, 110);
    }
    ctx.fill();
    ctx.stroke();

    // Stats texts inside box (Forced vertical middle alignment)
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#444444';
    ctx.font = '16px sans-serif';
    ctx.fillText('累積總得分:', 180, 435);
    ctx.fillText('榮譽稱號:', 420, 435);

    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = 'hsl(198, 95%, 48%)';
    ctx.fillText(`${score} 分`, 180, 470);

    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#a47e1b';
    ctx.fillText(`${this.getActiveMascot()}`, 420, 470);

    // Progress bar details
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#555555';
    ctx.fillText(`進度: Starters ${startersPercent}% | Movers ${moversPercent}% | Flyers ${flyersPercent}%`, 180, 498);
    ctx.restore();

    // Signatures
    ctx.textAlign = 'center';
    ctx.font = 'italic 14px sans-serif';
    ctx.fillStyle = '#888888';
    ctx.fillText('DVS Intelligence by Kevin Chang 頒發', 400, 550);

    // Trigger download
    const link = document.createElement('a');
    link.download = `YLE_Quest_Report_${username}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    if (typeof gtag === 'function') {
      gtag('event', 'export_report', {
        'user_name': username,
        'lifetime_score': score
      });
    }
  }
}

// Initialise the game client on DOM load
window.addEventListener('DOMContentLoaded', () => {
  const game = new GameEngine();
  game.init();
  
  // Attach instance to window for troubleshooting if necessary
  window.YLEGameInstance = game;
});
