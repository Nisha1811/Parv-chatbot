(function(){
  if(document.getElementById('parv-box')){document.getElementById('parv-box').remove();}
  var box=document.createElement('div');
  box.id='parv-box';
  box.innerHTML='<style>#parvWin{display:none;position:fixed;bottom:90px;right:20px;width:360px;height:500px;background:#fff;border:2px solid #000;border-radius:16px;z-index:999999;flex-direction:column;overflow:hidden;}#parvWin.open{display:flex;}#parvBtn{position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:#000;color:#fff;border:none;font-size:24px;z-index:999999;cursor:pointer;}</style><div id="parvWin" class="open"><div style="padding:12px;background:#000;color:#fff;display:flex;justify-content:space-between"><b>Parv Industries</b><button id="parvClose" style="background:#fff;border:none;border-radius:50%;width:24px;height:24px;cursor:pointer">X</button></div><div id="parvMsgs" style="flex:1;padding:12px;overflow:auto"><div>Hi! Chat is working now!</div></div><div style="padding:10px;display:flex;gap:6px;border-top:1px solid #eee"><input id="parvInput" style="flex:1;padding:8px;border-radius:20px;border:1px solid #ccc" placeholder="Type..."><button id="parvSend" style="width:36px;height:36px;border-radius:50%;background:#000;color:#fff;border:none">></button></div></div><button id="parvBtn">💬</button>';
  document.body.appendChild(box);
  var win=document.getElementById('parvWin');
  var btn=document.getElementById('parvBtn');
  var close=document.getElementById('parvClose');
  var isOpen=true;
  function toggle(){isOpen=!isOpen;win.classList.toggle('open',isOpen);btn.textContent=isOpen?'X':'💬';}
  btn.onclick=toggle;
  close.onclick=toggle;
  document.getElementById('parvSend').onclick=function(){
    var i=document.getElementById('parvInput');
    var m=document.getElementById('parvMsgs');
    if(!i.value.trim())return;
    var d=document.createElement('div');
    d.textContent='You: '+i.value;
    d.style.cssText='background:#000;color:#fff;padding:8px 12px;border-radius:12px;margin:6px 0;align-self:flex-end;';
    m.appendChild(d);
    i.value='';
    fetch('https://n8n.propwiseai.in/webhook/website%20chatbot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chatInput:d.textContent})}).then(r=>r.text()).then(t=>{var b=document.createElement('div');b.textContent='Bot: '+t; b.style.cssText='background:#eee;padding:8px 12px;border-radius:12px;margin:6px 0;'; m.appendChild(b); m.scrollTop=m.scrollHeight;});
  };
})();
