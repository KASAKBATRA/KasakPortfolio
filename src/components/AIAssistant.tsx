import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import botAnimation from '../assets/bot.json';

const AIAssistant: React.FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <div aria-hidden={false}>
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className="fixed ai-assistant-fixed z-50 ai-assistant"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="relative flex items-end">
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                className="mr-3 mb-2"
              >
                <div className="tooltip glass-tooltip px-3 py-2 rounded-lg text-sm text-white/95 backdrop-blur-sm border border-white/6 shadow-lg">
                  Hi, I’m Kasak’s AI Assistant 🤖
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            aria-label="Open AI Assistant"
            whileHover={{ scale: 1.06, boxShadow: '0 18px 48px rgba(99,102,241,0.14)' }}
            className="rounded-full p-1 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-purple-500 shadow-neon"
            style={{ width: 110, height: 110 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center border border-white/6" style={{ padding: 6 }}>
              <Lottie animationData={botAnimation} loop={true} style={{ width: '82%', height: '82%' }} />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AIAssistant;
