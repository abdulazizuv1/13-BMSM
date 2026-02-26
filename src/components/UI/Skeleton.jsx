import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ width, height, borderRadius = '4px', className = '' }) => {
    return (
        <motion.div
            className={`skeleton-box ${className}`}
            style={{
                width: width || '100%',
                height: height || '20px',
                borderRadius: borderRadius
            }}
            animate={{
                opacity: [0.5, 1, 0.5],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

export default Skeleton;
