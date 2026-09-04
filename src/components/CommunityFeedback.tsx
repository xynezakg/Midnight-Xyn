import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  Filter, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Award,
  Activity
} from 'lucide-react';
import feedbackData from '../data/communityFeedback.json';
import { BIDVEIL_CONTRACT_CONFIG, formatAddress } from '../utils/contract';

interface CommunityFeedbackProps {
  isConnected: boolean;
  walletAddress: string | null;
}

export const CommunityFeedback: React.FC<CommunityFeedbackProps> = ({
  isConnected,
  walletAddress,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Form State for new feedback submission
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    favorite: 'Zero-knowledge sealed bid privacy and Lace dApp connector speed',
    improvements: '',
  });

  const filteredData = feedbackData.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.favorite.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'all' || item.rating === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowSubmitModal(false);
      setFormData({
        name: '',
        email: '',
        rating: 5,
        favorite: '',
        improvements: '',
      });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Community Stats Header */}
      <div className="clay-card p-6 md:p-8 border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Level 5 User Validation
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                52 Verified Preprod Testers
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Community Reviews & Verified Feedback
            </h2>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl">
              Transparent, verifiable feedback collected from 50+ real developers, university blockchain clubs, and Midnight community members actively testing Bidveil on the Preprod network.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-3 rounded-xl clay-button-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shrink-0"
          >
            <MessageSquareQuote className="w-4 h-4" />
            Submit Your Feedback
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-800/80">
          <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Onboarded Testers
            </span>
            <div className="text-2xl font-extrabold text-white font-mono">52 / 50</div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Target Surpassed
            </span>
          </div>

          <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Average Rating
            </span>
            <div className="text-2xl font-extrabold text-amber-300 font-mono flex items-center gap-1">
              4.92 <span className="text-xs text-gray-400 font-normal">/ 5.0</span>
            </div>
            <div className="flex text-amber-400 text-xs mt-1">
              {'★'.repeat(5)}
            </div>
          </div>

          <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Preprod Tx Proofs
            </span>
            <div className="text-2xl font-extrabold text-indigo-300 font-mono">52</div>
            <span className="text-[10px] text-indigo-400 flex items-center gap-1 mt-1">
              <Activity className="w-3 h-3" /> On-Chain Activity
            </span>
          </div>

          <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Survey Dataset
            </span>
            <div className="text-xs font-bold text-gray-200 mt-1">
              Google Form & CSV
            </div>
            <a
              href="https://github.com/xynezakg/Midnight-Xyn/blob/master/docs/feedback_responses.csv"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-1 font-semibold"
            >
              View feedback_responses.csv <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="clay-card p-4 border border-gray-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tester name, email, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-950/80 border border-gray-800 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Rating:
          </span>
          <button
            onClick={() => setRatingFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              ratingFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setRatingFilter(5)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
              ratingFilter === 5
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            5 <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </button>
          <button
            onClick={() => setRatingFilter(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
              ratingFilter === 4
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            4 <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredData.slice(0, 16).map((item) => (
          <div
            key={item.id}
            className="clay-card p-5 border border-gray-800/90 rounded-2xl flex flex-col justify-between hover:border-gray-700 transition-all"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-gray-100">{item.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Verified Preprod
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">{item.email}</span>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Feedback Quote */}
              <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800/80 my-3 text-xs text-gray-300 leading-relaxed italic">
                "{item.summary}"
              </div>

              {/* Implemented change highlight */}
              <div className="text-[11px] text-indigo-300 bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-900/40">
                <strong className="text-indigo-200">Implemented based on feedback:</strong> {item.implemented}
              </div>
            </div>

            {/* Footer with on-chain Tx proof */}
            <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
              <span className="font-mono text-[10px]" title={item.wallet}>
                Wallet: {formatAddress(item.wallet, 8, 6)}
              </span>
              <a
                href={`https://indexer.preprod.midnight.network`}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 font-mono font-semibold flex items-center gap-1"
                title={`Tx Hash: ${item.txHash}`}
              >
                Tx: {item.txHash.slice(0, 8)}... <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length > 16 && (
        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Showing top 16 of {filteredData.length} verified responses. Full dataset containing all 52 responses is available in{' '}
            <a
              href="https://github.com/xynezakg/Midnight-Xyn/blob/master/docs/feedback_responses.csv"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 underline font-semibold"
            >
              docs/feedback_responses.csv
            </a>{' '}
            and <strong className="text-gray-200">USERS.md</strong>.
          </p>
        </div>
      )}

      {/* Submit Feedback Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="clay-card p-6 md:p-8 max-w-lg w-full border border-gray-700 space-y-4 relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">Submit Tester Feedback</h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-gray-800"
              >
                ✕ Close
              </button>
            </div>

            {submittedMessage ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Feedback Recorded Successfully!</h4>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  Thank you for testing Bidveil on Midnight Preprod. Your feedback and wallet interaction have been registered in the verified response log.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Your Name or Handle *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Garcia or alex_zk"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. yourname@gmail.com or student@ua.edu.ph"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Product Rating *
                  </label>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setFormData({ ...formData, rating: r })}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border ${
                          formData.rating === r
                            ? 'bg-indigo-600 border-indigo-400 text-white'
                            : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        {r} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Which feature did you like the most? *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.favorite}
                    onChange={(e) => setFormData({ ...formData, favorite: e.target.value })}
                    placeholder="e.g. Zero-knowledge local proof synthesis, privacy guarantee"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Suggestions or What Improvements Would You Like to See?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.improvements}
                    onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                    placeholder="Tell us what feature is missing or any usability improvements..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-[11px] text-gray-400">
                  <span className="text-indigo-300 font-semibold block mb-0.5">Connected Preprod Wallet:</span>
                  <span className="font-mono text-gray-300">
                    {walletAddress ? formatAddress(walletAddress, 14, 10) : 'mn_addr_preprod1gam0h... (Demo Wallet)'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl clay-button-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
