const modal=document.getElementById("modal"), close=document.getElementById("closeModal");
const serviceTitle=document.getElementById("modalService"), linkHelp=document.getElementById("linkHelp");
const link=document.getElementById("link"), quantity=document.getElementById("quantity");
const total=document.getElementById("total"), send=document.getElementById("send");
let selected={name:"",price:0,type:""};

function money(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
document.querySelectorAll(".service-card").forEach(card=>{
  card.querySelector(".order-btn").addEventListener("click",()=>{
    selected={name:card.dataset.service,price:Number(card.dataset.price),type:card.dataset.type};
    serviceTitle.textContent=selected.name;
    linkHelp.textContent=selected.type==="profile"
      ?"Para seguidores, informe o link do perfil do Instagram."
      :"Para curtidas/visualizações, informe o link do post ou do Reels. Para Reels, use o link específico do Reels.";
    link.placeholder=selected.type==="profile"
      ?"https://www.instagram.com/seuperfil/"
      :"https://www.instagram.com/reel/...";
    quantity.value=""; link.value=""; total.textContent=money(0);
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
    link.focus();
  });
});
function updateTotal(){
  const q=Number(quantity.value)||0;
  total.textContent=money((q/1000)*selected.price);
}
quantity.addEventListener("input",updateTotal);
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
close.addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
send.addEventListener("click",()=>{
  const url=link.value.trim(), q=Number(quantity.value);
  if(!url){alert("Informe o link do Instagram.");link.focus();return}
  if(!/^https?:\/\/(www\.)?instagram\.com\//i.test(url)){alert("Informe um link válido do Instagram.");link.focus();return}
  if(!q || q<1){alert("Informe uma quantidade válida.");quantity.focus();return}
  const value=(q/1000)*selected.price;
  const text=[
    "NOVO PEDIDO - PAINEL DE ENGAJAMENTO",
    "",
    `Serviço: ${selected.name}`,
    `Link: ${url}`,
    `Quantidade: ${q.toLocaleString("pt-BR")}`,
    `Valor: ${money(value)}`,
    "",
    "Perfil/conteúdo deve estar público no momento do pedido."
  ].join("\n");
  const phone="5511910203526";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,"_blank");
});
