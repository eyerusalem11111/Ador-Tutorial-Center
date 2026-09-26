import React, { useState } from 'react';
import { TranslationDictionary } from '../data/translations';
import { 
  X, 
  Code2, 
  Server, 
  Globe2, 
  FileArchive, 
  CheckCircle2, 
  Copy, 
  Download, 
  ExternalLink,
  Sparkles,
  Layers
} from 'lucide-react';

interface WordPressGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary;
}

export const WordPressGuideModal: React.FC<WordPressGuideModalProps> = ({
  isOpen,
  onClose,
  t,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShortcode, setCopiedShortcode] = useState(false);

  if (!isOpen) return null;

  const shortcode = `[ador_portal]`;

  const iframeCode = `<div id="ador-portal-container" style="width: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
  <iframe 
    src="/wp-content/plugins/ador-tutorial-portal/app/index.html" 
    style="width: 100%; min-height: 950px; border: none; display: block;" 
    title="Ador Tutorial Center Operations Portal"
    allow="clipboard-write">
  </iframe>
</div>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyShortcode = () => {
    navigator.clipboard.writeText(shortcode);
    setCopiedShortcode(true);
    setTimeout(() => setCopiedShortcode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">WordPress Automated Integration &amp; .ZIP Package</h2>
              <p className="text-xs text-blue-200/80">Ador Tutorial Center (adortutorial.com) &bull; Ultimate Member Ready</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* Automated WordPress Plugin Download Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-blue-600/10 border-2 border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Ready-To-Install WordPress Plugin (.ZIP)</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                ador-tutorial-portal.zip (Automated Plugin)
              </h3>
              <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                Pre-packaged with WordPress plugin headers, Elementor shortcode <code>[ador_portal]</code>, role auto-detection, and all compiled multilingual dashboard assets.
              </p>
            </div>

            <a
              href="/ador-tutorial-portal.zip"
              download="ador-tutorial-portal.zip"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 shrink-0 group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download .ZIP Plugin</span>
            </a>
          </div>

          {/* Additional Download Packages: Source Code & Standalone Dist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Complete Source Code (.ZIP)</span>
                <span className="text-[11px] text-slate-500">All components, translations &amp; build files</span>
              </div>
              <a
                href="/ador-tutorial-center-source.zip"
                download="ador-tutorial-center-source.zip"
                className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Source .ZIP</span>
              </a>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Standalone Web App (.ZIP)</span>
                <span className="text-[11px] text-slate-500">cPanel, Apache &amp; Subfolder hosting ready</span>
              </div>
              <a
                href="/adortutorial-full-site.zip"
                download="adortutorial-full-site.zip"
                className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Site .ZIP</span>
              </a>
            </div>
          </div>

          {/* Quick Notice about Ultimate Member */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs sm:text-sm">
                Built specifically for your existing Ultimate Member setup!
              </p>
              <p className="text-xs mt-1 text-blue-800 leading-relaxed">
                You already built the registration forms with Ultimate Member. This plugin does not overwrite or replace your forms—it adds the interactive Operations Portal (Mission, Vision, Core Values, Live Job Board, Parent Tuition Dropbox, and Admin Cockpit) and auto-detects logged-in Ultimate Member roles!
              </p>
            </div>
          </div>

          {/* Step by Step Automatic Installation */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              How to Install in 3 Easy Steps:
            </h4>

            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-xs">
                  Upload .ZIP to WordPress
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  In your WordPress admin dashboard, go to <strong>Plugins &rarr; Add New &rarr; Upload Plugin</strong>. Choose <code>ador-tutorial-portal.zip</code> and click <strong>Install Now</strong>, then click <strong>Activate</strong>.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-xs">
                    Insert Shortcode into Elementor or any Page
                  </p>
                  <button
                    onClick={handleCopyShortcode}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center gap-1 text-slate-700 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedShortcode ? 'Copied!' : 'Copy Shortcode'}
                  </button>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Add an Elementor <strong>Shortcode Widget</strong> or Gutenberg Shortcode block and paste:
                </p>
                <code className="inline-block mt-1.5 px-3 py-1 bg-slate-900 text-amber-300 font-mono text-xs rounded-md">
                  [ador_portal]
                </code>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-xs">
                  Role Auto-Detection or Specific Page Views
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  If a user is logged in via Ultimate Member as a tutor or parent, the shortcode automatically opens their dedicated portal. You can also specify exact views:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-[11px] font-mono">
                  <span className="p-2 rounded bg-white border border-slate-200 text-slate-800">
                    [ador_portal view="website"]
                  </span>
                  <span className="p-2 rounded bg-white border border-slate-200 text-slate-800">
                    [ador_portal view="tutor"]
                  </span>
                  <span className="p-2 rounded bg-white border border-slate-200 text-slate-800">
                    [ador_portal view="parent"]
                  </span>
                  <span className="p-2 rounded bg-white border border-slate-200 text-slate-800">
                    [ador_portal view="admin"]
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting: Stuck or duplicate files in WordPress / cPanel */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Fixing Leftover Files or Deletion Issues in WordPress / cPanel:</span>
            </div>
            <p className="text-amber-900/90 leading-relaxed">
              If files appeared empty or came back after deleting, this is caused by WordPress holding a file lock while a plugin is active, or cPanel storing files in <code>.trash</code>:
            </p>
            <ol className="list-decimal pl-4 space-y-1 text-amber-900/90">
              <li><strong>In WordPress Admin:</strong> Go to <strong>Plugins &rarr; Installed Plugins</strong>, click <strong>Deactivate</strong> on any old Ador plugin, then click <strong>Delete</strong>. (Never delete plugin folders via FTP while active in WordPress).</li>
              <li><strong>In cPanel File Manager:</strong> If a folder remains at <code>/wp-content/plugins/ador-tutorial-portal</code>, select it, click <strong>Delete</strong>, and check <strong>&quot;Skip trash and permanently delete&quot;</strong>.</li>
              <li><strong>Do NOT extract manually:</strong> Download the fresh <code>ador-tutorial-portal.zip</code> below. In WordPress Admin, simply go to <strong>Plugins &rarr; Add New &rarr; Upload Plugin</strong> and choose the .zip. WordPress handles the extraction automatically with zero errors!</li>
            </ol>
          </div>

          {/* Alternative Manual Embed */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Code2 className="w-4 h-4 text-indigo-600" />
                <span>Alternative: Direct Elementor HTML Widget Embed</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white border border-slate-200 hover:bg-slate-100 flex items-center gap-1 text-slate-700 transition-colors"
              >
                <Copy className="w-3 h-3" />
                {copiedCode ? 'Copied!' : 'Copy Embed Code'}
              </button>
            </div>
            <pre className="text-[11px] font-mono bg-slate-900 text-slate-200 p-3 rounded-xl overflow-x-auto">
              {iframeCode}
            </pre>
          </div>

          {/* Also mention AI Studio's native export */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Want the raw source code .ZIP?</span>
              <span className="text-[11px] text-slate-500">You can also click the <strong>Settings menu (⋮)</strong> at the top right of this AI Studio screen and select <strong>"Export to ZIP"</strong> anytime.</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <a
            href="https://t.me/AdorTutorCenter"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Official Telegram: @AdorTutorCenter</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
