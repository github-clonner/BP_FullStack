// @flow

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { toastr } from 'react-redux-toastr'
import Modal from 'react-modal'

const title = 'Features'

const customStyles = {
  content : {
    top                   : '25%',
    left                  : '50%',
    right                 : 'auto',
    width                 : '400px',
    color                 : 'black',
    background            : 'white',
    bottom                : 'auto',
    marginRight           : '-50%',
    'text-align'          : 'center',
    padding               : '15px 5px',
    transform             : 'translate(-50%, -50%)',
  }
}

class Features extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div id="features" className="container">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Features' },
            { property: 'og:title', content: title },
          ]}
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header text-center">Demonstration</div>
          </div>
          <br />
          <div className="col-sm-3 col-xs-12">
            <div className="features-box">
              <div className="page-header">Toastr</div>
              <button
                className="btn btn-success"
                  onClick={() => toastr.success('Hola', 'Здравствуйте')}
                type="button">React-Redux-Toastr
              </button>
            </div>
          </div>
          <div className="col-sm-3 col-xs-12">
            <div className="features-box">
              <div className="page-header">Modal</div>
                <div>
                  <button className="btn btn-success" onClick={this.openModal}>React-Modal</button>
                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                  >
                    <h1>Hallå</h1>
                    <p> Hi there</p>
                    <button className="btn btn-secondary"onClick={this.closeModal}>Close Modal</button>
                  </Modal>
                </div>
            </div>
          </div>
          <div className="col-sm-3 col-xs-12">
            <div className="features-box">
              <div className="page-header">Next</div>
              <button
                className="btn btn-info"
                  onClick={() => toastr.info('Χαίρετε', '안녕하세요')}
                type="button">Info
              </button>
            </div>
          </div>
          <div className="col-sm-3 col-xs-12">
            <div className="features-box">
              <div className="page-header">Next</div>
              <button
                className="btn btn-danger"
                  onClick={() => toastr.error('Сайн уу', 'สวัสดี')}
                type="button">Warning
              </button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default Features
