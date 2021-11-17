/* eslint-disable indent */
import { useEffect, useState } from 'react';
import reactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Overlay, Container, DownloadOptions, File, FileSelector,
} from './styles';

import close from '../../assets/images/icons/close.svg';
import downoloadIcon from '../../assets/images/icons/download.svg';
import docIcon from '../../assets/images/icons/document.svg';

function DownloadModal({ handleClose }) {

  const [portugueseOption, setPortugueseOption] = useState(false);
  const [englishOption, setEnglishOption] = useState(false);

  function handleClick(e) {

    const { target } = e;

    if (target.classList.contains('pt-br')) { setPortugueseOption(!portugueseOption); }
    if (target.classList.contains('en-us')) { setEnglishOption(!englishOption); }

    if (target.classList.contains('click-to-exit')) { handleClose(); }
  }

  const
    [
      enDocx,
      enPdf,
      ptDocx,
      ptPdf,
    ] = [

        '/resume/English-US.docx',
        '/resume/English-US.pdf',
        '/resume/Portugues-BR.docx',
        '/resume/Portugues-BR.pdf',
      ];
  const clickToExit = 'Click to exit';

  useEffect(() => {

    document.addEventListener('click', handleClick);

    return () => {

      document.removeEventListener('click', handleClick);
    };
  });

  return reactDOM.createPortal(
    <Overlay
      className="no-selec click-to-exit"
      title={clickToExit}
    >

      <Container>

        <button
          onClick={handleClose}
          type="button"
          className="close-button"
        >
          <img src={close} alt="close" />
        </button>

        <DownloadOptions>

          <File>

            <header className="file-header">
              <img src={docIcon} alt="document" />
              <span>English-US</span>
            </header>

            <button
              type="button"
              className="download-button en-us"
            >
              <img src={downoloadIcon} alt="download" />
            </button>

            {englishOption && (
              <FileSelector>
                <Link
                  to={enDocx}
                  className="option-link en-us"
                  target="_blank"
                  download="stwGabriel_English-US.docx"
                >
                  .docx
                </Link>
                <div className="divider" />
                <Link
                  to={enPdf}
                  className="option-link en-us"
                  target="_blank"
                  download="stwGabriel_English-US.pdf"
                >
                  .pdf
                </Link>
              </FileSelector>
            )}
          </File>
          <File>

            <header className="file-header">
              <img src={docIcon} alt="document" />
              <span>Português-BR</span>
            </header>

            <button
              type="button"
              className="download-button pt-br"
            >
              <img src={downoloadIcon} alt="download" />
            </button>

            {portugueseOption && (
              <FileSelector>
                <Link
                  to={ptDocx}
                  className="option-link pt-br"
                  target="_blank"
                  download="stwGabriel_Portugues-BR.docx"
                >
                  .docx
                </Link>
                <div className="divider" />
                <Link
                  to={ptPdf}
                  className="option-link pt-br"
                  target="_blank"
                  download="stwGabriel_Portugues-BR.pdf"
                >
                  .pdf
                </Link>
              </FileSelector>
            )}

          </File>
        </DownloadOptions>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

DownloadModal.propTypes = {

  handleClose: PropTypes.func.isRequired,
};

export default DownloadModal;
