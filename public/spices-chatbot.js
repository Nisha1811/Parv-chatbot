
(function () {
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
  #parv-chat-widget-container, #parv-chat-widget-container * { box-sizing: border-box !important; font-family: sans-serif; margin: 0; padding: 0; }
  #parv-chat-widget-container { position: fixed; bottom: 20px; right: 20px; z-index: 9999999; display: flex; flex-direction: column; align-items: flex-end; }
  .parv-trigger { width: 60px; height: 60px; border-radius: 50%; background: #111; color: #fff; border: none; cursor: pointer; display: grid; place-items: center; font-size: 26px; box-shadow: 0 8px 24px rgba(0,0,0,0.25); }
  .parv-window { width: 380px; max-width: calc(100vw - 24px); height: 560px; max-height: calc(100vh - 100px); background: #FFFEFB; border: 1px solid #e5e5e5; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); display: none; flex-direction: column; overflow: hidden; margin-bottom: 14px; }
  .parv-window.open { display: flex; }
  .parv-header { padding: 14px 18px; background: #fff; border-bottom: 1px solid #eee; display: flex; align-items: center; justify-content: space-between; font-weight: 600; }
  .parv-close { width: 28px; height: 28px; border-radius: 50%; background: #f3f3f3; border: 1px solid #e5e5e5; cursor: pointer; display: grid; place-items: center; }
  .parv-messages { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #FDFBF7; }
  .parv-msg { max-width: 78%; padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.5; }
  .parv-msg.bot { background: #fff; border: 1px solid #eee; align-self: flex-start; border-bottom-left-radius: 4px; }
  .parv-msg.user { background: #111; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  .parv-input-area { padding: 12px; background: #fff; border-top: 1px solid #eee; display: flex; gap: 8px; align-items: center; }
  .parv-input { flex: 1; border: 1px solid #ddd; border-radius: 24px; padding: 10px 16px; outline: none; font-size: 14px; }
  .parv-send { width: 38px; height: 38px; border-radius: 50%; border: none; background: #111; color: #fff; cursor: pointer; display: grid; place-items: center; }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'parv-chat-widget-container';
  container.innerHTML = `
    <div id="parvWindow" class="parv-window">
      <div class="parv-header">
        <span>${BOT_NAME}</span>
        <button id="parvCloseBtn" class="parv-close">✕</button>
      </div>
      <div id="parvMessages" class="parv-messages">
        <div class="parv-msg bot">Hi! I am ${BOT_NAME} assistant. How can I help you today?</div>
      </div>
      <div class="parv-input-area">
        <input id="parvInput" class="parv-input" placeholder="Type your message..." />
        <button id="parvSendBtn" class="parv-send">➤</button>
      </div>
    </div>
    <button id="parvTrigger" class="parv-trigger">💬</button>
  `;
  document.body.appendChild(container);

  const windowEl = document.getElementById('parvWindow');
  const triggerEl = document.getElementById('parvTrigger');
  const closeBtn = document.getElementById('parvCloseBtn');
  const sendBtn = document.getElementById('parvSendBtn');
  const inputEl = document.getElementById('parvInput');
  const messagesEl = document.getElementById('parvMessages');

  let isOpen = false;
  function toggle() {
    isOpen = !isOpen;
    windowEl.classList.toggle('open', isOpen);
    triggerEl.textContent = isOpen ? '✕' : '💬';
  }
  triggerEl.onclick = toggle;
  closeBtn.onclick = toggle;

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';

    const userDiv = document.createElement('div');
    userDiv.className = 'parv-msg user';
    userDiv.textContent = text;
    messagesEl.appendChild(userDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'parv-msg bot';
    typingDiv.textContent = 'Typing...';
    messagesEl.appendChild(typingDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: text, message: text, sessionId: 'parv_' + Date.now(), botName: BOT_NAME })
      });
      let reply = await res.text();
      try {
        const d = JSON.parse(reply);
        if (Array.isArray(d)) reply = d[0].output || d[0].text || d[0].message || reply;
        else reply = d.output || d.text || d.message || reply;
      } catch {}
      typingDiv.remove();
      const botDiv = document.createElement('div');
      botDiv.className = 'parv-msg bot';
      botDiv.textContent = reply || 'Sorry, no response.';
      messagesEl.appendChild(botDiv);
    } catch (e) {
      typingDiv.textContent = 'Error connecting to server.';
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  sendBtn.onclick = sendMessage;
  inputEl.onkeydown = (e) => { if (e.key === 'Enter') sendMessage(); };
})();

