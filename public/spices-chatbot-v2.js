(function(){
  var hook='https://n8n.propwiseai.in/webhook/website%20chatbot';
  var botName='Parv Industries';
  var old=document.getElementById('parv-root'); if(old)old.remove();
  var css=document.createElement('style');
  css.textContent='#parv-root{position:fixed;bottom:20px;right:20px;z-index:9999999}#parv-win{width:370px;height:520px;background:#fff;border:1px solid #ddd;border-radius:20px;display:none;flex-direction:column;overflow:hidden;margin-bottom:12px;box-shadow:0 20px 50px rgba(0,0,0,.2)}#parv-win.open{display:flex}#parv-head{background:#111;color:#fff;padding:12px 16px;display:flex;justify-content:space-between;font-weight:bold}#parv-msgs{flex:1;padding:12px;overflow:auto;display:flex;flex-direction:column;gap:8px;background:#fdfbf7}#parv-msg{padding:10px 14px;border-radius:14px;max-width:80%;font-size:14px}#parv-msg.bot{background:#fff;border:1px solid #eee;align-self:flex-start}#parv-msg.user{background:#111;color:#fff;align-self:flex-end}#parv-input-row{display:flex;gap:6px;padding:10px;border-top:1px solid #eee;background:#fff}#parv-input{flex:1;border:1px solid #ccc;border-radius:20px;padding:10px 14px}#parv-send{width:38px;height:38px;border-radius:50%;border:none;background:#111;color:#fff;cursor:pointer}#parv-btn{width:60px;height:60px;border-radius:50%;background:#111;color:#fff;border:none;font-size:26px;cursor:pointer}#parv-close{width:26px;height:26px;border-radius:50%;border:none;background:#fff;cursor:pointer}';
  document.head.appendChild(css);
  var root=document.createElement('div'); root.id='parv-root';
  var win=document.createElement('div'); win.id='parv-win'; win.className='open';
  win.innerHTML='<div id="parv-head"><span>'+botName+'</span><button id="parv-close">X</button></div><div id="parv-msgs"><div id="parv-msg" class="bot">Hi! I am '+botName+' assistant. Demo ready!</div></div><div id="parv-input-row"><input id="parv-input" placeholder="Type..."><button id="parv-send">></button></div>';
  var btn=document.createElement('button'); btn.id='parv-btn'; btn.textContent='X';
  root.appendChild(win); root.appendChild(btn);
  document.body.appendChild(root);
  var msgs=document.getElementById('parv-msgs');
  var input=document.getElementById('parv-input');
  var isOpen=true;
  function toggle(){isOpen=!isOpen; var w=document.getElementById('parv-win'); if(isOpen){w.classList.add('open'); btn.textContent='X';}else{w.classList.remove('open'); btn.textContent='💬';}}
  btn.onclick=toggle;
  document.getElementById('parv-close').onclick=toggle;
  document.getElementById('parv-send').onclick=function(){
    var txt=input.value.trim(); if(!txt)return; input.value='';
    var u=document.createElement('div'); u.id='parv-msg'; u.className='user'; u.textContent=txt; msgs.appendChild(u);
    var t=document.createElement('div'); t.id='parv-msg'; t.className='bot'; t.textContent='Typing...'; msgs.appendChild(t);
    fetch(hook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chatInput:txt})}).then(function(r){return r.text();}).then(function(rep){try{var d=JSON.parse(rep); rep=Array.isArray(d)?(d[0].output||d[0].text||rep):(d.output||d.text||d.message||rep);}catch(e){} t.textContent=rep;});
  };
})();
