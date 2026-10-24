import React, { useState, useMemo } from 'react';
import { Sliders, AlertTriangle, ShieldCheck, RefreshCw, BarChart3, Filter, Layers } from 'lucide-react';

interface SyntheticRecord {
  id: string;
  scheme: string;
  vendorId: string;
  amount: number;
  timestamp: string;
  isDuplicateSeed?: boolean;
}

// Generate 200 deterministic synthetic audit records
const generateSyntheticDataset = (): SyntheticRecord[] => {
  const schemes = ['NREGA Direct Disb.', 'GeM Material Procurement', 'State Infra Grant', 'Welfare DBT S3', 'Panchayat Ledger'];
  const vendors = ['VND-8821', 'VND-3942', 'VND-1049', 'VND-5501', 'VND-7219', 'VND-9902'];
  const records: SyntheticRecord[] = [];

  for (let i = 1; i <= 200; i++) {
    const id = `AUD-2026-${String(i).padStart(4, '0')}`;
    const scheme = schemes[i % schemes.length];
    const vendorId = vendors[i % vendors.length];
    
    // Base normal distribution around 45,000 with a few synthetic outliers
    let amount = 35000 + ((i * 37) % 30000);
    let isDuplicateSeed = false;

    // Inject intentional outliers
    if (i === 14 || i === 48 || i === 89 || i === 134 || i === 178) {
      amount = 320000 + (i * 2400); // Extreme high variance
    } else if (i === 32 || i === 76 || i === 115) {
      amount = 4500; // Unusually low disbursement
    }

    // Inject intentional duplicates
    if (i === 22 || i === 65 || i === 110 || i === 152) {
      isDuplicateSeed = true;
      amount = 52400; // duplicate sum
    }

    const hour = 9 + Math.floor(i / 25);
    const min = (i * 7) % 60;
    const sec = (i * 13) % 60;
    const timestamp = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

    records.push({ id, scheme, vendorId, amount, timestamp, isDuplicateSeed });
  }

  return records;
};

const DATASET = generateSyntheticDataset();

// Calculate Mean and Standard Deviation
const mean = DATASET.reduce((acc, r) => acc + r.amount, 0) / DATASET.length;
const stdDev = Math.sqrt(
  DATASET.reduce((acc, r) => acc + Math.pow(r.amount - mean, 2), 0) / DATASET.length
);

const InteractiveAuditLab: React.FC = () => {
  const [zThreshold, setZThreshold] = useState<number>(2.5);
  const [dedupEnabled, setDedupEnabled] = useState<boolean>(true);
  const [selectedScheme, setSelectedScheme] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 7;

  // Process data based on threshold and filters
  const { filteredRecords, anomaliesCount, duplicatesCount, cleanCount } = useMemo(() => {
    let anomalies = 0;
    let duplicates = 0;
    let clean = 0;

    const processed = DATASET.map(rec => {
      const zScore = Math.abs((rec.amount - mean) / stdDev);
      const isAnomaly = zScore > zThreshold;
      const isDedup = dedupEnabled && rec.isDuplicateSeed;

      if (isAnomaly) anomalies++;
      else if (isDedup) duplicates++;
      else clean++;

      return {
        ...rec,
        zScore: Number(zScore.toFixed(2)),
        isAnomaly,
        isDedup,
      };
    });

    const filtered = selectedScheme === 'All' 
      ? processed 
      : processed.filter(r => r.scheme === selectedScheme);

    return {
      filteredRecords: filtered,
      anomaliesCount: anomalies,
      duplicatesCount: duplicates,
      cleanCount: clean
    };
  }, [zThreshold, dedupEnabled, selectedScheme]);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const currentRows = filteredRecords.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="w-full rounded-2xl hairline-all bg-[var(--card-bg)] shadow-xl overflow-hidden my-8">
      {/* Header */}
      <div className="p-5 sm:p-6 hairline-b bg-[var(--bg-surface-elevated)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a2b] shadow-[0_0_8px_rgba(255,106,43,0.8)]" />
            <h4 className="font-serif text-xl sm:text-2xl text-[var(--text-primary)]">
              Try It: Sovereign Audit Anomaly Detector
            </h4>
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-1 font-medium">
            Interactive client-side Z-score analysis across 200 synthetic audit records.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
            200 Rows Live
          </span>
          <span className="px-3 py-1 rounded-full bg-[#ff6a2b]/15 text-[var(--accent-small)] border border-[#ff6a2b]/30 font-semibold">
            Mean: ₹{Math.round(mean).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Control Sliders & Toggles */}
      <div className="p-5 sm:p-6 hairline-b bg-[var(--bg-surface)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Z-score threshold slider */}
        <div className="md:col-span-6 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-primary)] font-semibold flex items-center gap-1.5">
              <Sliders size={14} className="text-[#ff6a2b]" />
              Z-Score Threshold (σ variance):
            </span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--accent-small)] font-bold">
              {zThreshold.toFixed(1)}σ
            </span>
          </div>
          <input
            type="range"
            min="1.2"
            max="4.0"
            step="0.1"
            value={zThreshold}
            onChange={(e) => setZThreshold(parseFloat(e.target.value))}
            className="w-full accent-[#ff6a2b] cursor-pointer"
            aria-label="Adjust Z-Score anomaly threshold"
          />
          <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] font-medium">
            <span>Aggressive (1.2σ)</span>
            <span>Balanced (2.5σ)</span>
            <span>Conservative (4.0σ)</span>
          </div>
        </div>

        {/* Dedup Switch and Scheme Filter */}
        <div className="md:col-span-6 flex flex-wrap items-center justify-between gap-4">
          <label className="inline-flex items-center gap-2.5 cursor-pointer font-mono text-xs text-[var(--text-primary)] font-medium">
            <input
              type="checkbox"
              checked={dedupEnabled}
              onChange={(e) => setDedupEnabled(e.target.checked)}
              className="w-4 h-4 rounded accent-[#ff6a2b]"
            />
            <span className="flex items-center gap-1">
              <Layers size={14} className="text-[#ff6a2b]" />
              Auto Deduplication
            </span>
          </label>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[var(--text-muted)]">Scheme:</span>
            <select
              value={selectedScheme}
              onChange={(e) => {
                setSelectedScheme(e.target.value);
                setPage(1);
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-hairline)] focus:outline-none focus:ring-1 focus:ring-[#ff6a2b]"
            >
              <option value="All">All Schemes (5)</option>
              <option value="NREGA Direct Disb.">NREGA DBT</option>
              <option value="GeM Material Procurement">GeM Procurement</option>
              <option value="State Infra Grant">State Infra</option>
              <option value="Welfare DBT S3">Welfare S3</option>
              <option value="Panchayat Ledger">Panchayat Ledger</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mini SVG Distribution Chart */}
      <div className="p-4 sm:p-6 hairline-b bg-[var(--bg-canvas)]">
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-[var(--text-muted)] font-medium">
          <span className="flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
            <BarChart3 size={14} className="text-[#ff6a2b]" />
            DISBURSEMENT SCATTER &amp; VARIANCE PLOT
          </span>
          <span>Red markers = Flagged Anomaly | Grey = Deduplicated</span>
        </div>

        <div className="h-28 w-full relative flex items-end border-b border-l border-[var(--border-hairline)] px-2 pb-1">
          {/* Threshold Boundary Line */}
          <div
            className="absolute left-0 right-0 border-t-2 border-dashed border-[#ff6a2b] transition-all duration-300 pointer-events-none"
            style={{
              bottom: `${Math.min((zThreshold / 4.2) * 100, 92)}%`,
            }}
          >
            <span className="absolute right-2 -top-4 text-[10px] font-mono text-[var(--accent-small)] font-bold">
              Threshold Line ({zThreshold.toFixed(1)}σ)
            </span>
          </div>

          {/* Sample scatter dots across dataset */}
          <div className="w-full h-full flex items-end justify-between">
            {filteredRecords.slice(0, 75).map((rec, idx) => {
              const heightPercent = Math.min((rec.amount / 350000) * 100, 96);

              return (
                <div
                  key={rec.id + idx}
                  className="group relative flex flex-col items-center"
                  style={{ height: '100%', justifyContent: 'flex-end' }}
                >
                  <div
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      rec.isAnomaly
                        ? 'bg-[#ff6a2b] scale-125 z-10'
                        : rec.isDedup
                        ? 'bg-zinc-600'
                        : 'bg-emerald-500/70 hover:bg-emerald-400'
                    }`}
                    style={{ height: `${Math.max(heightPercent, 6)}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table Stream with Pagination */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[var(--bg-surface-elevated)] hairline-b text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            <tr>
              <th className="py-2.5 px-4">RECORD</th>
              <th className="py-2.5 px-4">SCHEME</th>
              <th className="py-2.5 px-4">VENDOR</th>
              <th className="py-2.5 px-4">DISBURSEMENT</th>
              <th className="py-2.5 px-4">Z-SCORE</th>
              <th className="py-2.5 px-4 text-right">AUDIT STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-hairline)]">
            {currentRows.map((r) => (
              <tr
                key={r.id}
                className={`transition-colors ${
                  r.isAnomaly
                    ? 'bg-[#ff6a2b]/15 text-[var(--text-primary)] font-semibold'
                    : r.isDedup
                    ? 'bg-[var(--bg-surface)] text-[var(--text-muted)] line-through'
                    : 'hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)]'
                }`}
              >
                <td className="py-2.5 px-4 font-semibold text-[var(--text-primary)]">
                  {r.id}
                </td>
                <td className="py-2.5 px-4">{r.scheme}</td>
                <td className="py-2.5 px-4 text-[var(--text-muted)]">{r.vendorId}</td>
                <td className="py-2.5 px-4 font-bold text-[var(--text-primary)]">
                  ₹{r.amount.toLocaleString()}
                </td>
                <td className="py-2.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    r.isAnomaly ? 'bg-[#ff6a2b] text-white' : 'text-[var(--text-muted)]'
                  }`}>
                    {r.zScore}σ
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right">
                  {r.isAnomaly ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ff6a2b] text-white text-[10px] font-bold">
                      <AlertTriangle size={10} />
                      ANOMALY
                    </span>
                  ) : r.isDedup ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] text-[10px] font-semibold border border-[var(--border-hairline)]">
                      COLLAPSED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                      <ShieldCheck size={10} />
                      RECONCILED
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Telemetry & Pagination */}
      <div className="p-4 hairline-t bg-[var(--bg-surface-elevated)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-4 text-[var(--text-muted)] font-medium">
          <span>Clean: <strong className="text-emerald-600 dark:text-emerald-400">{cleanCount}</strong></span>
          <span>Anomalies: <strong className="text-[#ff6a2b]">{anomaliesCount}</strong></span>
          <span>Duplicates: <strong className="text-[var(--text-primary)]">{duplicatesCount}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="px-3 py-1 rounded bg-[var(--bg-surface)] hairline-all text-[var(--text-primary)] disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-[var(--text-muted)] font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            className="px-3 py-1 rounded bg-[var(--bg-surface)] hairline-all text-[var(--text-primary)] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAuditLab;
