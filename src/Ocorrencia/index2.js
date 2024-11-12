import React, { useState } from "react";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";

function App() {
  const [dvr, setDvr] = useState("");
  const [canal, setCanal] = useState("");
  const [textarea, setTextarea] = useState("");
  const [openModal, setOpenModal] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [itensFurtados, setItensFurtados] = useState([]);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [descricaoItem, setDescricaoItem] = useState("");
  const [valorItem, setValorItem] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setFotoPreview(URL.createObjectURL(file)); // Pré-visualizar a foto
  };

  const gerarRelatorio = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Relatório");

    // Dados do relatório
    worksheet.addRow([
      "Data do Ocorrido",
      document.getElementById("data").value,
    ]);
    worksheet.addRow([
      "Hora do Ocorrido",
      document.getElementById("hora").value,
    ]);
    worksheet.addRow(["Descrição do Ocorrido", textarea]);
    worksheet.addRow(["DVR", dvr]);
    worksheet.addRow(["Canal", canal]);
    worksheet.addRow(["Nome do Suspeito", nome]);
    worksheet.addRow(["CPF", cpf]);
    worksheet.addRow(["Endereço", endereco]);
    worksheet.addRow(["Itens Furtados", ""]);

    // Itens furtados
    itensFurtados.forEach((item, index) => {
      worksheet.addRow([
        `Item ${index + 1}`,
        `Descrição: ${item.descricao}, Valor: R$${item.valor}`,
      ]);
    });

    // Adicionar imagem ao Excel, se houver uma foto selecionada
    if (foto) {
      const imageId = workbook.addImage({
        base64: await convertToBase64(foto),
        extension: foto.type.split("/")[1],
      });

      worksheet.addImage(imageId, "B12:D16"); // Ajuste a posição conforme necessário
    }

    // Gerar o arquivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Relatorio_Ocorrencia.xlsx";
      link.click();
    });
  };

  // Função auxiliar para converter uma imagem para base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Registro de Ocorrências</h1>

      <div className="input-group">
        <label htmlFor="data">Data do ocorrido:</label>
        <input type="date" id="data" name="data" required />
        <label htmlFor="hora">Hora do ocorrido:</label>
        <input type="time" id="hora" name="hora" />
      </div>

      <div className="section">
        <button onClick={() => setOpenModal("suspeitos")}>
          Adicionar Suspeitos
        </button>
        <button onClick={() => setOpenModal("itensFurtados")}>
          Adicionar Itens Furtados
        </button>
        <button onClick={() => setOpenModal("dvrCanal")}>
          Selecionar Dvr e Canal
        </button>
        <button onClick={() => setOpenModal("responsaveis")}>
          Adicionar Responsáveis pela Condução
        </button>
      </div>
      <h4>Dvr : {dvr}</h4>
      <h5>Canal : {canal}</h5>

      <div className="section">
        <h2>Descrição do Ocorrido</h2>
        <textarea
          id="descricao-ocorrido"
          rows="5"
          placeholder="Descreva o ocorrido..."
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
        ></textarea>
      </div>
      <div className="section">
        <button onClick={gerarRelatorio}>Gerar Relatório</button>
      </div>

      <footer className="dark menu-aside-close">
        <strong>Desenvolvido por Josafá Santos. </strong>
      </footer>

      {openModal === "suspeitos" && (
        <Modal
          visible={true}
          title="Adicionar Suspeitos"
          onEvent={({ event }) => (event === "close" ? setOpenModal("") : null)}
        >
          <h2>Identificar Suspeito</h2>

          <div className="section">
            <h3>Nome completo</h3>
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="section">
            <h3>CPF</h3>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="section">
            <h3>Endereço</h3>
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          <div className="section">
            <h3>Foto do Suspeito</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {fotoPreview && (
              <img
                src={fotoPreview}
                alt="Prévia da Foto"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </div>

          <div className="section">
            <button onClick={() => setOpenModal("")}>Salvar</button>
          </div>
        </Modal>
      )}

      {openModal === "itensFurtados" && (
        <Modal
          visible={true}
          title="Adicionar Itens Furtados"
          onEvent={({ event }) => (event === "close" ? setOpenModal("") : null)}
        >
          <div>
            <h2>Itens Furtados</h2>
            <textarea
              id="itens-furtados"
              rows="3"
              placeholder="Descreva os itens furtados..."
            ></textarea>
          </div>

          <div className="section">
            <h3>Valor Total dos Itens</h3>
            <input
              type="valor"
              placeholder="Valor"
              value={valorItem}
              onChange={(e) => setValorItem(e.target.value)}
            />
          </div>

          <div className="section">
            <h3>Foto dos Itens</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {fotoPreview && (
              <img
                src={fotoPreview}
                alt="Prévia da Foto"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </div>

          <div className="section">
            <button onClick={() => setOpenModal("")}>Salvar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
