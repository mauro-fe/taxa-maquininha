// Tabela de taxas (baseada na imagem)
const taxas = {
    0: 0.0091,  // Débito
    1: 0.0297,  // Crédito à vista
    2: 0.0360,  // 2 parcelas
    3: 0.0429,  // 3 parcelas
    4: 0.0498,  // 4 parcelas
    5: 0.0565,  // 5 parcelas
    6: 0.0632,  // 6 parcelas
    7: 0.0698,  // 7 parcelas
    8: 0.0764,  // 8 parcelas
    9: 0.0829,  // 9 parcelas
    10: 0.0894, // 10 parcelas
    11: 0.0957, // 11 parcelas
    12: 0.1021  // 12 parcelas
};

// Elementos do DOM
const valorInput = document.getElementById("valor");
const parcelasInput = document.getElementById("parcelas");
const resultadoDiv = document.getElementById("resultado");
const calcularBtn = document.getElementById("calcular");

// Função de cálculo
calcularBtn.addEventListener("click", () => {
    const valor = parseFloat(valorInput.value);
    const parcelas = parseInt(parcelasInput.value);
    const responsavel = document.querySelector('input[name="responsavel"]:checked').value;

    // Verifica se os valores são válidos
    if (isNaN(valor) || parcelas < 0 || !taxas.hasOwnProperty(parcelas)) {
        resultadoDiv.innerHTML = `<div class="alert alert-danger">Por favor, insira valores válidos.</div>`;
        return;
    }

    // Obtém a taxa correspondente
    const taxa = taxas[parcelas];

    let valorFinalCliente, valorFinalProprietario;

    if (responsavel === "cliente") {
        // Juros por conta do cliente
        valorFinalCliente = valor * (1 + taxa);
        valorFinalProprietario = valor; // Proprietário recebe o valor cheio
    } else {
        // Juros por conta do proprietário
        valorFinalCliente = valor; // Cliente paga apenas o valor original
        valorFinalProprietario = valor * (1 - taxa);
    }

    // Exibe o resultado
    resultadoDiv.innerHTML = `
        <div class="alert alert-success">
            <p><strong>Valor da Venda:</strong> R$ ${valor.toFixed(2)}</p>
            <p><strong>Quantidade de Parcelas:</strong> ${parcelas === 0 ? "Débito" : parcelas}</p>
            <p><strong>Taxa Aplicada:</strong> ${(taxa * 100).toFixed(2)}%</p>
            <p><strong>Valor Final para o Cliente:</strong> R$ ${valorFinalCliente.toFixed(2)}</p>
            <p><strong>Valor Final para o Proprietário:</strong> R$ ${valorFinalProprietario.toFixed(2)}</p>
        </div>
    `;
});
