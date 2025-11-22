'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllFeedbacks, type ProductFeedback } from '@/app/lib/productFeedbackUtils';
import styles from './ScrollingFeedback.module.css';

export function ScrollingFeedback() {
  const [feedbacks, setFeedbacks] = useState<ProductFeedback[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadFeedbacks = () => {
      const allFeedbacks = getAllFeedbacks();
      setFeedbacks(allFeedbacks);
    };

    loadFeedbacks();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const diff = e.clientX - startX;
    setDragOffset(diff);
    // Get current computed transform
    const computedStyle = window.getComputedStyle(scrollContainerRef.current);
    const matrix = computedStyle.transform;
    let currentX = 0;
    if (matrix && matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      currentX = parseFloat(values[4]) || 0;
    }
    scrollContainerRef.current.style.transform = `translateX(${currentX + diff}px)`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset(0);
    // Reset to let CSS animation take over
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.transform = '';
    }
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const diff = e.touches[0].clientX - startX;
    setDragOffset(diff);
    const computedStyle = window.getComputedStyle(scrollContainerRef.current);
    const matrix = computedStyle.transform;
    let currentX = 0;
    if (matrix && matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      currentX = parseFloat(values[4]) || 0;
    }
    scrollContainerRef.current.style.transform = `translateX(${currentX + diff}px)`;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragOffset(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.transform = '';
    }
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!scrollContainerRef.current) return;
    setIsPaused(true);
    const container = scrollContainerRef.current;
    const computedStyle = window.getComputedStyle(container);
    const matrix = computedStyle.transform;
    let currentX = 0;
    if (matrix && matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      currentX = parseFloat(values[4]) || 0;
    }
    // Scroll by approximately one feedback item width (including gap)
    const scrollAmount = 600; // Approximate width of one feedback item
    container.style.transition = 'transform 0.5s ease';
    container.style.transform = `translateX(${currentX - scrollAmount}px)`;
    setTimeout(() => {
      container.style.transition = '';
      container.style.transform = '';
      setIsPaused(false);
    }, 3000);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!scrollContainerRef.current) return;
    setIsPaused(true);
    const container = scrollContainerRef.current;
    const computedStyle = window.getComputedStyle(container);
    const matrix = computedStyle.transform;
    let currentX = 0;
    if (matrix && matrix !== 'none') {
      const values = matrix.split('(')[1].split(')')[0].split(',');
      currentX = parseFloat(values[4]) || 0;
    }
    // Scroll by approximately one feedback item width (including gap)
    const scrollAmount = 600; // Approximate width of one feedback item
    container.style.transition = 'transform 0.5s ease';
    container.style.transform = `translateX(${currentX + scrollAmount}px)`;
    setTimeout(() => {
      container.style.transition = '';
      container.style.transform = '';
      setIsPaused(false);
    }, 3000);
  };

  if (feedbacks.length === 0) {
    return null;
  }

  // Duplicate feedbacks for seamless infinite loop
  const duplicatedFeedbacks = [...feedbacks, ...feedbacks, ...feedbacks];

  return (
    <div 
      className={styles.scrollingFeedback}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (!isDragging) {
          setIsPaused(false);
        }
      }}
    >
      <div className={styles.scrollWrapper}>
        {feedbacks.length > 1 && (
          <button
            type="button"
            className={styles.navButton}
            onClick={handlePrev}
            aria-label="Previous feedback"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className={`${styles.scrollContainer} ${isPaused ? styles.paused : ''} ${isDragging ? styles.dragging : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {duplicatedFeedbacks.map((feedback, index) => (
            <Link
              key={`${feedback.id}-${index}`}
              href={`/shop/product/${feedback.productSlug}`}
              className={styles.feedbackItem}
              onClick={(e) => {
                if (isDragging && Math.abs(dragOffset) > 10) {
                  e.preventDefault();
                }
              }}
            >
              <div className={styles.productIcon}>
                {feedback.productImage ? (
                  <Image
                    src={feedback.productImage}
                    alt={feedback.productName}
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                ) : (
                  <div className={styles.productIconPlaceholder}>
                    {feedback.productName.charAt(0)}
                  </div>
                )}
              </div>
              <div className={styles.feedbackContent}>
                <div className={styles.feedbackText}>
                  <span className={styles.customerName}>{feedback.customerName}</span>
                  {' '}says: "{feedback.text}"
                </div>
                <div className={styles.feedbackMeta}>
                  <span className={styles.productName}>{feedback.productName}</span>
                  <span className={styles.rating}>
                    {'⭐'.repeat(feedback.rating)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {feedbacks.length > 1 && (
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={handleNext}
            aria-label="Next feedback"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

