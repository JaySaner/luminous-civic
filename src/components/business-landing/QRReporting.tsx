import React from 'react';
import { motion } from 'motion/react';
import { QrCode, Smartphone, MapPin, CheckCircle, Zap, ShieldCheck, Camera } from 'lucide-react';

export const QRReporting: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#EEF3FF]/40 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2447E8]/10 text-[#2447E8] text-xs font-semibold">
              <QrCode className="w-3.5 h-3.5" />
              <span>Zero-Friction Reporting</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
              QR-Based Issue Reporting — No App Download Required
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Place unique QR codes across your facilities: conference rooms, hospital bays, manufacturing machines, hotel rooms, or retail aisles. Anyone can scan and report in under 15 seconds.
            </p>

            {/* Key Advantages */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#079669]/10 text-[#079669] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pre-Populated Location Metadata</h4>
                  <p className="text-xs text-slate-600">The QR code automatically tags Building, Floor, Room, and Equipment ID — zero typing needed.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#079669]/10 text-[#079669] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Instant Mobile Web Interface</h4>
                  <p className="text-xs text-slate-600">Works directly in any smartphone browser. Quick photo upload and voice notes support.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#079669]/10 text-[#079669] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Anonymous or Staff Authenticated</h4>
                  <p className="text-xs text-slate-600">Configure whether visitors can report anonymously or require staff login.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Interactive Mobile QR Form Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md bg-[#0B1736] p-6 rounded-3xl shadow-2xl text-white border border-slate-700"
            >
              {/* Phone Top Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900" />
              </div>

              {/* Simulated QR Scan Screen */}
              <div className="bg-white text-slate-900 rounded-2xl p-5 space-y-4 shadow-inner">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-[#079669] text-white flex items-center justify-center font-bold text-xs">
                      LC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1736]">Quick Maintenance Report</div>
                      <div className="text-[10px] text-slate-500">Tech Park Campus - Tower B</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                    QR #TB-302
                  </span>
                </div>

                {/* Auto Location Field */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2447E8]" />
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Auto-Detected Location</div>
                    <div className="font-semibold text-slate-800">3rd Floor · Conference Room B3</div>
                  </div>
                </div>

                {/* Issue Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">What issue are you observing?</label>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 italic">
                    "Air conditioning is blowing warm air and humming loudly."
                  </div>
                </div>

                {/* Photo attachment preview */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center text-xs text-slate-500 flex items-center justify-center gap-2 bg-slate-50">
                  <Camera className="w-4 h-4 text-[#079669]" />
                  <span className="font-medium text-slate-700">Photo attached: hvac_unit.jpg</span>
                </div>

                {/* Submit button preview */}
                <div className="pt-1">
                  <div className="w-full py-2.5 rounded-lg bg-[#079669] text-white text-xs font-bold text-center shadow">
                    Submit Issue to Operations
                  </div>
                </div>
              </div>

              {/* Bottom Caption inside mock */}
              <div className="text-center text-[11px] text-slate-400 mt-4">
                Interactive preview of mobile QR submission flow
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
