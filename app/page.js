'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useState, useEffect } from "react";
import { newPost } from './logic.js';
import GetList from "./components/postList";

export default function Home() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleNewPost = () => {
    if (title && url) {
      newPost(title, url).then(() => {
        setTitle('');
        setUrl('');
        handleClose();
      });
    } else {
      alert("Please fill in both fields.");
    }
  };
  

  useEffect(() => {
    setTitle('');
    setUrl('');
  }, []);

  return (
    <main>
      <div className="container">
        <h1 className="red-h1">REDDIT CLONE</h1>
        <Button variant="light" onClick={handleShow}>
          New Post
        </Button>
        </div>

        <GetList />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => { e.preventDefault(); handleNewPost(); }}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  placeholder='Give your post a Title...'
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>URL</Form.Label>
                <Form.Control 
                  type="text" 
                  value={url} 
                  placeholder='Link a page...'
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="dark" onClick={handleNewPost}>
              Create Post
            </Button>
          </Modal.Footer>
        </Modal>

      
    </main>
  );
}
