import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './Card';
import { Shield, Eye, Banknote } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section className="py-24 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-16 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent"
      >
        Security & Compliance
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="group"
        >
          <Card className="h-full hover:border-success/50 transition-all duration-300">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-to-r from-success to-success/80 rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-text">KYC Required</h3>
              <p className="text-text-muted leading-relaxed">All participants undergo thorough identity verification for regulatory compliance.</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group"
        >
          <Card className="h-full hover:border-primary/50 transition-all duration-300">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-text">ZK Privacy</h3>
              <p className="text-text-muted leading-relaxed">Zero-knowledge proofs ensure privacy while maintaining compliance and security.</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="group"
        >
          <Card className="h-full hover:border-secondary/50 transition-all duration-300">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Banknote size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-text">Custodial Settlement</h3>
              <p className="text-text-muted leading-relaxed">Professional custodians handle asset settlement with institutional-grade security.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}