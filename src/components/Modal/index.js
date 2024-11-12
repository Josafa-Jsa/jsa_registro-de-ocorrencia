import React, { useState } from "react";
import { Bodydiv, Container, Content, ModalHeader } from "./styles";

function Modal({ visible, title, onEvent, children }) {
  return visible ? (
    <Container>
      <Content>
        <ModalHeader>
          <i id="btn-move-modal" className="fa fa-arrows-alt" />
          <h1>{title}</h1>
          <button
            style={{
              maxHeight: 28,
            }}
            onClick={() => onEvent({ event: "close" })}
          >
            X
          </button>
        </ModalHeader>

        <Bodydiv
          id="body-modal"
          style={{
            maxHeight: "86vh",
            overflow: "auto",
            padding: "0 5px",
            flexDirection: "row",
          }}
        >
          {children}
        </Bodydiv>
      </Content>
    </Container>
  ) : null;
}

function Modal2({ visible, title, onEvent, children }) {
  return visible ? (
    <Container>
      <Content>
        <ModalHeader>
          <i id="btn-move-modal2" className="fa fa-arrows-alt" />
          <h1>{title}</h1>
          <button
            style={{
              maxHeight: 28,
            }}
            onClick={() => onEvent({ event: "close" })}
          >
            X
          </button>
        </ModalHeader>

        <Bodydiv
          id="body-modal2"
          style={{
            maxHeight: "86vh",
            overflow: "auto",
            padding: "0 5px",
            flexDirection: "row",
          }}
        >
          {children}
        </Bodydiv>
      </Content>
    </Container>
  ) : null;
}

export default Modal;
