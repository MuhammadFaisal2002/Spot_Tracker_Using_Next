

'use client';

import React, { useState, useEffect } from 'react';
import Form from '../chat/form/Form';
interface InputProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Input({ isOpen, onClose }: InputProps) {
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsChatVisible(true);
    }
  }, [isOpen]);

  return (
    <div className={`  h-full transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {isChatVisible && (
        <Form isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
}




