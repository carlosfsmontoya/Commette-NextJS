import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Confirm Delete
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this product?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={onConfirm}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;