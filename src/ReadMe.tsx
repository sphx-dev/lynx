import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { BiSupport } from "react-icons/bi"

function ReadMe() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ marginLeft: "1rem" }}
      >
        Help
        <BiSupport style={{ marginLeft: "0.5rem" }} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to the Sphinx Demo</Modal.Title>
        </Modal.Header>
        <Modal.Body>The Sphinx demo is designed to.....</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ReadMe
