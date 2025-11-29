function simularSAC() {
    // O SAC (Sistema de Amortização Constante) é calculado abaixo com base na fórmula
    // Amortização = Valor Total do Financiamento / Número de Parcelas

    const valor = Number(document.getElementById("valor").value);
    const juros = Number(document.getElementById("juros").value) / 100;
    const n = Number(document.getElementById("parcelas").value);

    const amortizacao = valor / n;
    let saldo = valor;

    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    let linhaInicial = `
        <tr>
            <td>0</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>R$ ${saldo.toFixed(2)}</td>
        </tr>
    `;
    tbody.innerHTML += linhaInicial;

    for (let i = 1; i <= n; i++) {
        let jurosParcela = saldo * juros;
        let prestacao = amortizacao + jurosParcela;
        saldo -= amortizacao;

        let linha = `
            <tr>
                <td>${i}</td>
                <td>${prestacao.toFixed(2)}</td>
                <td>${amortizacao.toFixed(2)}</td>
                <td>${jurosParcela.toFixed(2)}</td>
                <td>${saldo.toFixed(2)}</td>
            </tr>
        `;

        tbody.innerHTML += linha;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("price-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            calcularPrice();
        });
    }
});

function calcularPrice() {
    // Os valores da Tabela Price são calculados com base na fórmula 
    // P = (PV * i) / [1–(1+i)^ -n}, onde:
    // P é o valor da parcela, PV é o valor presente (valor principal), 
    // i é a taxa de juros (em decimal) e n é o número de parcelas

    const valor = Number(document.getElementById("amount").value);
    const jurosPercent = Number(document.getElementById("interest-rate").value);
    const n = Number(document.getElementById("term").value);

    if (!valor || n <= 0 || isNaN(jurosPercent)) {
        alert("Preencha valor, taxa de juros e número de parcelas corretamente.");
        return;
    }

    const i = jurosPercent / 100;
    let saldo = valor;

    const container = document.getElementById("price-amortization-schedule");
    container.innerHTML = "";

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Parcela</th>
                    <th>Prestação</th>
                    <th>Amortização</th>
                    <th>Juros</th>
                    <th>Saldo Devedor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>R$ ${saldo.toFixed(2)}</td>
                </tr>
    `;

    let prestacao;
    if (i === 0) {
        prestacao = valor / n;
    } else {
        const factor = Math.pow(1 + i, n);
        prestacao = valor * i * factor / (factor - 1);
    }

    for (let k = 1; k <= n; k++) {
        const jurosParcela = saldo * i;
        let amortizacao = prestacao - jurosParcela;

        if (k === n) {
            amortizacao = saldo;
            prestacao = jurosParcela + amortizacao;
            saldo = 0;
        } else {
            saldo -= amortizacao;
        }

        html += `
            <tr>
                <td>${k}</td>
                <td>R$ ${prestacao.toFixed(2)}</td>
                <td>R$ ${amortizacao.toFixed(2)}</td>
                <td>R$ ${jurosParcela.toFixed(2)}</td>
                <td>R$ ${saldo.toFixed(2)}</td>
            </tr>
        `;
    }

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("price-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            calcularPrice();
        });
    }
});