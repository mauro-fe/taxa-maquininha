// Novas taxas de antecipação por parcela (conforme tabela)
const taxasAntecipacao = {
    1: 0.0148, // 1 parcela
    2: 0.0289, // 2 parcelas
    3: 0.0428, // 3 parcelas
    4: 0.0565, // 4 parcelas
    5: 0.0699, // 5 parcelas
    6: 0.0832, // 6 parcelas
    7: 0.0963, // 7 parcelas
    8: 0.1092, // 8 parcelas
    9: 0.1219, // 9 parcelas
    10: 0.1344 // 10 parcelas
};

// Taxa MDR fixa
const taxaMDR = 0.0317;

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
    if (isNaN(valor) || parcelas < 1 || parcelas > 10) {
        resultadoDiv.innerHTML = `<div class="alert alert-danger">Por favor, insira um valor válido e escolha até 10 parcelas.</div>`;
        return;
    }

    // Obtém a taxa de antecipação correspondente
    const taxaAntecipacao = taxasAntecipacao[parcelas];

    let valorFinalCliente, valorFinalProprietario;

    if (responsavel === "cliente") {
        // Cliente assume os juros
        valorFinalCliente = valor * (1 + taxaAntecipacao);
        valorFinalProprietario = valor; // Proprietário recebe o valor cheio
    } else {
        // Proprietário assume os juros
        valorFinalCliente = valor; // Cliente paga apenas o valor original
        valorFinalProprietario = valor * (1 - taxaAntecipacao);
    }

    // Aplicando a taxa MDR sobre o valor recebido pelo proprietário
    const valorLiquidoProprietario = valorFinalProprietario * (1 - taxaMDR);

    // Exibe o resultado
    resultadoDiv.innerHTML = `
        <div class="alert alert-success">
            <p><strong>Valor da Venda:</strong> R$ ${valor.toFixed(2)}</p>
            <p><strong>Quantidade de Parcelas:</strong> ${parcelas}</p>
            <p><strong>Taxa de Antecipação Aplicada:</strong> ${(taxaAntecipacao * 100).toFixed(2)}%</p>
            <p><strong>Valor Final para o Cliente:</strong> R$ ${valorFinalCliente.toFixed(2)}</p>
            <p><strong>Valor Final para o Proprietário (Antes do MDR):</strong> R$ ${valorFinalProprietario.toFixed(2)}</p>
            <p><strong>Valor Líquido para o Proprietário (Após MDR de 3,17%):</strong> R$ ${valorLiquidoProprietario.toFixed(2)}</p>
        </div>
    `;
});
