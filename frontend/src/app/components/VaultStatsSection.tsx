import React from 'react';
import { motion } from 'framer-motion';

export default function VaultStatsSection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-bg-card to-bg-muted">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent"
        >
          Live Vault Statistics
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary mb-2">$2,500,000</div>
            <div className="text-text-muted">TVL</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-secondary mb-2">7.8%</div>
            <div className="text-text-muted">APY</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-accent mb-2">1,247</div>
            <div className="text-text-muted">Depositors</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-success mb-2">$185,000</div>
            <div className="text-text-muted">Yield Distributed</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}