const itensSelecionados = [];

function selecionar(elemento, tipo) {
    if (elemento.classList.contains("escolhido")) {
        elemento.classList.remove("escolhido");
        elemento.style.border = "solid 5px #FFFFFF";

        // Remove o item da lista de selecionados
        const index = itensSelecionados.findIndex(item => item.elemento === elemento);
        if (index > -1) {
            itensSelecionados.splice(index, 1);
        }
    } else {
        elemento.classList.add("escolhido");
        elemento.style.border = "solid 5px #32B72F";

        // Adiciona o item à lista de selecionados
        itensSelecionados.push({ tipo, elemento });
    }

    ativar();
}

function ativar() {
    if (itensSelecionados.length > 0) {
        document.querySelector(".comItens").style.display = "flex";
        document.querySelector(".semItens").style.display = "none";
    } else {
        document.querySelector(".comItens").style.display = "none";
        document.querySelector(".semItens").style.display = "flex";
    }
}

function valor(preco) {
    const valorSemSimbolo = preco.replace("R$", "").replace(",", ".");
    return parseFloat(valorSemSimbolo.trim());
}

function pedir() {
    let total = 0;
    let msg = "Olá, gostaria de fazer o pedido:\n";

    itensSelecionados.forEach(item => {
        const nome = item.elemento.querySelector("h3").textContent;
        const preco = valor(item.elemento.querySelector(".preco").textContent);
        total += preco;
        msg += `- ${item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}: ${nome}\n`;
    });

    msg += `Total: R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/5583996750737?text=${encodeURIComponent(msg)}`);
}