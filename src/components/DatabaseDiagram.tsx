import React, { useState } from 'react';
import { Database, Key, Table, Sparkles } from 'lucide-react';

interface SchemaTable {
  name: string;
  engine: 'PostgreSQL' | 'MySQL InnoDB';
  columns: Array<{ name: string; type: string; isPk?: boolean; isFk?: boolean; ref?: string }>;
}

const tables: SchemaTable[] = [
  {
    name: 'users_ledger',
    engine: 'PostgreSQL',
    columns: [
      { name: 'id', type: 'UUID', isPk: true },
      { name: 'tenant_id', type: 'INT', isFk: true, ref: 'tenants.id' },
      { name: 'email', type: 'VARCHAR(255)' },
      { name: 'role', type: 'user_role_enum' },
      { name: 'created_at', type: 'TIMESTAMPTZ' }
    ]
  },
  {
    name: 'orders',
    engine: 'PostgreSQL',
    columns: [
      { name: 'id', type: 'BIGSERIAL', isPk: true },
      { name: 'user_id', type: 'UUID', isFk: true, ref: 'users_ledger.id' },
      { name: 'total_cents', type: 'BIGINT' },
      { name: 'status', type: 'VARCHAR(30)' },
      { name: 'payload', type: 'JSONB (GIN Index)' }
    ]
  },
  {
    name: 'order_items',
    engine: 'MySQL InnoDB',
    columns: [
      { name: 'id', type: 'BIGINT AUTO_INCREMENT', isPk: true },
      { name: 'order_id', type: 'BIGINT', isFk: true, ref: 'orders.id' },
      { name: 'sku', type: 'VARCHAR(50)', isFk: true, ref: 'inventory.sku' },
      { name: 'quantity', type: 'INT' },
      { name: 'price_cents', type: 'INT' }
    ]
  },
  {
    name: 'inventory_items',
    engine: 'MySQL InnoDB',
    columns: [
      { name: 'sku', type: 'VARCHAR(50)', isPk: true },
      { name: 'warehouse_id', type: 'INT' },
      { name: 'stock_available', type: 'INT' },
      { name: 'stock_reserved', type: 'INT' },
      { name: 'version_lock', type: 'BIGINT' }
    ]
  }
];

export default function DatabaseDiagram() {
  const [activeTable, setActiveTable] = useState<string>('orders');

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-neutral-900" />
            <span className="text-xs font-mono text-neutral-600 uppercase tracking-wider font-semibold">
              Relational Schema Architecture
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
            Normalized Multi-Tenant Relational ER Model
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            ACID transaction boundaries, foreign key referential integrity, and compound B-Tree indexes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-700">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>InnoDB / PgBouncer Active</span>
        </div>
      </div>

      {/* Grid of Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {tables.map((tbl) => {
          const isSelected = activeTable === tbl.name;
          return (
            <div
              key={tbl.name}
              onClick={() => setActiveTable(tbl.name)}
              className={`rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'bg-neutral-100/90 border-neutral-900 shadow-sm scale-[1.01]'
                  : 'bg-white border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {/* Table Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-200">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-neutral-900">
                  <Table className="w-3.5 h-3.5 text-neutral-700" />
                  <span className="truncate">{tbl.name}</span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-200/70 text-neutral-700">
                  {tbl.engine.includes('Postgres') ? 'PG' : 'MySQL'}
                </span>
              </div>

              {/* Columns */}
              <div className="space-y-1.5 font-mono text-xs">
                {tbl.columns.map((col) => (
                  <div key={col.name} className="flex items-center justify-between gap-1 text-[11px]">
                    <div className="flex items-center gap-1.5 truncate">
                      {col.isPk ? (
                        <Key className="w-3 h-3 text-amber-600 shrink-0" title="Primary Key" />
                      ) : col.isFk ? (
                        <span className="w-3 text-center text-neutral-800 text-[10px] font-bold">FK</span>
                      ) : (
                        <span className="w-3 text-center text-neutral-400">•</span>
                      )}
                      <span className={col.isPk ? 'text-amber-800 font-semibold' : col.isFk ? 'text-neutral-900 font-medium' : 'text-neutral-700'}>
                        {col.name}
                      </span>
                    </div>
                    <span className="text-neutral-500 text-[10px] shrink-0">{col.type}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Table Inspection Detail */}
      <div className="mt-6 p-4 rounded-xl bg-neutral-100 border border-neutral-200 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-neutral-700 shrink-0" />
          <span className="text-neutral-600">Inspecting Table:</span>
          <span className="text-neutral-900 font-bold">{activeTable}</span>
        </div>
        <div className="text-neutral-500 text-[11px]">
          Target: High-throughput compound index with zero table scan lock contention.
        </div>
      </div>
    </div>
  );
}
