"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

export default function ProductFilterView({ products, dbCatMap, basePath }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter the products based on search
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [products, searchQuery]);

  // Helper to get category slug
  const getCategorySlug = (catName) => {
    if (dbCatMap && dbCatMap[catName]) return dbCatMap[catName].slug;
    return catName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  return (
    <div className="flex flex-col relative">
      
      {/* Top bar: results count + search */}
      <div className="mb-6 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-slate-900">All Products</h2>
          <span className="text-slate-500 text-sm font-medium bg-slate-100 px-2.5 py-0.5 rounded-full">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm placeholder:text-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-slate-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">We couldn&apos;t find anything matching your search query.</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:opacity-90 transition-colors"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product, i) => (
            <div key={i} className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 hover:border-green-300 hover:-translate-y-1 relative">
              {/* Image */}
              <div className="relative h-56 bg-white overflow-hidden flex items-center justify-center p-4">
                {product.images?.[0] ? (
                  <Image 
                    src={product.images[0]} 
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain p-4 opacity-90 group-hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 text-[0.6rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 border-t border-slate-100">
                <h3 className="font-bold text-base mb-2 text-slate-900 group-hover:text-green-700 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(product.specs || []).slice(0, 3).map((spec, j) => (
                    <span
                      key={j}
                      className="bg-green-50 border border-green-200 rounded-md px-2 py-0.5 text-[0.65rem] text-green-700 font-medium"
                    >
                      {spec.value}
                    </span>
                  ))}
                  {(product.specs || []).length > 3 && (
                    <span className="bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5 text-[0.65rem] text-slate-500 font-medium">
                      +{(product.specs || []).length - 3} more
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Link
                    href={basePath ? `${basePath}/${product.slug}` : `/product/${getCategorySlug(product.category)}/${product.slug}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 group-hover:border-transparent bg-slate-50 group-hover:bg-green-700 text-slate-700 group-hover:text-white font-semibold text-sm transition-all no-underline"
                  >
                    View Details 
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
