import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, AlertTriangle, RefreshCw, Layers } from 'lucide-react';

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
    id: 'REC-0001',
    scheme: 'NREGA DBT Disb.',
    amount: '₹48,500',
    status: 'verified',
    flagText: 'Hash Match 100%',
    timestamp: '14:22:01'
  },
  {
    id: 'REC-0002',
    scheme: 'GeM Procurement',
    amount: '₹12,40,000',
    status: 'anomaly',
    flagText: 'Variance > 3σ',
    timestamp: '14:22:04'
  },
  {
    id: 'REC-0003',
    scheme: 'Welfare Direct',
    amount: '₹3,200',
    status: 'dedup',
    flagText: 'Duplicate ID Pruned',
    timestamp: '14:22:07'
  },
  {
    id: 'REC-0004',
    scheme: 'Asset Registry S3',
    amount: '₹84,000',
    status: 'verified',
    flagText: 'VLM Image Pass',
    timestamp: '14:22:11'
  },
  {
    id: 'REC-0005',
    scheme: 'District Ledger',
    amount: '₹1,56,800',
    status: 'inspecting',
    flagText: 'KNIME Node Run',
    timestamp: '14:22:15'
  }
];

const RAW_STREAM_POOL: Omit<AuditRecord, 'timestamp'>[] = [
  { id: 'REC-0006', scheme: 'GeM Contract Reconcil.', amount: '₹95,200', status: 'verified', flagText: 'Ledger Reconciled' },
  { id: 'REC-0007', scheme: 'NREGA Muster Roll', amount: '₹18,000', status: 'anomaly', flagText: 'Anomaly Flagged' },
  { id: 'REC-0008', scheme: 'Sanction Audit S3', amount: '₹4,12,000', status: 'verified', flagText: 'AWS S3 Checksum OK' },
  { id: 'REC-0009', scheme: 'Vendor Invoice Sync', amount: '₹62,400', status: 'dedup', flagText: 'Ghost Invoice Deduplicated' },
  { id: 'REC-0010', scheme: 'Multimodal VLM Check', amount: '₹2,30,000', status: 'verified', flagText: 'Image Specs Validated' },
  { id: 'REC-0011', scheme: 'State DBT Pipeline', amount: '₹27,600', status: 'verified', flagText: 'Neon DB Synced' }
];

interface AuditDataEngineProps {
  className?: string;
  style?: React.CSSProperties;
}

const AuditDataEngine: React.FC<AuditDataEngineProps> = ({ className = '', style }) => {
  const [records, setRecords] = useState<AuditRecord[]>(INITIAL_RECORDS);
  const [cleanCount, setCleanCount] = useState(1482);
  const [anomaliesCount, setAnomaliesCount] = useState(38);
  const [duplicatesCount, setDuplicatesCount] = useState(14);
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
      } else if (nextItem.status === 'dedup') {
        setDuplicatesCount(c => c + 1);
      } else {
        setCleanCount(c => c + 1);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      style={style}
      className={`w-full rounded-2xl hairline-all bg-[var(--card-bg)] shadow-2xl overflow-hidden transition-colors ${className}`}
    >
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 hairline-b bg-[var(--bg-surface-elevated)] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a2b] animate-pulse" />
          <div>
            <span className="font-mono text-xs font-semibold text-[var(--text-primary)] tracking-wider uppercase">
              Audit Analytics Demo
            </span>
            <span className="ml-2 text-[10px] font-mono text-[var(--text-muted)] tracking-normal">
              · Illustrative demo · sample data
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ff6a2b]/15 text-[var(--accent-small)] font-semibold border border-[#ff6a2b]/30">
            <RefreshCw size={10} className="animate-spin" style={{ animationDuration: '4s' }} />
            SIMULATED
          </span>
        </div>
      </div>

      {/* Audit Stream Table Header */}
      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] hairline-b bg-[var(--bg-surface)] font-semibold">
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
                  ? 'bg-[#ff6a2b]/15 text-[var(--text-primary)]'
                  : isDedup
                  ? 'bg-[var(--bg-surface)] line-through text-[var(--text-muted)] opacity-75'
                  : 'hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)]'
              }`}
            >
              {/* Record ID */}
              <div className="col-span-3 font-semibold flex items-center gap-1.5 truncate">
                <span className="text-[10px] text-[var(--text-muted)]">{rec.timestamp}</span>
                <span className="truncate text-[var(--text-primary)]">{rec.id}</span>
              </div>

              {/* Scheme */}
              <div className="col-span-4 truncate text-[var(--text-secondary)] font-medium">
                {rec.scheme}
              </div>

              {/* Disbursed Amount */}
              <div className="col-span-2 font-medium text-[var(--text-muted)] truncate">
                {rec.amount}
              </div>

              {/* Verdict Pill */}
              <div className="col-span-3 flex justify-end">
                {isAnomaly && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#ff6a2b] text-white">
                    <AlertTriangle size={10} className="stroke-[2.5]" />
                    FLAGGED
                  </span>
                )}
                {isDedup && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium tracking-wider bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
                    COLLAPSED
                  </span>
                )}
                {isVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck size={10} className="stroke-[2.5]" />
                    AUDIT-READY
                  </span>
                )}
                {rec.status === 'inspecting' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    PARSING
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Pipeline Telemetry Footer */}
      <div className="grid grid-cols-3 divide-x divide-[var(--border-hairline)] px-4 py-3 bg-[var(--bg-surface-elevated)] hairline-t text-center font-mono">
        <div>
          <div className="text-[10px] text-[var(--text-muted)] uppercase font-medium">Validated Rows</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {cleanCount.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[var(--text-muted)] uppercase font-medium">Anomalies Detected</div>
          <div className="text-sm font-bold text-[var(--accent-small)] mt-0.5">
            {anomaliesCount}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[var(--text-muted)] uppercase font-medium">Duplicates Collapsed</div>
          <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5 flex items-center justify-center gap-1">
            <Layers size={12} className="text-[#ff6a2b]" />
            {duplicatesCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDataEngine;
