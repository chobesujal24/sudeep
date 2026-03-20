"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, X, Check } from 'lucide-react';

export default function ProductFilterView({ products, dbCatMap, basePath }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Derive unique categories from the product list
  const allCategories = useMemo(() => {
    const cats = new Set();
    products.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [products]);

  // Handle checking/unchecking a category
  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) 
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  // Filter the products based on search and selected categories
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategories]);

  // Helper to get category slug
  const getCategorySlug = (catName) => {
    if (dbCatMap && dbCatMap[catName]) return dbCatMap[catName].slug;
    // Fallback slugification
    return catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-2 py-2.5 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] text-[color:var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent text-sm placeholder:text-[color:var(--color-text-muted)]/50"
          />
        </div>
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] px-4 py-2.5 rounded-xl shadow-sm text-sm font-semibold text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-bg-card-hover)]"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Sidebar Filters (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed inset-0 z-50 bg-black/60 lg:bg-transparent lg:static lg:w-48 shrink-0 transition-opacity duration-300
        ${isMobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}
      `}>
        <div className={`
          absolute left-0 top-0 bottom-0 w-[250px] bg-[color:var(--color-bg-card)] lg:bg-transparent lg:w-full lg:static p-6 lg:p-0 h-full overflow-y-auto transition-transform duration-300 shadow-2xl lg:shadow-none
          ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h3 className="font-bold text-lg text-[color:var(--color-foreground)]">Filters</h3>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-card-hover)] rounded-full text-white lg:text-inherit">
              <X size={20} />
            </button>
          </div>

          <div className="sticky top-24">
            {/* Desktop Search */}
            <div className="hidden lg:block relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-text-muted)]" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[color:var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] focus:border-transparent text-sm bg-[color:var(--color-bg-card)] text-[color:var(--color-foreground)] placeholder:text-[color:var(--color-text-muted)]/50"
              />
            </div>

            {/* Only show category filter if we have multiple categories to filter */}
            {allCategories.length > 1 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[color:var(--color-foreground)]">Categories</h3>
                  {selectedCategories.length > 0 && (
                    <button onClick={() => setSelectedCategories([])} className="text-xs text-[color:var(--color-primary)] hover:underline font-medium">Clear</button>
                  )}
                </div>
                <div className="space-y-3">
                  {allCategories.map(cat => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <label key={cat} className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center pt-0.5">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => toggleCategory(cat)}
                            className="peer sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                            isSelected 
                              ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)] shadow-sm" 
                              : "border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] group-hover:border-[color:var(--color-text-muted)]"
                          }`}>
                            <Check 
                              size={14} 
                              strokeWidth={3}
                              className={`text-white transition-opacity duration-200 ${
                                isSelected ? "opacity-100" : "opacity-0"
                              }`} 
                            />
                          </div>
                        </div>
                        <span className={`text-sm font-medium transition-colors ${
                          isSelected ? "text-[color:var(--color-foreground)]" : "text-[color:var(--color-text-secondary)] group-hover:text-[color:var(--color-foreground)]"
                        }`}>
                          {cat}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Grid */}
      <div className="flex-1">
        {/* Results count header and Active Filters */}
        <div className="mb-8">
          <div className="pb-4 border-b border-[color:var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-[color:var(--color-foreground)]">All Products</h2>
            <p className="text-[color:var(--color-text-muted)] text-sm font-medium bg-[color:var(--color-section)] px-3 py-1 rounded-full w-fit">
              Showing <span className="font-bold text-[color:var(--color-foreground)]">{filteredProducts.length}</span> results
            </p>
          </div>

          {/* Active Filter Pills */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs text-[color:var(--color-text-muted)] font-medium mr-1">Active Filters:</span>
              {selectedCategories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-1.5 bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 text-[color:var(--color-primary)] px-3 py-1 rounded-full text-xs font-semibold hover:bg-[color:var(--color-primary)]/20 transition-colors"
                >
                  {cat}
                  <X size={12} className="opacity-70" />
                </button>
              ))}
              <button 
                onClick={() => setSelectedCategories([])}
                className="text-xs text-[color:var(--color-text-muted)] hover:text-[color:var(--color-foreground)] underline underline-offset-2 ml-2 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[color:var(--color-bg-card)] rounded-2xl border border-dashed border-[color:var(--color-border)]">
            <div className="w-16 h-16 bg-[color:var(--color-section)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-[color:var(--color-text-muted)] w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[color:var(--color-foreground)] mb-2">No products found</h3>
            <p className="text-[color:var(--color-text-muted)] max-w-sm mx-auto mb-6">We couldn't find anything matching your current filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategories([]); }}
              className="px-6 py-2 bg-[color:var(--color-foreground)] text-[color:var(--color-background)] font-medium rounded-lg hover:opacity-90 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <div key={i} className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] shadow-sm rounded-2xl overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300 hover:border-[color:var(--color-accent)] hover:-translate-y-1">
                {/* Image placeholder */}
                <div className="relative h-64 bg-white overflow-hidden flex items-center justify-center p-4">
                  {product.images?.[0] ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-contain p-4 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-[color:var(--color-foreground)] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  )}
                  <div className="absolute top-3 right-3 bg-[color:var(--color-bg-card)]/90 backdrop-blur-md border border-[color:var(--color-border)] text-[color:var(--color-foreground)] text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm text-white lg:text-inherit">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 border-t border-[color:var(--color-border)]">
                  <h3 className="font-heading font-bold text-lg mb-2 text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-primary)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[color:var(--color-text-secondary)] opacity-80 text-sm leading-relaxed mb-5 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(product.specs || []).slice(0, 3).map((spec, j) => (
                      <span
                        key={j}
                        className="bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 rounded-lg px-2.5 py-1 text-[0.7rem] text-[color:var(--color-primary)] font-medium"
                      >
                        {spec.value}
                      </span>
                    ))}
                    {(product.specs || []).length > 3 && (
                      <span className="bg-[color:var(--color-section)] border border-[color:var(--color-border)] rounded-lg px-2 py-1 text-[0.7rem] text-[color:var(--color-text-muted)] font-medium whitespace-nowrap">
                        +{(product.specs || []).length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-5 border-t border-[color:var(--color-border)]">
                    <Link
                      href={basePath ? `${basePath}/${product.slug}` : `/product/${getCategorySlug(product.category)}/${product.slug}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[color:var(--color-border)] group-hover:border-transparent bg-[color:var(--color-section)] group-hover:bg-[color:var(--color-primary)] text-[color:var(--color-foreground)] group-hover:text-white font-bold text-sm transition-all no-underline shadow-sm group-hover:shadow-md"
                    >
                      View Details 
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
