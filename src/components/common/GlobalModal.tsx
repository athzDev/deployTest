import CloseIcon from "../images/close.png";
import styled from "styled-components";


interface GlobalModalProps {
  children: any;
  isModalOpen: boolean;
}
function GlobalModal(props) {
  const { children, isModalOpen } = props;
  const showHideClassName = isModalOpen
    ? "modal display-block"
    : "modal display-none";
  return (
    <Popup>
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          {/* <button className="close" type="button" onClick={() => props.closeModal(false)}></button> */}
        </section>
      </div>
    </Popup>
  );
}

export default GlobalModal;

const Popup = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 74%);
  }

  .modal-main {
    width: 100%;
    height:95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .display-block {
    display: block;
    z-index: 999;
  }

  .display-none {
    display: none;
  }

  .close {
    width: 45px;
    height: 45px;
    background-image: url(${CloseIcon});
    background-size: cover;
    background-repeat: no-repeat;
    background-color: transparent;
    cursor: pointer;
    border: none;
    display: inline-block;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 5%;
    top: 0;
    background-color: black;
    border-radius: 6px;
  }
`;
