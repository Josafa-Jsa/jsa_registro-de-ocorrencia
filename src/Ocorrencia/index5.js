import React, { useState } from "react";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { toast } from "react-toastify";

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
  const [itensFurtados, setItensFurtados] = useState([]);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);
  const [descricaoItem, setDescricaoItem] = useState("");
  const [valorItem, setValorItem] = useState("");

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSave = () => {
    setOpenModal("");
    setSuccessMessage("Dados coletados com sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);
    toast.success("Salvo");
  };

  const gerarRelatorio = () => {
    const relatorio = `
      Data: ${document.getElementById("data").value}
      Hora: ${document.getElementById("hora").value}
      Descrição do Ocorrido: ${textarea}
      DVR : ${dvr}
      Canal : ${canal}
      Itens Furtados:
      - Itens: ${itensFurtados}
      - Descrição: ${descricaoItem}
      - Valor: ${valorItem}
      Suspeito:
      - Nome: ${nome}
      - CPF: ${cpf}
      - Endereço: ${endereco}
      - Foto: ${foto ? foto.name : "Nenhuma foto selecionada"}

    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${relatorio}</pre>`);
    newWindow.document.close();
  };

  const handleSaveItemFurtado = () => {
    setItensFurtados([
      ...itensFurtados,
      { descricao: descricaoItem, valor: valorItem },
    ]);
    setDescricaoItem("");
    setValorItem("");
    setOpenModal("");
  };

  const handleExcluirItem = () => {
    setItensFurtados(
      itensFurtados.filter((_, index) => index !== itemParaExcluir)
    );
    setItemParaExcluir(null);
    setOpenModal("");
  };

  return (
    <div>
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
        <button onClick={handleSave}>Salvar</button>
      </div>
      <div className="section">
        <button onClick={gerarRelatorio}>Gerar Relatório</button>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <footer class="dark menu-aside-close ">
        <div class="float-right d-none d-sm-block">
          {/* <b>Version</b> 1.0 */}
        </div>
        <strong>Desenvolvido por Josafá Santos. </strong>
      </footer>

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
              { value: "201", label: "DVR 201" },
              { value: "202", label: "DVR 202" },
              { value: "203", label: "DVR 203" },
              { value: "204", label: "DVR 204" },
              { value: "205", label: "DVR 205" },
              { value: "206", label: "DVR 206" },
              { value: "207", label: "DVR 207" },
              { value: "208", label: "DVR 208" },
            ]}
          />
          <h4>Selecionar Canal</h4>
          <Select
            name="CANAL"
            onChange={(e) => setCanal(e)}
            itens={[
              { value: "1", label: "CANAL 1" },
              { value: "2", label: "CANAL 2" },
              { value: "3", label: "CANAL 3" },
              { value: "4", label: "CANAL 4" },
              { value: "5", label: "CANAL 5" },
              { value: "6", label: "CANAL 6" },
              { value: "7", label: "CANAL 7" },
              { value: "8", label: "CANAL 8" },
              { value: "9", label: "CANAL 9" },
              { value: "10", label: "CANAL 10" },
              { value: "11", label: "CANAL 11" },
              { value: "12", label: "CANAL 12" },
              { value: "13", label: "CANAL 13" },
              { value: "14", label: "CANAL 14" },
              { value: "15", label: "CANAL 15" },
              { value: "16", label: "CANAL 16" },
            ]}
          />

          <div className="section">
            <button onClick={handleSave}>Salvar</button>
          </div>
        </Modal>
      )}

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
            {foto && <p>Foto selecionada: {foto.name}</p>}
          </div>

          <div className="section">
            <button onClick={handleSave}>Salvar</button>
          </div>
        </Modal>
      )}

      <Modal
        visible={openModal === "itensFurtados"}
        title="Adicionar Itens Furtados"
        onEvent={({ event }) => (event === "close" ? setOpenModal("") : null)}
      >
        <h2>Itens Furtados</h2>
        <textarea
          id="itens-furtados"
          rows="3"
          placeholder="Descreva os itens furtados..."
        ></textarea>
        <input
          type="number"
          placeholder="Valor do item"
          value={valorItem}
          onChange={(e) => setValorItem(e.target.value)}
        />
        <button onClick={handleSaveItemFurtado}>Salvar Item</button>
      </Modal>

      {itensFurtados.map((item, index) => (
        <li key={index}>
          Descrição: {item.descricao}, Valor: R${item.valor}
          <button
            onClick={() => {
              setItemParaExcluir(index);
              setOpenModal("confirmarExclusao");
            }}
          >
            Excluir
          </button>
        </li>
      ))}

      {openModal === "confirmarExclusao" && (
        <Modal
          visible={true}
          title="Confirmar Exclusão"
          onEvent={({ event }) => (event === "close" ? setOpenModal("") : null)}
        >
          <p>Tem certeza de que deseja excluir este item?</p>
          <button onClick={handleExcluirItem}>Confirmar</button>
          <button onClick={() => setOpenModal("")}>Cancelar</button>
        </Modal>
      )}

      {openModal === "responsaveis" && (
        <Modal
          visible={true}
          title="Adicionar Responsáveis pela Condução"
          onEvent={({ event }) => (event === "close" ? setOpenModal("") : null)}
        >
          <h2>Responsáveis pela Condução</h2>
          <textarea
            id="responsaveis"
            rows="2"
            placeholder="Descreva os responsáveis..."
          ></textarea>
          <div className="section">
            <button onClick={handleSave}>Salvar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// export default Ocorrencia;
export default App;
