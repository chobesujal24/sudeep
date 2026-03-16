"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, X } from 'lucide-react';

export default function ProductFilterView({ products, dbCatMap }) {
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

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
          />
        </div>
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Sidebar Filters (Desktop & Mobile Drawer) */}
      <aside className={`
        fixed inset-0 z-50 bg-black/60 lg:bg-transparent lg:static lg:w-64 shrink-0 transition-opacity duration-300
        ${isMobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}
      `}>
        <div className={`
          absolute right-0 top-0 bottom-0 w-[280px] bg-white lg:bg-transparent lg:w-full lg:static p-6 lg:p-0 h-full overflow-y-auto transition-transform duration-300
          ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h3 className="font-bold text-lg text-slate-900">Filters</h3>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="sticky top-24">
            {/* Desktop Search */}
            <div className="hidden lg:block relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white"
              />
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Categories</h3>
                {selectedCategories.length > 0 && (
                  <button onClick={() => setSelectedCategories([])} className="text-xs text-blue-600 hover:underline font-medium">Clear</button>
                )}
              </div>
              <div className="space-y-3">
                {allCategories.map(cat => (
                  <label key={cat} className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center pt-0.5">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 rounded border-2 border-slate-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-colors flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none">
                          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Grid */}
      <div className="flex-1">
        {/* Results count header */}
        <div className="mb-6 pb-4 border-b border-slate-200 flex items-center justify-between">
          <p className="text-slate-600 text-sm font-medium">
            Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">We couldn't find anything matching your current filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategories([]); }}
              className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <div key={i} className="bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                {/* Image placeholder */}
                <div className="h-[240px] bg-[#F8FAFC] relative overflow-hidden flex items-center justify-center p-4">
                  {product.images?.[0] ? (
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-contain p-4 mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-[#1E293B] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 border-t border-slate-100">
                  <h3 className="font-heading font-bold text-lg mb-2 text-[#1E293B] group-hover:text-blue-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[#1E293B] opacity-80 text-sm leading-relaxed mb-5 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(product.specs || []).slice(0, 3).map((spec, j) => (
                      <span
                        key={j}
                        className="bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1 text-[0.7rem] text-blue-800 font-medium"
                      >
                        {spec.value}
                      </span>
                    ))}
                    {(product.specs || []).length > 3 && (
                      <span className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[0.7rem] text-slate-600 font-medium whitespace-nowrap">
                        +{(product.specs || []).length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 border-dashed">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#E2E8F0] group-hover:border-transparent bg-white group-hover:bg-blue-600 text-slate-700 group-hover:text-white font-semibold text-sm transition-all no-underline shadow-sm group-hover:shadow-md"
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
