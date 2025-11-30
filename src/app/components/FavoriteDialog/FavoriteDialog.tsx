'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './FavoriteDialog.module.css';

type FavoriteDialogProps = {
  productName: string;
  isOpen: boolean;
  onSave: (customName: string | null, folder: string | null) => void;
  onSkip: () => void;
  onClose: () => void;
};

export function FavoriteDialog({ productName, isOpen, onSave, onSkip, onClose }: FavoriteDialogProps) {
  const [customName, setCustomName] = useState('');
  const [folder, setFolder] = useState('');
  const [showFolderInput, setShowFolderInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    const nameToSave = customName.trim() || null;
    const folderToSave = folder.trim() || null;
    onSave(nameToSave, folderToSave);
    setCustomName('');
    setFolder('');
    setShowFolderInput(false);
  };

  const handleSkip = () => {
    onSkip();
    setCustomName('');
    setFolder('');
    setShowFolderInput(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog} ref={dialogRef}>
        <div className={styles.header}>
          <h3 className={styles.title}>Save to Favorites</h3>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.productName}>
            <span>Product:</span>
            <strong>{productName}</strong>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="customName" className={styles.label}>
              Custom Name (Optional)
            </label>
            <input
              ref={inputRef}
              id="customName"
              type="text"
              className={styles.input}
              placeholder={`Default: ${productName}`}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !showFolderInput) {
                  handleSave();
                }
              }}
            />
          </div>

          <div className={styles.folderToggle}>
            <button
              type="button"
              className={styles.folderToggleButton}
              onClick={() => setShowFolderInput(!showFolderInput)}
            >
              {showFolderInput ? '▼' : '▶'} Save to Folder (Optional)
            </button>
          </div>

          {showFolderInput && (
            <div className={styles.formGroup}>
              <label htmlFor="folder" className={styles.label}>
                Folder Name
              </label>
              <input
                id="folder"
                type="text"
                className={styles.input}
                placeholder="e.g., Wedding, Birthday, Wishlist"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  }
                }}
              />
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className={styles.skipButton}
            onClick={handleSkip}
          >
            Skip (Use Default)
          </button>
        </div>
      </div>
    </div>
  );
}

