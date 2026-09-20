

(function () {
  // Get config from script tag data attributes
  var currentScript = document.currentScript || document.querySelector('script[src*="spices-chatbot.js"]');
  var WEBHOOK_URL = (currentScript && currentScript.dataset.webhook) ? currentScript.dataset.webhook : 'https://n8n.propwiseai.in/webhook/website%20chatbot';
  var BOT_NAME = (currentScript && currentScript.dataset.botName) ? currentScript.dataset.botName : 'Parv Industries';
  
  if (document.getElementById('parv-chat-widget-container')) {
    document.getElementById('parv-chat-widget-container').remove();
    document.getElementById('parv-chatbot-styles')?.remove();
  }
  const style = document.createElement('style');
  style.id = 'parv-chatbot-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Outfit:wght@400;500;600&display=swap');
    #parv-chat-widget-container, #parv-chat-widget-container * { box-sizing: border-box !important; font-family: 'Outfit', sans-serif; margin: 0; padding: 0; }
    #parv-chat-widget-container { position: fixed; bottom: 24px; right: 24px; z-index: 9999999; display: flex; flex-direction: column; align-items: flex-end; }
    .parv-trigger-wrap { position: relative; }
    .parv-trigger-pulse { position: absolute; inset: 0; border-radius: 50%; background: #111; animation: parv-pulse 2.5s infinite; }
    @keyframes parv-pulse { 0% { transform: scale(1); opacity: .3 } 100% { transform: scale(1.9); opacity: 0 } }
    .parv-trigger { width: 62px; height: 62px; border-radius: 50%; background: radial-gradient(120% 120% at 30% 20%, #2A2A2A 0%, #111 100%); color: #fff; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 12px 28px rgba(0,0,0,0.22); cursor: pointer; display: grid; place-items: center; transition: all 0.35s cubic-bezier(0.16,1,0.3,1); }
    .parv-window { width: 392px; max-width: calc(100vw - 32px); height: 640px; max-height: calc(100vh - 100px); background: #FFFEFB; border: 1px solid rgba(0,0,0,0.08); border-radius: 28px; box-shadow: 0 24px 64px rgba(0,0,0,0.16); display: flex; flex-direction: column; overflow: hidden; margin-bottom: 18px; opacity: 0; transform: translateY(16px) scale(0.97); pointer-events: none; transition: all 0.48s cubic-bezier(0.16,1,0.3,1); transform-origin: bottom right; }
    .parv-window.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
    .parv-header { padding: 16px 24px !important; background: #FFFEFB; border-bottom: 1px solid rgba(0,0,0,0.07); display: flex; align-items: center; justify-content: space-between; }
    .parv-header-left { display: flex; align-items: center; gap: 12px; }
    .parv-avatar { width: 40px; height: 40px; border-radius: 50%; background: #111; color: #fff; display: grid; place-items: center; font-family: 'Fraunces', serif; font-weight: 600; }
    .parv-title { font-family: 'Fraunces', serif; font-weight: 600; font-size: 16px; color: #111; }
    .parv-status { font-size: 12px; color: #6B7280; display: flex; align-items: center; gap: 6px; margin-top: 3px; }
    .parv-dot { width: 6px; height: 6px; background: #16a34a; border-radius: 50%; box-shadow: 0 0 0 4px rgba(22,163,74,0.15); }
    .parv-close-btn { width: 32px; height: 32px; border-radius: 50%; background: #F6F3EE; border: 1px solid rgba(0,0,0,0.06); cursor: pointer; display: grid; place-items: center; }
    .parv-messages { flex: 1; padding-left: 24px !important; padding-right: 24px !important; padding-top: 24px !important; padding-bottom: 24px !important; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; background-color: #FDFBF7; position: relative; isolation: isolate; }
    .parv-messages::before { content: ''; position: absolute; inset: 0; z-index: -2; background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px); background-size: 28px 28px; opacity: 0.6; }
    .parv-messages::after { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0; background: radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(17,17,17,0.06), transparent 60%); transition: opacity 0.4s ease; }
    .parv-messages:hover::after { opacity: 1; }
    .parv-msg-row { display: flex; gap: 10px; align-items: flex-end; width: 100%; animation: parv-in 0.38s cubic-bezier(0.16,1,0.3,1); }
    .parv-msg-row.user { justify-content: flex-end; }
    @keyframes parv-in { from { opacity:0; transform: translateY(10px) } to { opacity:1; transform: translateY(0) } }
    .parv-msg-avatar { width: 28px; height: 28px; border-radius: 50%; background: #111; color: #fff; display: grid; place-items: center; font-size: 11px; flex-shrink: 0; }
    .parv-msg { max-width: 75% !important; padding: 12px 16px !important; border-radius: 20px; font-size: 14px; line-height: 1.55; word-wrap: break-word; }
    .parv-msg.bot { background: #fff; border: 1px solid rgba(0,0,0,0.07); color: #1F1F1F; border-bottom-left-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); margin-right: auto; }
    .parv-msg.user { background: #111; color: #FFFEFB; border-bottom-right-radius: 6px; margin-left: auto; }
    .parv-chips { display: grid !important; grid-template-columns: 1fr 1fr; gap: 10px !important; width: 100% !important; padding: 0 !important; }
    .parv-chip { background: #fff; border: 1px solid rgba(0,0,0,0.08); color: #111; padding: 12px 14px !important; border-radius: 14px; font-size: 13px; font-weight: 500; cursor: pointer; text-align: left; transition: all 0.22s; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .parv-chip:hover { background: #111; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 18px rgba(0,0,0,0.16); }
    .parv-input-area { padding: 16px 24px 16px 24px !important; background: #FFFEFB; border-top: 1px solid rgba(0,0,0,0.07); display: flex; flex-direction: column; gap: 10px; }
    .parv-input-wrap { display: flex; align-items: center; gap: 8px; background: #F6F3EE; border: 1px solid rgba(0,0,0,0.06); border-radius: 100px; padding: 5px 6px 5px 18px !important; transition: all 0.25s; }
    .parv-input-wrap:focus-within { background: #fff; border-color: #111; box-shadow: 0 0 0 4px rgba(0,0,0,0.06); }
    .parv-input { flex: 1; background: transparent; border: none; outline: none; font-size: 14px; color: #111; padding: 9px 0; }
    .parv-send-btn { width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer; background: #111; color: #fff; display: grid; place-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.2s; }
    .parv-send-btn:hover { transform: scale(1.08); }
    .parv-foot { text-align: center; font-size: 11px; color: #9CA3AF; }
    .parv-foot strong { color: #111; }
    .parv-typing { display: flex; gap: 4px; padding: 14px 16px; background: #fff; border: 1px solid rgba(0,0,0,0.07); border-radius: 18px; border-bottom-left-radius: 6px; }
    .parv-dot-typing { width: 6px; height: 6px; background: #111; border-radius: 50%; animation: parv-b 1.2s infinite; }
    .parv-dot-typing:nth-child(2){animation-delay:.15s} .parv-dot-typing:nth-child(3){animation-delay:.3s}
    @keyframes parv-b { 0%,80%,100%{transform:translateY(0);opacity:.5} 40%{transform:translateY(-5px);opacity:1} }
    .parv-trigger-icon { display: grid; place-items: center; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s; }
    .parv-trigger.open .parv-trigger-icon { transform: rotate(180deg) scale(0.9); }
  `;
  document.head.appendChild(style);
  const SESSION_ID = 'parv_' + Math.random().toString(36).slice(2,9);
  const container = document.createElement('div');
  container.id = 'parv-chat-widget-container';
  container.innerHTML = `
    <div class="parv-window" id="parvWindow">
      <div class="parv-header">
        <div class="parv-header-left">
          <div class="parv-avatar">P</div>
          <div><div class="parv-title">${BOT_NAME}</div><div class="parv-status"><span class="parv-dot"></span> Online</div></div>
        </div>
        <button class="parv-close-btn" id="parvCloseBtn">✕</button>
      </div>
      <div class="parv-messages" id="parvMessages">
        <div class="parv-chips" id="parvChips"></div>
      </div>
      <div class="parv-input-area">
        <div class="parv-input-wrap">
          <input type="text" class="parv-input" id="parvInput" placeholder="Ask about spices, bulk orders..." autocomplete="off" />
          <button class="parv-send-btn" id="parvSendBtn">➤</button>
        </div>
        <div class="parv-foot">Built for business • <strong>${BOT_NAME}</strong></div>
      </div>
    </div>
    <div class="parv-trigger-wrap">
      <div class="parv-trigger-pulse" id="parvPulse"></div>
      <button class="parv-trigger" id="parvTrigger">
        <span class="parv-trigger-icon" id="parvTriggerIcon">💬</span>
      </button>
    </div>
  `;
  document.body.appendChild(container);
  const windowEl = document.getElementById('parvWindow');
  const triggerEl = document.getElementById('parvTrigger');
  const triggerIcon = document.getElementById('parvTriggerIcon');
  const pulseEl = document.getElementById('parvPulse');
  const closeBtn = document.getElementById('parvCloseBtn');
  const sendBtn = document.getElementById('parvSendBtn');
  const inputEl = document.getElementById('parvInput');
  const messagesEl = document.getElementById('parvMessages');
  const chipsEl = document.getElementById('parvChips');
  ["🌶 Spices List", "🥥 Coconut Water", "🍜 Noodles", "📦 Bulk Quote"].forEach(text => {
    const chip = document.createElement('button');
    chip.className = 'parv-chip';
    chip.textContent = text;
    chip.onclick = () => { inputEl.value = text; sendMessage(); };
    chipsEl.appendChild(chip);
  });
  messagesEl.addEventListener('mousemove', (e) => {
    const rect = messagesEl.getBoundingClientRect();
    messagesEl.style.setProperty('--mx', ((e.clientX - rect.left)/rect.width*100)+'%');
    messagesEl.style.setProperty('--my', ((e.clientY - rect.top)/rect.height*100)+'%');
  });
  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
    windowEl.classList.toggle('open', isOpen);
    triggerEl.classList.toggle('open', isOpen);
    if (isOpen) {
      triggerIcon.style.transform = 'rotate(180deg) scale(0)';
      triggerIcon.style.opacity = '0';
      setTimeout(() => { triggerIcon.textContent = '✕'; triggerIcon.style.transform = 'rotate(0deg) scale(1)'; triggerIcon.style.opacity = '1'; }, 150);
      pulseEl.style.display = 'none';
      setTimeout(()=> inputEl.focus(), 300);
    } else {
      triggerIcon.style.transform = 'rotate(-180deg) scale(0)';
      triggerIcon.style.opacity = '0';
      setTimeout(() => { triggerIcon.textContent = '💬'; triggerIcon.style.transform = 'rotate(0deg) scale(1)'; triggerIcon.style.opacity = '1'; }, 150);
      pulseEl.style.display = 'block';
    }
  }
  triggerEl.onclick = toggle;
  closeBtn.onclick = toggle;
  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    chipsEl.style.display = 'none';
    const row = document.createElement('div');
    row.className = 'parv-msg-row user';
    row.innerHTML = `<div class="parv-msg user">${text}</div>`;
    messagesEl.appendChild(row);
    const typingRow = document.createElement('div');
    typingRow.className = 'parv-msg-row';
    typingRow.innerHTML = `<div class="parv-msg-avatar">P</div><div class="parv-typing"><div class="parv-dot-typing"></div><div class="parv-dot-typing"></div><div class="parv-dot-typing"></div></div>`;
    messagesEl.appendChild(typingRow);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    try {
      const res = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatInput: text, message: text, payload: { text }, sessionId: SESSION_ID, botName: BOT_NAME }) });
      typingRow.remove();
      let reply = await res.text();
      try { const d = JSON.parse(reply); reply = Array.isArray(d) ? (d[0].output||d[0].text||'') : (d.output||d.text||d.message||reply); } catch {}
      const botRow = document.createElement('div');
      botRow.className = 'parv-msg-row';
      botRow.innerHTML = `<div class="parv-msg-avatar">P</div><div class="parv-msg bot">${reply.replace(/\n/g,'<br>')}</div>`;
      messagesEl.appendChild(botRow);
    } catch (e) { typingRow.remove(); }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  sendBtn.onclick = sendMessage;
  inputEl.onkeydown = (e) => { if (e.key === 'Enter') sendMessage(); };
})();

