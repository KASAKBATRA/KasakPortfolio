import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';

interface AuditRecord {
  id: string;
  scheme: string;
  amount: string;
  status: 'inspecting' | 'anomaly' | 'dedup' | 'verified';
  flagText: string;
  timestamp: string;
}

const INITIAL_RECORDS: AuditRecord[] = [
  {
    id: 'CAG-26-9041',
    scheme: 'NREGA DBT Disb.',
    amount: '₹48,500',
    status: 'verified',
    flagText: 'Hash Match 100%',
    timestamp: '14:22:01'
  },
  {
    id: 'CAG-26-9042',
    scheme: 'GeM Procurement',
    amount: '₹12,40,000',
    status: 'anomaly',
    flagText: 'Variance > 3σ',
    timestamp: '14:22:04'
  },
  {
    id: 'CAG-26-9043',
    scheme: 'Welfare Direct',
    amount: '₹3,200',
    status: 'dedup',
    flagText: 'Duplicate ID Pruned',
    timestamp: '14:22:07'
  },
  {
    id: 'CAG-26-9044',
    scheme: 'Asset Registry S3',
    amount: '₹84,000',
    status: 'verified',
    flagText: 'VLM Image Pass',
    timestamp: '14:22:11'
  },
  {
    id: 'CAG-26-9045',
    scheme: 'District Ledger',
    amount: '₹1,56,800',
    status: 'inspecting',
    flagText: 'KNIME Node Run',
    timestamp: '14:22:15'
  }
];

const RAW_STREAM_POOL: Omit<AuditRecord, 'timestamp'>[] = [
  { id: 'CAG-26-9046', scheme: 'GeM Contract Reconcil.', amount: '₹95,200', status: 'verified', flagText: 'Ledger Reconciled' },
  { id: 'CAG-26-9047', scheme: 'NREGA Muster Roll', amount: '₹18,000', status: 'anomaly', flagText: 'Anomaly Flagged' },
  { id: 'CAG-26-9048', scheme: 'Sanction Audit S3', amount: '₹4,12,000', status: 'verified', flagText: 'AWS S3 Checksum OK' },
  { id: 'CAG-26-9049', scheme: 'Vendor Invoice Sync', amount: '₹62,400', status: 'dedup', flagText: 'Ghost Invoice Deduplicated' },
  { id: 'CAG-26-9050', scheme: 'Multimodal VLM Check', amount: '₹2,30,000', status: 'verified', flagText: 'Image Specs Validated' },
  { id: 'CAG-26-9051', scheme: 'State DBT Pipeline', amount: '₹27,600', status: 'verified', flagText: 'Neon DB Synced' }
];

const AuditDataEngine: React.FC = () => {
  const [records, setRecords] = useState<AuditRecord[]>(INITIAL_RECORDS);
  const [cleanCount, setCleanCount] = useState(1482);
  const [anomaliesCount, setAnomaliesCount] = useState(38);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const poolIndexRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      const nextItem = RAW_STREAM_POOL[poolIndexRef.current % RAW_STREAM_POOL.length];
      poolIndexRef.current += 1;

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      setRecords(prev => {
        const updated = [{ ...nextItem, timestamp: timeStr }, ...prev.slice(0, 4)];
        return updated;
      });

      if (nextItem.status === 'anomaly') {
        setAnomaliesCount(c => c + 1);
      } else {
        setCleanCount(c => c + 1);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl hairline-all bg-[#141310] dark:bg-[#141310] light:bg-[#ffffff] shadow-2xl overflow-hidden transition-colors"
      style={{
        boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 hairline-b bg-[#1a1814] dark:bg-[#1a1814] light:bg-[#f2efe8]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a2b] animate-pulse" />
          <span className="font-mono text-xs text-[#9a968d] light:text-[#6b665c] tracking-wider uppercase">
            REMOTE AUDIT ENGINE · V3.2
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-[#9a968d]">
          <span className="flex items-center gap-1 text-[#ff6a2b]">
            <RefreshCw size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
            LIVE PIPELINE
          </span>
        </div>
      </div>

      {/* Audit Stream Table Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-[#9a968d] light:text-[#6b665c] hairline-b bg-[#12110e] dark:bg-[#12110e] light:bg-[#faf8f5]">
        <div className="col-span-3">RECORD ID</div>
        <div className="col-span-4">SCHEME / SOURCE</div>
        <div className="col-span-2">DISBURSED</div>
        <div className="col-span-3 text-right">AUDIT VERDICT</div>
      </div>

      {/* Streaming Rows */}
      <div className="divide-y divide-[var(--border-hairline)] font-mono text-xs">
        {records.map((rec) => {
          const isAnomaly = rec.status === 'anomaly';
          const isDedup = rec.status === 'dedup';
          const isVerified = rec.status === 'verified';

          return (
            <div
              key={rec.id + rec.timestamp}
              className={`grid grid-cols-12 gap-2 px-4 py-3 items-center transition-all duration-500 ${
                isAnomaly
                  ? 'bg-[#ff6a2b]/10 text-[#f2efe8]'
                  : isDedup
                  ? 'opacity-60 bg-[#161512] line-through text-[#9a968d]'
                  : 'hover:bg-[#1e1c18]/50 text-[#f2efe8] light:text-[#141311]'
              }`}
            >
              {/* Record ID */}
              <div className="col-span-3 font-semibold flex items-center gap-1.5 truncate">
                <span className="text-[10px] text-[#9a968d]">{rec.timestamp}</span>
                <span className="truncate">{rec.id}</span>
              </div>

              {/* Scheme */}
              <div className="col-span-4 truncate text-[#f2efe8] light:text-[#141311]">
                {rec.scheme}
              </div>

              {/* Disbursed Amount */}
              <div className="col-span-2 font-medium text-[#9a968d] light:text-[#6b665c] truncate">
                {rec.amount}
              </div>

              {/* Verdict Pill */}
              <div className="col-span-3 flex justify-end">
                {isAnomaly && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider bg-[#ff6a2b] text-white">
                    <AlertTriangle size={10} />
                    FLAGGED
                  </span>
                )}
                {isDedup && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium tracking-wider bg-zinc-800 text-zinc-400">
                    COLLAPSED
                  </span>
                )}
                {isVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck size={10} />
                    AUDIT-READY
                  </span>
                )}
                {rec.status === 'inspecting' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium tracking-wider bg-amber-500/15 text-amber-300">
                    PARSING
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Pipeline Telemetry Footer */}
      <div className="grid grid-cols-3 divide-x divide-[var(--border-hairline)] px-4 py-3 bg-[#11100e] dark:bg-[#11100e] light:bg-[#f7f5f0] hairline-t text-center font-mono">
        <div>
          <div className="text-[10px] text-[#9a968d] light:text-[#6b665c] uppercase">Validated Rows</div>
          <div className="text-sm font-bold text-emerald-400 mt-0.5">
            {cleanCount.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#9a968d] light:text-[#6b665c] uppercase">Anomalies Detected</div>
          <div className="text-sm font-bold text-[#ff6a2b] mt-0.5">
            {anomaliesCount}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#9a968d] light:text-[#6b665c] uppercase">Audit Confidence</div>
          <div className="text-sm font-bold text-[#f2efe8] light:text-[#141311] mt-0.5 flex items-center justify-center gap-1">
            <CheckCircle2 size={12} className="text-[#ff6a2b]" />
            99.98%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDataEngine;
