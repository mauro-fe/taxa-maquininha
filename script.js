// Tabela de taxas baseada na imagem
const taxas = {
    visa: {
        0: 0.0099, 1: 0.0299, 2: 0.0409, 3: 0.0478, 4: 0.0546, 5: 0.0614,
        6: 0.0681, 7: 0.0767, 8: 0.0833, 9: 0.0898, 10: 0.0962, 11: 0.1026,
        12: 0.1090
    },
    master: {
        0: 0.0099, 1: 0.0299, 2: 0.0409, 3: 0.0478, 4: 0.0546, 5: 0.0614,
        6: 0.0681, 7: 0.0767, 8: 0.0833, 9: 0.0898, 10: 0.0962, 11: 0.1026,
        12: 0.1090
    },
    elo: {
        0: 0.0160, 1: 0.0399, 2: 0.0530, 3: 0.0599, 4: 0.0667, 5: 0.0735,
        6: 0.0802, 7: 0.0947, 8: 0.1013, 9: 0.1078, 10: 0.1142, 11: 0.1206,
        12: 0.1270
    },
    hiper: {
        0: 0.0000, 1: 0.0399, 2: 0.0530, 3: 0.0599, 4: 0.0667, 5: 0.0735,
        6: 0.0802, 7: 0.0947, 8: 0.1013, 9: 0.1078, 10: 0.1142, 11: 0.1206,
        12: 0.1270
    },
    demais: {
        0: 0.0000, 1: 0.0399, 2: 0.0530, 3: 0.0599, 4: 0.0667, 5: 0.0735,
        6: 0.0802, 7: 0.0947, 8: 0.1013, 9: 0.1078, 10: 0.1142, 11: 0.1206,
        12: 0.1270
    }
};

// Elementos do DOM
const valorInput = document.getElementById("valor");
const parcelasInput = document.getElementById("parcelas");
const bandeiraInput = document.getElementById("bandeira");
const resultadoDiv = document.getElementById("resultado");
const calcularBtn = document.getElementById("calcular");

// Função de cálculo
calcularBtn.addEventListener("click", () => {
    const valor = parseFloat(valorInput.value);
    const parcelas = parseInt(parcelasInput.value);
    const bandeira = bandeiraInput.value;
    const responsavel = document.querySelector('input[name="responsavel"]:checked').value;

    if (isNaN(valor) || parcelas < 0 || parcelas > 12) {
        resultadoDiv.innerHTML = `<div class="alert alert-danger">Por favor, insira um valor válido e escolha até 12 parcelas.</div>`;
        return;
    }

    const taxa = taxas[bandeira][parcelas];

    let valorFinalCliente = responsavel === "cliente" ? valor * (1 + taxa) : valor;
    let valorFinalProprietario = responsavel === "proprietario" ? valor * (1 - taxa) : valor;

    resultadoDiv.innerHTML = `
        <div class="alert alert-success">
            <p><strong>Valor da Venda:</strong> R$ ${valor.toFixed(2)}</p>
            <p><strong>Parcelas:</strong> ${parcelas}</p>
            <p><strong>Taxa Aplicada:</strong> ${(taxa * 100).toFixed(2)}%</p>
            <p><strong>Valor Final Cliente:</strong> R$ ${valorFinalCliente.toFixed(2)}</p>
            <p><strong>Valor Final Proprietário:</strong> R$ ${valorFinalProprietario.toFixed(2)}</p>
        </div>
    `;
});
