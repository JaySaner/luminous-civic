import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer, ExternalLink, QrCode } from 'lucide-react';

interface QRCodeGeneratorProps {
  url: string;
  businessName: string;
  logoUrl?: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  url,
  businessName,
  logoUrl
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-2xl text-center">
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <img src={logoUrl} alt={businessName} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
        ) : (
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-sm border border-cyan-500/30">
            {businessName.charAt(0)}
          </div>
        )}
        <h3 className="text-lg font-bold text-white">{businessName}</h3>
      </div>

      {/* QR Code Container */}
      <div className="p-6 bg-white rounded-3xl shadow-xl border-4 border-cyan-500/30">
        <QRCodeSVG
          value={url}
          size={200}
          bgColor="#ffffff"
          fgColor="#090d16"
          level="H"
          includeMargin={true}
        />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center justify-center gap-1.5">
          <QrCode className="w-4 h-4" /> Scan to Report Issue / Feedback
        </p>
        <p className="text-xs text-slate-400 font-mono break-all max-w-xs">{url}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
        >
          <Printer className="w-4 h-4" /> Print QR Poster
        </button>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg transition"
        >
          <ExternalLink className="w-4 h-4" /> Open Link
        </a>
      </div>
    </div>
  );
};
