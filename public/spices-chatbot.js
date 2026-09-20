(function(){
  var s=document.currentScript||document.querySelector('script[src*="spices-chatbot"]');
  var hook=s&&s.dataset.webhook?s.dataset.webhook:'https://n8n.propwiseai.in/webhook/website%20chatbot';
  var botName=s&&s.dataset.botName?s.dataset.botName:'Parv Industries';
  var old=document.getElementById('parv-root');
  if(old){old.remove();}
  var css=document.createElement('style');
  css.textContent='#parv-root{position:fixed;bottom:20px;right:20px;z-index:9999999;font-family:Arial,sans-serif}#parv-win{width:370px;height:520px;background:#fff;border:1px solid #ddd;border-radius:20px;box-shadow:0 20px 50px rgba(0,0,0,.2);display:none;flex-direction:column;overflow:hidden;margin-bottom:12px}#parv-win.open{display:flex}#parv-head{background:#111;color:#fff;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;font-weight:bold}#parv-msgs{flex:1;padding:12px;overflow:auto;display:flex;flex-direction:column;gap:8px;background:#fdfbf7}#parv-msg{padding:10px 14px;border-radius:16px;max-width:80%;font-size:14px}#parv-msg.bot{background:#fff;border:1px solid #eee;align-self:flex-start}#parv-msg.user{background:#111;color:#fff;align-self:flex-end}#parv-input-row{display:flex;gap:6px;padding:10px;border-top:1px solid #eee;background:#fff}#parv-input{flex:1;border:1px solid #ccc;border-radius:20px;padding:10px 14px}#parv-send{width:38px;height:38px;border-radius:50%;border:none;background:#111;color:#fff;cursor:pointer}#parv-btn{width:60px;height:60px;border-radius:50%;background:#111;color:#fff;border:none;font-size:26px;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.3)}#parv-close{width:26px;height:26px;border-radius:50%;border:none;background:#fff;color:#111;cursor:pointer}';
  document.head.appendChild(css);
  var root=document.createElement('div'); root.id='parv-root';
  var win=document.createElement('div'); win.id='parv-win'; win.className='open';
  var head=document.createElement('div'); head.id='parv-head';
  head.innerHTML='<span>'+botName+'</span><button id="parv-close">X</button>';
  var msgs=document.createElement('div'); msgs.id='parv-msgs';
  var first=document.createElement('div'); first.id='parv-msg'; first.className='bot'; first.textContent='Hi! I am '+botName+' assistant. How can I help?';
  msgs.appendChild(first);
  var row=document.createElement('div'); row.id='parv-input-row';
  var input=document.createElement('input'); input.id='parv-input'; input.placeholder='Type message...';
  var send=document.createElement('button'); send.id='parv-send'; send.textContent='>';
  row.appendChild(input); row.appendChild(send);
  win.appendChild(head); win.appendChild(msgs); win.appendChild(row);
  var btn=document.createElement('button'); btn.id='parv-btn'; btn.textContent='X';
  root.appendChild(win); root.appendChild(btn);
  document.body.appendChild(root);
  var isOpen=true;
  function toggle(){isOpen=!isOpen; if(isOpen){win.classList.add('open'); btn.textContent='X';} else {win.classList.remove('open'); btn.textContent='💬';}}
  btn.onclick=toggle;
  document.getElementById('parv-close').onclick=toggle;
  function sendMsg(){
    var txt=input.value.trim(); if(!txt)return; input.value='';
    var u=document.createElement('div'); u.className='parv-msg user'; u.id='parv-msg'; u.textContent=txt; msgs.appendChild(u);
    var t=document.createElement('div'); t.className='parv-msg bot'; t.id='parv-msg'; t.textContent='Typing...'; msgs.appendChild(t);
    msgs.scrollTop=msgs.scrollHeight;
    fetch(hook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chatInput:txt,message:txt,sessionId:'parv_'+Date.now()})}).then(function(r){return r.text();}).then(function(reply){
      try{var d=JSON.parse(reply); if(Array.isArray(d)){reply=d[0].output||d[0].text||reply;} else {reply=d.output||d.text||d.message||reply;}}catch(e){}
      t.textContent=reply||'Sorry no response'; msgs.scrollTop=msgs.scrollHeight;
    }).catch(function(){t.textContent='Error connecting';});
  }
  send.onclick=sendMsg;
  input.onkeydown=function(e){if(e.key==='Enter')sendMsg();};
})();
