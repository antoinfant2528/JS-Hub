document.querySelector("#navbar").addEventListener('click',((e)=>{
          window.location.href="/"+e.target.id+".html";
      }))