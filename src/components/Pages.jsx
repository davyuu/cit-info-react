import React from 'react'
import Modal from 'react-modal'
import HeaderBar from '../components/HeaderBar'
import Section from '../components/Section'
import './Pages.scss'

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currentPage: null,
      modalIsOpen: false
    };
  }

  componentWillMount() {
    let dataURL = 'https://mycit.info/wp-json/wp/v2/pages';
    fetch(dataURL)
    .then(res => res.json())
    .then(res => {
      const pages = res
        .sort((a, b) => a.menu_order - b.menu_order)
        .map(val => ({
          id: val.id,
          title: val.acf.title,
          active: val.acf.active || true,
          icon: val.acf.icon,
          color: val.acf.color,
          headerImage: val.acf.header_image,
          content: val.acf.content,
        }))
      this.setState({ pages })
    })
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(page) {
    this.setState({
      currentPage: page,
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      currentPage: null,
      modalIsOpen: false
    });
  }

  renderPages() {
    const { pages } = this.state;

    return pages.map(page =>
      page.active && <Section
        className="section"
        key={page.id}
        title={page.title}
        imageUrl={page.icon}
        onClick={() => this.openModal(page)}
      />
    )
  }

  renderModal() {
    const { currentPage, modalIsOpen } = this.state;

    return (
      currentPage &&  <Modal
        className='page-modal'
        overlayClassName='page-modal-overlay'
        closeTimeoutMS={500}
        show={modalIsOpen}
        isOpen={modalIsOpen}
        onRequestClose={this.closeModal}
      >
        <div className="page-modal-content">
          <HeaderBar
            goBack={this.closeModal}
            title={currentPage.title}
            color={currentPage.color}
          />
          <div className='page-content' dangerouslySetInnerHTML={{__html: currentPage.content}} />
        </div>
      </Modal>
    )
  }

  render() {
    return (
      <div className='pages'>
        {this.renderPages()}
        {this.renderModal()}
      </div>
    )
  }
};

export default Pages
