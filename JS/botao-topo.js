// Mostra o botão só quando o utilizador desce 300px
window.onscroll = function () 
{
    let btn = document.getElementById("btn-topo");
    if (window.scrollY > 300) 
    {
        btn.style.display = "block";
    } 
    else 
    {
        btn.style.display = "none";
    }
};

function voltarTopo() 
{
    window.scrollTo({ top: 0, behavior: "smooth" });
}