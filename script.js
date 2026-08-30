// ============================================================
//  CONFIGURATION
// ============================================================
const API_URL = '/api/chat';
const USERS_URL = '/api/users';
const INSPIRATION_URL = '/api/inspiration';
const PROMPT_URL = '/api/generate-prompt';
const SERVER_URL = window.location.origin;

// ============================================================
//  IMAGE PATHS
// ============================================================
const IMAGES = {
    sparrow: './images/sparrow-hawk.jpg',
    papa: './images/papahawk.png',
    reyhan: './images/reyhan.jpg',
    pedram: './images/pedram.jpg',
    palmer: './images/palmer.jpg',
    devi: './images/devi.jpg',
    babyhawk: './images/babyhawk.png'
};

// ============================================================
//  USER DATA
// ============================================================
const USERS = {
    papa: { name: 'Papa Hawk', emoji: '👨‍💻', role: 'husband_father', image: IMAGES.papa },
    reyhan: { name: 'Reyhan', emoji: '👩‍🦰', role: 'wife_soulmate', image: IMAGES.reyhan },
    pedram: { name: 'Pedram', emoji: '🧑‍🎨', role: 'brother_in_law', image: IMAGES.pedram },
    palmer: { name: 'Palmer', emoji: '🧑‍💼', role: 'friend', image: IMAGES.palmer },
    devi: { name: 'Devi', emoji: '🎨', role: 'sister', image: IMAGES.devi },
    babyhawk: { name: 'Baby Hawk', emoji: '🦅', role: 'mother', image: IMAGES.babyhawk }
};

// ============================================================
//  STATE
// ============================================================
let currentUser = null;
let currentUserName = null;
let currentUserRole = null;
let isProcessing = false;
let lastSentMessage = '';
let lastSendTime = 0;
let messagesLoaded = false;

// ============================================================
//  LOGIN FUNCTIONS
// ============================================================
async function loginUser() {
    const userId = document.getElementById('loginUserId').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value.trim();
    const errorEl = document.getElementById('loginError');
    
    if (!userId || !password) {
        errorEl.textContent = '❌ Please enter username and password';
        errorEl.style.display = 'block';
        return;
    }
    
    try {
        const res = await fetch(`${USERS_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password })
        });
        
        const data = await res.json();
        
        if (data.success) {
            errorEl.style.display = 'none';
            currentUser = data.user.userId;
            currentUserName = data.user.name;
            currentUserRole = data.user.role;
            await enterApp(data.user.name);
        } else {
            errorEl.textContent = '❌ ' + (data.error || 'Invalid username or password');
            errorEl.style.display = 'block';
            document.getElementById('loginPassword').value = '';
            document.getElementById('loginPassword').focus();
        }
    } catch (e) {
        errorEl.textContent = '❌ Connection error. Please try again.';
        errorEl.style.display = 'block';
        console.error('Login error:', e);
    }
}

// ============================================================
//  LOAD MEMORY FROM SERVER
// ============================================================
async function loadUserMemory(userId) {
    try {
        const res = await fetch(`/api/memory/${userId}`);
        const data = await res.json();
        
        const container = document.getElementById('messages');
        container.innerHTML = '';
        
        if (data.success && data.messages && data.messages.length > 0) {
            // Replay all messages from server
            data.messages.forEach(msg => {
                const sender = msg.sender === 'user' ? 'user' : 'bot';
                const text = msg.text;
                const time = msg.time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                
                const div = document.createElement('div');
                div.className = `msg ${sender}`;
                
                const botAvatar = IMAGES.sparrow;
                const userAvatar = currentUser ? (USERS[currentUser]?.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUserName || 'Guest') + '&background=1a2a4a&color=fff&size=64') : 'https://ui-avatars.com/api/?name=Guest&background=1a2a4a&color=fff&size=64';
                const avatar = sender === 'bot' ? botAvatar : userAvatar;
                
                div.innerHTML = `
                    <div class="msg-avatar"><img src="${avatar}" /></div>
                    <div class="bubble"><p>${text.replace(/\n/g, '<br>')}</p><span class="time">${time}</span></div>
                `;
                container.appendChild(div);
            });
            
            container.scrollTop = container.scrollHeight;
            messagesLoaded = true;
            console.log(`📁 Loaded ${data.messages.length} messages from server`);
        } else {
            // No messages - show nothing (no welcome message)
            console.log('📁 No messages found for this user');
        }
    } catch (error) {
        console.error('Error loading memory:', error);
    }
}

// ============================================================
//  ENTER APP
// ============================================================
async function enterApp(displayName) {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('app').style.display = 'flex';
    localStorage.setItem('sparrowUser', currentUser);

    const badge = document.getElementById('userBadge');
    if (badge) badge.textContent = displayName;

    // Load user's memory from server (no welcome message)
    await loadUserMemory(currentUser);
}

function logoutUser() {
    if (confirm('Logout?')) {
        document.getElementById('app').style.display = 'none';
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('messages').innerHTML = '';
        document.getElementById('loginUserId').value = '';
        document.getElementById('loginPassword').value = '';
        localStorage.removeItem('sparrowUser');
        currentUser = null;
        currentUserName = null;
        currentUserRole = null;
        isProcessing = false;
        lastSentMessage = '';
        lastSendTime = 0;
        messagesLoaded = false;
    }
}

// ============================================================
//  SEND MESSAGE
// ============================================================
async function sendMessage() {
    if (isProcessing) {
        console.log('⏳ Already sending, please wait...');
        return;
    }
    
    const now = Date.now();
    if (now - lastSendTime < 2000) {
        console.log('⏳ Please wait 2 seconds between messages');
        return;
    }
    
    const input = document.getElementById('msgInput');
    const sendBtn = document.querySelector('.send-btn');
    let message = input.value.trim();
    
    if (message === lastSentMessage) {
        console.log('⚠️ Duplicate message detected, not sending');
        input.value = '';
        return;
    }
    
    if (!message) return;
    if (!currentUser) {
        console.error('❌ No user logged in');
        return;
    }

    isProcessing = true;
    lastSentMessage = message;
    lastSendTime = now;
    
    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.style.opacity = '0.5';
        sendBtn.style.cursor = 'not-allowed';
    }

    input.value = '';
    addMessage(message, 'user');
    showTyping();

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser,
                message: message,
                model: 'gemini-3.1-flash-lite'
            })
        });

        const data = await res.json();
        hideTyping();

        if (data.success && data.reply) {
            addMessage(data.reply, 'bot');
        } else {
            addMessage(`❄️ ${data.error || 'Something went wrong in the frost...'}`, 'bot');
        }

    } catch (e) {
        hideTyping();
        console.error('SendMessage error:', e);
        addMessage(`❄️ Error: ${e.message}`, 'bot');
    }

    isProcessing = false;
    if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
        sendBtn.style.cursor = 'pointer';
    }
}

// ============================================================
//  GENERATE TEXTILE PROMPT
// ============================================================
async function generatePrompt() {
    if (!currentUser) {
        addMessage('❄️ Please log in first, darling.', 'bot');
        return;
    }
    
    const input = document.getElementById('msgInput');
    const description = input.value.trim();
    
    if (!description) {
        addMessage('❄️ Tell me what you want to create, and I\'ll craft the perfect prompt. 🧵', 'bot');
        return;
    }
    
    addMessage(`🔮 Generating prompt for: "${description}"`, 'bot');
    showTyping();
    
    try {
        const res = await fetch(PROMPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser,
                description: description,
                style: 'textile art, fabric design, pattern',
                mood: 'ethereal, frosty, magical',
                colors: 'soft blues, silvers, frost whites, lavender'
            })
        });
        
        const data = await res.json();
        hideTyping();
        
        if (data.success && data.prompt) {
            addMessage(`📝 **Your Textile Prompt:**\n\n${data.prompt}`, 'bot');
        } else {
            addMessage(`❄️ ${data.error || 'Could not generate prompt. Try again, love.'}`, 'bot');
        }
        
        input.value = '';
        
    } catch (e) {
        hideTyping();
        addMessage(`❄️ Error: ${e.message}`, 'bot');
    }
}

// ============================================================
//  DISPLAY MESSAGES
// ============================================================
function addMessage(text, sender) {
    const container = document.getElementById('messages');
    if (!container) return;
    
    // Check for duplicates in UI
    const allMessages = container.querySelectorAll('.msg .bubble p');
    for (const msg of allMessages) {
        if (msg.textContent === text) {
            console.log('⚠️ Duplicate detected in UI, skipping...');
            return;
        }
    }
    
    const div = document.createElement('div');
    div.className = `msg ${sender}`;

    const botAvatar = IMAGES.sparrow;
    const userAvatar = currentUser ? (USERS[currentUser]?.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUserName || 'Guest') + '&background=1a2a4a&color=fff&size=64') : 'https://ui-avatars.com/api/?name=Guest&background=1a2a4a&color=fff&size=64';

    const avatar = sender === 'bot' ? botAvatar : userAvatar;

    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    div.innerHTML = `
        <div class="msg-avatar"><img src="${avatar}" /></div>
        <div class="bubble"><p>${text.replace(/\n/g, '<br>')}</p><span class="time">${time}</span></div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// ============================================================
//  TYPING
// ============================================================
function showTyping() {
    const c = document.getElementById('messages');
    if (!c) return;
    hideTyping();
    const d = document.createElement('div');
    d.className = 'msg bot';
    d.id = 'typing';
    d.innerHTML = `
        <div class="msg-avatar"><img src="${IMAGES.sparrow}" /></div>
        <div class="bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>
    `;
    c.appendChild(d);
    c.scrollTop = c.scrollHeight;
}

function hideTyping() {
    const t = document.getElementById('typing');
    if (t) t.remove();
}

// ============================================================
//  KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.shiftKey) return;
    
    const input = document.getElementById('msgInput');
    if (document.activeElement === input && currentUser && !isProcessing) {
        e.preventDefault();
        sendMessage();
        return;
    }
    
    const userIdInput = document.getElementById('loginUserId');
    const passwordInput = document.getElementById('loginPassword');
    
    if (document.activeElement === userIdInput) {
        e.preventDefault();
        if (passwordInput) passwordInput.focus();
        return;
    }
    
    if (document.activeElement === passwordInput) {
        e.preventDefault();
        loginUser();
        return;
    }
});

// ============================================================
//  AUTO LOGIN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const saved = localStorage.getItem('sparrowUser');
    if (saved) {
        currentUser = saved;
        const userData = USERS[saved];
        if (userData) {
            currentUserName = userData.name;
            currentUserRole = userData.role;
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('app').style.display = 'flex';
            document.getElementById('userBadge').textContent = userData.name;
            
            // Load memory (no welcome message)
            loadUserMemory(currentUser);
        } else {
            localStorage.removeItem('sparrowUser');
        }
    }
});

// ============================================================
//  SETUP EVENT LISTENERS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sendMessage();
        });
    }
    
    const msgInput = document.getElementById('msgInput');
    if (msgInput) {
        msgInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

// ============================================================
//  GLOBAL FUNCTIONS
// ============================================================
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.sendMessage = sendMessage;
window.generatePrompt = generatePrompt;