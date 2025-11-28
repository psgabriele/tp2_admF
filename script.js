function simularSAC() {
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
