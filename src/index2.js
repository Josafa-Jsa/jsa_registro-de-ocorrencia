let relatorioGerado = "false";

// Função para abrir o modal de adicionar item
function openModalItem() {
  document.getElementById("modal-item").style.display = "block";
}

// Função para fechar o modal de adicionar item
function fecharModalItem() {
  document.getElementById("modal-item").style.display = "none";
}

// Função para salvar item
function salvarItem() {
  try {
    const item = document.getElementById("item").value;
    const valor = document.getElementById("valor").value;

    if (!item || !valor) {
      alert("Preencha todos os campos.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = `${item} - R$ ${valor}`;
    document.getElementById("itens").appendChild(li);
    document.getElementById("item").value = "";
    document.getElementById("valor").value = "";
    fecharModalItem();
  } catch (error) {
    console.error("Erro ao salvar o item:", error);
  }
}

// Função para abrir o modal de adicionar dados do suspeito
function openModalSuspeito() {
  document.getElementById("modal-suspeito").style.display = "block";
}

// Função para fechar o modal de adicionar dados do suspeito
function fecharModalSuspeito() {
  document.getElementById("modal-suspeito").style.display = "none";
}

// Função para carregar foto do suspeito
function carregarFoto() {
  try {
    const input = document.getElementById("foto-suspeito");
    const preview = document.getElementById("foto-preview-modal");

    const file = input.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  } catch (error) {
    console.error("Erro ao carregar foto:", error);
  }
}

// Função para salvar dados do suspeito
function salvarSuspeito() {
  try {
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const endereco = document.getElementById("endereco").value;
    const foto = document.getElementById("foto-suspeito").files[0];

    if (!nome || !cpf || !endereco) {
      alert("Preencha todos os campos.");
      return;
    }

    const suspeito = {
      nome,
      cpf,
      endereco,
      foto: foto ? URL.createObjectURL(foto) : null,
    };

    sessionStorage.setItem("suspeito", JSON.stringify(suspeito));
    fecharModalSuspeito();
  } catch (error) {
    console.error("Erro ao salvar suspeito:", error);
  }
}

// Função para exportar o relatório em PDF
function exportPDF() {
  try {
    const doc = new "jsPDF"();

    // Obter os dados principais do relatório
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const vigilante = document.getElementById("vigilante").value;
    const itens = Array.from(document.querySelectorAll("#itens li"))
      .map((li) => li.textContent)
      .join("\n");
    const suspeito = JSON.parse(sessionStorage.getItem("suspeito"));

    // Texto principal do relatório
    const relatorioContent = `
      Data: ${data}
      Hora: ${hora}
      Vigilante Responsável: ${vigilante}
      Itens e Valores:
      ${itens}
    `;
    doc.text(relatorioContent, 10, 10);

    // Adiciona os dados do suspeito ao relatório (se houver)
    if (suspeito) {
      const suspeitoContent = `
        Dados do Suspeito:
        Nome: ${suspeito.nome}
        CPF: ${suspeito.cpf}
        Endereço: ${suspeito.endereco}
      `;
      doc.text(suspeitoContent, 10, 50);

      // Se houver uma foto do suspeito, adiciona-a ao PDF
      if (suspeito.foto) {
        const img = new Image();
        img.src = suspeito.foto;
        img.onload = function () {
          doc.addImage(img, "JPEG", 10, 90, 100, 100);
          doc.save("relatorio.pdf");
        };
      } else {
        doc.save("relatorio.pdf");
      }
    } else {
      doc.save("relatorio.pdf");
    }
  } catch (error) {
    console.error("Erro ao exportar para PDF:", error);
  }
}
