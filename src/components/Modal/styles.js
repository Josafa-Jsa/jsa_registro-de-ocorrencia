import styled from "styled-components";

// Especificar o posicionamento da caixa de seleção Dvr e Canais
export const Container = styled.div`
  display: inline-flex;
  background: #000000b3;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;

  h1 {
    display: flex;
    color: #000;
  }
`;

// Especificar o tamanho das caixas modais
export const Content = styled.div`
  height: 100vh;
  width: 50%;
  position: absolute;
  background: #2a2828;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  max-height: 100%;
  max-height: 56vh;
  display: block !important;
  overflow-x: hidden;

  // Especificar posicionamento caixa de seleção Dvr e Canais
  select {
    text-align: center;
    float: center;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  background: #92c7cf;
  flex-direction: row !important;
  padding: 3px 3px;
  justify-content: space-between;
  margin-top: 0 !important;
  align-items: center;

  h1 {
    color: #fff;
    padding: 0;
    margin: 0;
  }

  // Botão para fechar Modal
  button {
    background: red;
    padding: 5px;
    margin: 0;
    margin-right: 10px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
  }
`;

export const Bodydiv = styled.div`
  margin-top: 10px;
  display: flow-root;
  background: #55679c;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin-top: 0;
  justify-content: start;
`;
