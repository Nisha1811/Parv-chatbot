(function(){
  var s=document.currentScript;
  var HOOK=s&&s.dataset.webhook?s.dataset.webhook:'https://n8n.propwiseai.in/webhook/website%20chatbot';
  if(document.getElementById('parv-finder-root')) return;
  var SID_KEY='parv_sid'; var SESSION_ID=localStorage.getItem(SID_KEY);
  if(!SESSION_ID){SESSION_ID='parv_'+Date.now()+'_'+Math.random().toString(36).slice(2,6); localStorage.setItem(SID_KEY, SESSION_ID);}

  var css=document.createElement('style');
  css.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    #parv-finder-root{position:fixed;inset:0;z-index:9999999;background:#fcfcff;font-family:Inter,sans-serif;display:flex;overflow:hidden}
    #parv-finder-root *{box-sizing:border-box;font-family:Inter,sans-serif}
    .pf-sidebar{width:280px;background:#fff;border-right:1px solid #e8e8ef;display:flex;flex-direction:column;flex-shrink:0}
    .pf-side-top{padding:18px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f0f0f5}
    .pf-logo{font-weight:700;font-size:16px;color:#4f46e5}
    .pf-new-btn{margin:16px;background:#4f46e5;color:#fff;border:none;border-radius:12px;padding:12px 16px;font-weight:600;font-size:14px;cursor:pointer;box-shadow:0 4px 14px rgba(79,70,229,.3);transition:.2s}
    .pf-new-btn:hover{background:#4338ca;transform:translateY(-1px)}
    .pf-recent-label{font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:.08em;padding:16px 16px 8px}
    .pf-recent-item{margin:4px 12px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:.15s}
    .pf-recent-item.active{background:#eef2ff;border:1px solid #c7d2fe}
    .pf-recent-item:hover{background:#f5f3ff}
    .pf-recent-title{font-size:13px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .pf-recent-sub{font-size:11px;color:#6b7280;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .pf-side-bottom{margin-top:auto;padding:12px 16px;border-top:1px solid #f0f0f5;display:flex;align-items:center;gap:10px}
    .pf-avatar{width:32px;height:32px;border-radius:50%;background:#4f46e5;color:#fff;display:grid;place-items:center;font-weight:600;font-size:12px}
    .pf-main{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative;background:radial-gradient(1200px 600px at 50% -10%, #eef2ff 0%, #fcfcff 50%, #fff 100%)}
    .pf-topbar{height:56px;background:#fff;border-bottom:1px solid #eeeefa;display:flex;align-items:center;justify-content:space-between;padding:0 24px;flex-shrink:0}
    .pf-top-title{font-weight:600;font-size:14px}
    .pf-share-btn{width:36px;height:36px;border-radius:10px;background:#4f46e5;color:#fff;border:none;display:grid;place-items:center;cursor:pointer}
    .pf-center{flex:1;overflow:auto;display:flex;flex-direction:column;align-items:center;padding:40px 20px 20px}
    .pf-heading{font-size:42px;font-weight:800;line-height:1.15;letter-spacing:-.02em;text-align:center;max-width:640px;color:#0f172a}
    .pf-sub{margin-top:12px;font-size:15px;color:#64748b;text-align:center;max-width:560px}
    .pf-search-wrap{margin-top:32px;width:100%;max-width:680px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:8px 8px 8px 16px;display:flex;align-items:center;gap:8px;box-shadow:0 8px 30px rgba(0,0,0,.06),0 2px 8px rgba(0,0,0,.04);transition:.2s}
    .pf-search-wrap:focus-within{border-color:#4f46e5;box-shadow:0 0 0 4px rgba(79,70,229,.12),0 8px 30px rgba(0,0,0,.08)}
    .pf-icon-btn{width:36px;height:36px;border-radius:10px;background:#f8fafc;border:none;display:grid;place-items:center;cursor:pointer;color:#64748b;flex-shrink:0}
    .pf-input{flex:1;border:none;outline:none;font-size:14px;color:#0f172a;background:transparent}
    .pf-send{background:#4f46e5;width:40px;height:40px;border-radius:12px;border:none;color:#fff;display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:.2s}
    .pf-send:hover{background:#4338ca}
    .pf-chips-grid{margin-top:20px;width:100%;max-width:680px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .pf-chip-card{border-radius:14px;padding:16px 16px;font-size:13px;font-weight:500;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.04);transition:.2s;text-align:left;line-height:1.4}
    .pf-chip-card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.08)}
    .pf-chip-pink{background:#fdf2ff;border-color:#f5d0fe}
    .pf-chip-blue{background:#eff6ff;border-color:#bfdbfe}
    .pf-chip-yellow{background:#fefce8;border-color:#fef08a}
    .pf-chip-red{background:#fef2f2;border-color:#fecaca}
    .pf-chat-area{width:100%;max-width:680px;margin-top:24px;display:flex;flex-direction:column;gap:14px}
    .pf-msg{padding:12px 16px;border-radius:18px;font-size:14px;line-height:1.6;max-width:85%;word-wrap:break-word;white-space:pre-wrap}
    .pf-msg.user{background:#111827;color:#fff;align-self:flex-end;border-bottom-right-radius:6px;margin-left:auto}
    .pf-msg.bot{background:#fff;border:1px solid #e5e7eb;color:#111827;align-self:flex-start;border-bottom-left-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
    .pf-typing{display:flex;gap:4px;padding:14px 16px;background:#fff;border:1px solid #e5e7eb;border-radius:18px;border-bottom-left-radius:6px;width:fit-content}
    .pf-dot{width:6px;height:6px;background:#111827;border-radius:50%;animation:pf-b 1.2s infinite}
    .pf-dot:nth-child(2){animation-delay:.15s}.pf-dot:nth-child(3){animation-delay:.3s}
    @keyframes pf-b{0%,80%,100%{transform:translateY(0);opacity:.5}40%{transform:translateY(-5px);opacity:1}}
    .pf-wa{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;background:#25d366;color:#fff;border:none;display:grid;place-items:center;box-shadow:0 8px 24px rgba(37,211,102,.4);cursor:pointer;z-index:10}
    .pf-close-finder{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:#fff;border:1px solid #e5e7eb;display:grid;place-items:center;cursor:pointer;z-index:5}
    @media(max-width:768px){.pf-sidebar{display:none}.pf-heading{font-size:30px}.pf-chips-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(css);

  var root=document.createElement('div'); root.id='parv-finder-root';
  root.innerHTML=`
    <div class="pf-sidebar">
      <div class="pf-side-top"><div class="pf-logo">Parv Industries</div><div style="cursor:pointer">‹</div></div>
      <button class="pf-new-btn" id="pfNewBtn">+ New Search</button>
      <div class="pf-recent-label">RECENT SEARCHES</div>
      <div id="pfRecentList">
        <div class="pf-recent-item active" data-q="Spices bulk 1000kg"><div class="pf-recent-title">Spices Bulk Search</div><div class="pf-recent-sub">Looking for 25kg packs, 1000kg MOQ...</div></div>
        <div class="pf-recent-item" data-q="Coconut water export"><div class="pf-recent-title">Coconut Water Export</div><div class="pf-recent-sub">200ml x 48 pieces inquiry</div></div>
        <div class="pf-recent-item" data-q="Eurofresh Noodles"><div class="pf-recent-title">Noodles Distributor</div><div class="pf-recent-sub">45g x 96, ₹500 carton</div></div>
      </div>
      <div class="pf-side-bottom"><div class="pf-avatar">U</div><div><div style="font-size:13px;font-weight:600">User</div><div style="font-size:11px;color:#6b7280">Free</div></div></div>
    </div>
    <div class="pf-main">
      <div class="pf-topbar"><div class="pf-top-title">Parv Industries ▾</div><button class="pf-share-btn">↗</button></div>
      <button class="pf-close-finder" id="pfCloseFinder">✕</button>
      <div class="pf-center" id="pfCenter">
        <div id="pfHero">
          <div class="pf-heading">What type of product would you like to explore?</div>
          <div class="pf-sub">Search by product, quantity, price, or let AI help you find your perfect match</div>
          <div class="pf-search-wrap" id="pfSearchWrap">
            <button class="pf-icon-btn">📎</button>
            <button class="pf-icon-btn">⚙</button>
            <input class="pf-input" id="pfInput" placeholder="Search products..." autocomplete="off"/>
            <button class="pf-icon-btn" id="pfMicBtn">🎤</button>
            <button class="pf-send" id="pfSendBtn">➤</button>
          </div>
          <div class="pf-chips-grid" id="pfChipsGrid">
            <button class="pf-chip-card pf-chip-pink" data-q="Spices List">🌿 Modern Spices List with 25kg Pack</button>
            <button class="pf-chip-card pf-chip-blue" data-q="Coconut water">🌴 Pure Coconut Water 200ml x 48</button>
            <button class="pf-chip-card pf-chip-yellow" data-q="Noodles">✨ Eurofresh Noodles 45g x 96 - ₹500</button>
            <button class="pf-chip-card pf-chip-red" data-q="Bulk quote for export">🏛️ Bulk Quote for Export Order</button>
          </div>
        </div>
        <div class="pf-chat-area" id="pfChatArea" style="display:none"></div>
      </div>
      <button class="pf-wa" onclick="window.open('https://wa.me/919999999999','_blank')">W</button>
    </div>
  `;
  document.body.appendChild(root);

  var input=document.getElementById('pfInput');
  var sendBtn=document.getElementById('pfSendBtn');
  var chatArea=document.getElementById('pfChatArea');
  var hero=document.getElementById('pfHero');
  var recentList=document.getElementById('pfRecentList');

  function showChat(){ hero.style.display='none'; chatArea.style.display='flex'; chatArea.innerHTML=''; }
  function newSearch(){ hero.style.display='block'; chatArea.style.display='none'; chatArea.innerHTML=''; input.value=''; document.querySelectorAll('.pf-recent-item').forEach(i=>i.classList.remove('active')); document.querySelector('.pf-recent-item').classList.add('active'); localStorage.removeItem(SID_KEY); SESSION_ID='parv_'+Date.now(); localStorage.setItem(SID_KEY, SESSION_ID); }

  document.getElementById('pfNewBtn').onclick=newSearch;
  document.getElementById('pfCloseFinder').onclick=function(){ root.remove(); css.remove(); };
  recentList.onclick=function(e){ var item=e.target.closest('.pf-recent-item'); if(!item) return; document.querySelectorAll('.pf-recent-item').forEach(i=>i.classList.remove('active')); item.classList.add('active'); var q=item.dataset.q; input.value=q; doSearch(q); };
  document.getElementById('pfChipsGrid').onclick=function(e){ var b=e.target.closest('button'); if(!b) return; var q=b.dataset.q; input.value=q; doSearch(q); };

  async function doSearch(text){
    if(!text.trim()) return; showChat();
    var userDiv=document.createElement('div'); userDiv.className='pf-msg user'; userDiv.textContent=text; chatArea.appendChild(userDiv);
    var typing=document.createElement('div'); typing.className='pf-typing'; typing.innerHTML='<div class="pf-dot"></div><div class="pf-dot"></div><div class="pf-dot"></div>'; chatArea.appendChild(typing);
    chatArea.parentElement.scrollTop=chatArea.parentElement.scrollHeight;
    try{
      var res=await fetch(HOOK,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chatInput:text,message:text,text:text,sessionId:SESSION_ID})});
      var reply=await res.text(); try{ var d=JSON.parse(reply); reply=Array.isArray(d)?(d[0].output||d[0].text||d[0].message||reply):(d.output||d.text||d.message||d.response||reply);}catch{}
      if(!reply || reply.trim()==='{}' || reply.trim()==='[]') reply='Please share your requirement, our team will provide exact details 😊';
      typing.remove();
      var bot=document.createElement('div'); bot.className='pf-msg bot'; bot.innerHTML=reply.replace(/\n/g,'<br>'); chatArea.appendChild(bot);
      // add to recent
      var newItem=document.createElement('div'); newItem.className='pf-recent-item'; newItem.dataset.q=text; newItem.innerHTML='<div class="pf-recent-title">'+text.slice(0,24)+'</div><div class="pf-recent-sub">'+reply.slice(0,40)+'...</div>'; recentList.prepend(newItem);
    }catch(e){ typing.remove(); var err=document.createElement('div'); err.className='pf-msg bot'; err.textContent='Cannot reach server. Make sure n8n workflow is Active.'; chatArea.appendChild(err); }
    chatArea.parentElement.scrollTop=chatArea.parentElement.scrollHeight;
  }

  sendBtn.onclick=function(){ var t=input.value; input.value=''; doSearch(t); };
  input.onkeydown=function(e){ if(e.key==='Enter'){ var t=input.value; input.value=''; doSearch(t);} };
})();
