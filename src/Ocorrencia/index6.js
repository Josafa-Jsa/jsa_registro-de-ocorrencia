import React, { useState } from "react";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";
// import { useTheme } from "styled-components";
// import e from "express";

function App() {
  const [dvr, setDvr] = useState("");
  const [canal, setCanal] = useState("");
  const [camera, setCamera] = useState("");
  const [textarea, setTextarea] = useState("");
  const [openModal, setOpenModal] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [fotoSuspeito, setFotoSuspeito] = useState(null);
  const [fotoItens, setFotoItens] = useState(null);
  const [fotoPreviewItens, setFotoPreviewItens] = useState(null);
  const [fotoPreviewSuspeito, setFotoPreviewSuspeito] = useState(null);
  const [itensFurtados, setItensFurtados] = useState(null);
  const [valorTotalItens, setValorTotalItens] = useState("");
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [descricaoItem, setDescricaoItem] = useState("");
  const [valorItem, setValorItem] = useState("");
  const [responsaveis, setResponsaveis] = useState("");

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    setFotoSuspeito(file);
    setFotoPreviewSuspeito(URL.createObjectURL(file));
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setFotoItens(file);
    setFotoPreviewItens(URL.createObjectURL(file));
  };

  const handleSave = () => {
    setOpenModal("");
    setSuccessMessage("Dados coletados com Sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);

    toast.success("Salvo");
  };

  const handleSave2 = () => {
    setOpenModal("");
    setSuccessMessage("Dados coletados com Sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);

    toast.success("Relatório Salvo");
  };

  const handleSave3 = () => {
    setOpenModal("");
    setSuccessMessage("Dados coletados com Sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);

    toast.success("Itens Salvos");
  };

  const handleSave4 = () => {
    setOpenModal("");
    setSuccessMessage("Dados coletados com Sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);

    toast.success("Dvr e Canal Salvo");
  };

  const handleSave5 = () => {
    setOpenModal("");
    // setSuccessMessage("Dados coletados com Sucesso!");
    // setTimeout(() => setSuccessMessage(""), 3000);

    toast.success("Relatório Gerado");
  };

  const handleSave6 = () => {
    setOpenModal("");
    setSuccessMessage("Dados coletados com Sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);

    toast.success("Suspeito Salvo");
  };

  const handleSave7 = () => {
    setOpenModal("");
    setSuccessMessage("Dados coletados com Sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);

    toast.success("Responsável Salvo");
  };

  // const handleSave = () => {
  //   setOpenModal("");
  //   setSuccessMessage("Dados coletados com sucesso!");
  //   setTimeout(() => setSuccessMessage(""), 3000);

  //   toast.success("Salvo!");
  // };

  const gerarRelatorio = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Relatório");
    toast.success("Relatório Gerado");

    // RELATÓRIO
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
    worksheet.addRow(["Itens Furtados", itensFurtados]);
    worksheet.addRow(["Valor dos Itens", valorTotalItens]);
    worksheet.addRow(["Responsveis", responsaveis]);
    worksheet.addRow(["Foto Suspeito", fotoPreviewSuspeito]);
    worksheet.addRow(["Foto Itens", fotoPreviewItens]);

    // ITENS FURTADOS
    itensFurtados.forEach((item, index) => {
      worksheet.addRow([
        `Item ${index + 1}`,
        `Descrição: ${itensFurtados.descricao}, Valor: R$${valorTotalItens.valor}`,
      ]);
    });

    // VALOR TOTAL DOS ITENS
    worksheet.addRow(["Itens Furtados", `R$${itensFurtados}`]);

    worksheet.addRow([
      "Valor Total dos Itens Furtados",
      `R$${valorTotalItens}`,
    ]);
    // ADICIONAR FOTO DO SUPEITO
    if (fotoSuspeito) {
      const imageId = workbook.addImage({
        base64: await convertToBase64(fotoSuspeito),
        extension: fotoSuspeito.type.split("/")[0],
      });

      worksheet.addImage(imageId, "B15:D24"); // Ajuste a posição conforme necessário
    }

    // ADICIONAR FOTO DOS ITENS FURTADOS
    if (fotoItens) {
      const imageId = workbook.addImage({
        base64: await convertToBase64(fotoItens),
        extension: fotoItens.type.split("/")[0],
      });

      worksheet.addImage(imageId, "G15:E24"); // Ajuste a posição conforme necessário
    }

    // GERAR EXCEL
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
        <label htmlFor="data">Data e hora do ocorrido:</label>
        <input type="date" id="data" name="data" required />
        {/* <label htmlFor="hora">Hora do ocorrido:</label> */}
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
      <h4>
        Dvr: {dvr} Canal: {canal}
      </h4>

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
        <button onClick={handleSave2}>Salvar Relatório</button>
        <button onClick={gerarRelatorio}>Gerar Relatório</button>
      </div>

      <footer className="dark menu-aside-close">
        <strong>Desenvolvido por JSA-TECH. </strong>
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
              type="number"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="section">
            <h3>Endereço</h3>
            <textarea
              type="text"
              rows="5"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          <div className="section">
            <h3>Foto do Suspeito</h3>
            <input type="file" accept="image/*" onChange={handleFileChange1} />
            {fotoPreviewSuspeito && (
              <img
                src={fotoPreviewSuspeito}
                alt="Prévia da Foto"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </div>

          <div className="section">
            <button onClick={handleSave6}>Salvar</button>
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

          <div>
            <h3>Valor total dos Itens</h3>
            <input
              type="number"
              placeholder="Valor total"
              value={valorTotalItens}
              onChange={(e) => setValorTotalItens(e.target.value)}
            />
          </div>

          <div className="section">
            <h3>Foto dos Itens</h3>
            <input type="file" accept="image/*" onChange={handleFileChange2} />
            {fotoPreviewItens && (
              <img
                src={fotoPreviewItens}
                alt="Prévia da Foto"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
          </div>

          <div className="section">
            <button onClick={handleSave3}>Salvar</button>
          </div>
        </Modal>
      )}

      {openModal === "dvrCanal" && (
        <Modal
          visible={true}
          title="Selecionar Dvr e Canal"
          onEvent={({ event }) => (event === "close" ? setOpenModal("") : null)}
        >
          <h3>Selecionar DVR</h3>
          <Select
            name="DVR"
            onChange={(e) => setDvr(e)}
            itens={[
              { value: "201", label: "Dvr 201" },
              { value: "202", label: "Dvr 202" },
              { value: "203", label: "Dvr203" },
              { value: "204", label: "Dvr 204" },
              { value: "205", label: "Dvr 205" },
              { value: "206", label: "Dvr 206" },
              { value: "207", label: "Dvr 207" },
              { value: "208", label: "Dvr 208" },
              { value: "SpeedDome", label: "SpeedDome" },
            ]}
          />
          <h4>Selecionar Canal</h4>
          <Select
            name="CANAL"
            onChange={(e) => setCanal(e)}
            itens={[
              { value: "1", label: "Canal 1" },
              { value: "2", label: "Canal 2" },
              { value: "3", label: "Canal 3" },
              { value: "4", label: "Canal 4" },
              { value: "5", label: "Canal 5" },
              { value: "6", label: "Canal 6" },
              { value: "7", label: "Canal 7" },
              { value: "8", label: "Canal 8" },
              { value: "9", label: "Canal 9" },
              { value: "10", label: "Canal 10" },
              { value: "11", label: "Canal 11" },
              { value: "12", label: "Canal 12" },
              { value: "13", label: "Canal 13" },
              { value: "14", label: "Canal 14" },
              { value: "15", label: "Canal 15" },
              { value: "16", label: "Canal 16" },
              { value: "SpeedDome", label: "SpeedDome" },
            ]}
          />

          <div className="section">
            <button onClick={handleSave4}>Salvar</button>
          </div>
        </Modal>
      )}

      {openModal === "responsaveis" && (
        <Modal
          visible={true}
          title="Selecionar Responsável"
          onEvent={({ event }) => (event === "close" ? setOpenModal("") : null)}
        >
          <h3>Selecionar Responsável</h3>
          <Select
            name="responsaveis"
            onChange={(e) => setResponsaveis(e)}
            itens={[
              { value: "Vigilante 1", label: "Vigilante 1" },
              { value: "Vigilante 2", label: "Vigilante 2" },
              { value: "Vigilante 3", label: "Vigilante 3" },
              { value: "Vigilante 4", label: "Vigilante 4" },
            ]}
          />
          <button onClick={handleSave7}>Salvar</button>
          {/* <div className="section">
            <button onClick={handleSave7}>Salvar</button>
          </div> */}
        </Modal>
      )}
    </div>
  );
}

export default App;
