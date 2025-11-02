import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './Card';
import { Upload, Vault, TrendingUp } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent"
      >
        How it Works
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group"
        >
          <Card className="text-center h-full hover:border-primary/50 transition-all duration-300">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Upload size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-text">Tokenize Assets</h3>
              <p className="text-text-muted leading-relaxed">Upload and tokenize real-world assets with custody settlement.</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group"
        >
          <Card className="text-center h-full hover:border-secondary/50 transition-all duration-300">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Vault size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-text">Pool in Vaults</h3>
              <p className="text-text-muted leading-relaxed">Deposit assets into KYC-gated yield vaults for passive income.</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="group"
        >
          <Card className="text-center h-full hover:border-accent/50 transition-all duration-300">
            <CardContent className="pt-8">
              <div className="w-20 h-20 bg-gradient-to-r from-accent to-secondary rounded-full mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-text">Earn Yield</h3>
              <p className="text-text-muted leading-relaxed">Receive audited yield distributions automatically.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}