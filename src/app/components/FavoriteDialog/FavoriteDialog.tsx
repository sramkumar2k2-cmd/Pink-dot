'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './FavoriteDialog.module.css';

type FavoriteDialogProps = {
  productName: string;
  isOpen: boolean;
  onSave: (customName: string | null, folder: string | null) => void;
  onSkip: () => void;
  onClose: () => void;
};

// Global state to track if any dialog is open
let globalDialogOpen = false;
const dialogInstances = new Set<() => void>();

function registerDialog(closeFn: () => void) {
  dialogInstances.add(closeFn);
  return () => {
    dialogInstances.delete(closeFn);
  };
}

function closeAllOtherDialogs(currentCloseFn: () => void) {
  dialogInstances.forEach((closeFn) => {
    if (closeFn !== currentCloseFn) {
      closeFn();
    }
  });
}

export function FavoriteDialog({ productName, isOpen, onSave, onSkip, onClose }: FavoriteDialogProps) {
  const [customName, setCustomName] = useState('');
  const [folder, setFolder] = useState('');
  const [showFolderInput, setShowFolderInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Register this dialog instance
      const unregister = registerDialog(onClose);
      
      // Close all other dialogs
      closeAllOtherDialogs(onClose);
      
      // Update global state
      globalDialogOpen = true;
      
      return () => {
        unregister();
        if (dialogInstances.size === 0) {
          globalDialogOpen = false;
        }
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && globalDialogOpen) {
        // Close the most recently opened dialog
        const dialogs = Array.from(dialogInstances);
        if (dialogs.length > 0) {
          dialogs[dialogs.length - 1]();
        }
      }
    };

    if (isOpen) {
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      // Restore body scroll when no dialogs are open
      if (dialogInstances.size === 0) {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (dialogInstances.size === 0) {
        document.body.style.overflow = '';
      }
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  const dialogContent = (
    <div 
      className={styles.overlay} 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.dialog} ref={dialogRef} onClick={(e) => e.stopPropagation()}>
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

  // Use portal to render at document body level to ensure proper z-index stacking
  if (typeof window !== 'undefined') {
    return createPortal(dialogContent, document.body);
  }
  
  return null;
}

