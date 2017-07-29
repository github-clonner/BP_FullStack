// @flow

import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { toastr } from 'react-redux-toastr'
import Modal from 'react-modal'

const title = 'Features'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  content: {
    position: 'absolute',
    top: '30vh',
    left: '30vw',
    right: '30vw',
    bottom: '40vh',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '5px',
    fontSize: '20px',
    outline: 'none',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class Features extends Component {
  static defaultProps: Object

  constructor() {
    super()

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  state: {
    modalIsOpen: boolean
  }
  openModal: Function
  afterOpenModal: Function
  closeModal: Function

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  //eslint-disable-next-line
  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  render() {
    return (
      <div id="features" className="container">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'Features' },
            { property: 'og:title', content: title }
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
                type="button"
              >
                React-Redux-Toastr
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
                  <div>Hello!</div>
                  <button className="btn btn-primary" onClick={this.closeModal}>close</button>
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
                type="button"
              >
                Info
              </button>
            </div>
          </div>
          <div className="col-sm-3 col-xs-12">
            <div className="features-box">
              <div className="page-header">Next</div>
              <button
                className="btn btn-danger"
                onClick={() => toastr.error('Сайн уу', 'สวัสดี')}
                type="button"
              >
                Warning
              </button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Features
