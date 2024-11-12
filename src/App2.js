import logo from "./logo.svg";
import "./App.css";

function App() {
  function abrirModal(modalId) {
    document.getElementById(modalId).style.display = "block";
  }

  function fecharModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }

  function gerarRelatorio() {
    try {
      const dadosEmpresa = {
        logo:
          document.getElementById("logo-empresa").files[0]?.name ||
          "Não informado",
        nome: document.getElementById("nome-empresa").value,
        endereco: document.getElementById("endereco-empresa").value,
        telefone: document.getElementById("telefone-empresa").value,
      };

      const ocorrencia = {
        data: document.getElementById("data-ocorrencia").value,
        hora: document.getElementById("hora-ocorrencia").value,
        descricao: document.getElementById("descricao-ocorrido").value,
        envolvidos: {
          nome: document.getElementById("nome-envolvido").value,
          cpf: document.getElementById("cpf-envolvido").value,
        },
        suspeitos: {
          nome: document.getElementById("nome-suspeito").value,
          cpf: document.getElementById("cpf-suspeito").value,
          nascimento: document.getElementById("nascimento-suspeito").value,
          endereco: document.getElementById("endereco-suspeito").value,
          foto:
            document.getElementById("foto-suspeito").files[0]?.name ||
            "Não informado",
        },
        itens: {
          item: document.getElementById("item-furtado").value,
          valor: document.getElementById("valor-item").value,
        },
        dvr: document.getElementById("dvr-selecionado").value,
        canal: document.getElementById("canal-selecionado").value,
        dataDVR: document.getElementById("data-dvr").value,
        horaDVR: document.getElementById("hora-dvr").value,
        responsavel: {
          nome: document.getElementById("nome-responsavel").value,
          rg: document.getElementById("rg-responsavel").value,
        },
      };

      console.log("Relatório Gerado:", { dadosEmpresa, ocorrencia });
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
  }

  function exportPDF() {
    try {
      // Função para exportar o relatório em PDF
      function exportarPDF() {
        // Criando um novo documento PDF
        const doc = new "jsPDF"();

        // Adicionando conteúdo ao PDF
        doc.text("Relatório de Vendas", 10, 10);
        doc.text("------------------------------------------", 10, 20);
        doc.text("Data: 08/10/2024", 10, 30);
        doc.text("------------------------------------------", 10, 40);
        doc.text("Total de Vendas: R$ 1000,00", 10, 50);

        // Salvando o PDF com um nome específico
        doc.save("relatorio.pdf");
      }
    } catch (error) {
      console.error("Erro ao exportar:", error);
    }
  }
}

export default App;
