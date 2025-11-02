import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './Card';
import Button from './Button';

export default function VaultExplorerSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-bg-card to-bg-muted">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent"
      >
        Top Vaults
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 flex flex-wrap justify-center gap-4"
      >
        <select className="p-3 bg-bg-card border border-border rounded-lg text-text hover:border-primary focus:border-primary transition-colors">
          <option>APY: High to Low</option>
          <option>APY: Low to High</option>
        </select>
        <select className="p-3 bg-bg-card border border-border rounded-lg text-text hover:border-primary focus:border-primary transition-colors">
          <option>Risk: All</option>
          <option>Risk: Low</option>
          <option>Risk: Medium</option>
          <option>Risk: High</option>
        </select>
        <select className="p-3 bg-bg-card border border-border rounded-lg text-text hover:border-primary focus:border-primary transition-colors">
          <option>Asset Type: All</option>
          <option>Real Estate</option>
          <option>Bonds</option>
          <option>Invoices</option>
        </select>
        <select className="p-3 bg-bg-card border border-border rounded-lg text-text hover:border-primary focus:border-primary transition-colors">
          <option>Jurisdiction: Any</option>
          <option>US</option>
          <option>EU</option>
        </select>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -8 }}
          className="group"
        >
          <Card className="h-full group-hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Real Estate</span>
                <span className="text-success font-semibold">8.5% APY</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text">Premium Real Estate Vault</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">TVL</span>
                  <span className="text-text">$1,000,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Risk</span>
                  <span className="text-warning">Medium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Jurisdiction</span>
                  <span className="text-text">US</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25">
                Deposit
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -8 }}
          className="group"
        >
          <Card className="h-full group-hover:border-secondary/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">Bonds</span>
                <span className="text-success font-semibold">5.2% APY</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text">Government Bond Vault</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">TVL</span>
                  <span className="text-text">$500,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Risk</span>
                  <span className="text-success">Low</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Jurisdiction</span>
                  <span className="text-text">EU</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-secondary to-primary hover:shadow-lg hover:shadow-secondary/25">
                Deposit
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -8 }}
          className="group"
        >
          <Card className="h-full group-hover:border-accent/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">Invoices</span>
                <span className="text-success font-semibold">6.8% APY</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text">Invoice Financing Vault</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">TVL</span>
                  <span className="text-text">$300,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Risk</span>
                  <span className="text-warning">Medium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Jurisdiction</span>
                  <span className="text-text">US</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-accent to-secondary hover:shadow-lg hover:shadow-accent/25">
                Deposit
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}