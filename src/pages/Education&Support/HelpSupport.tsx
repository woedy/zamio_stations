import React, { useState } from "react";
import {
  HelpCircle, Mail, Info, BarChart3, ChevronDown, ChevronUp
} from "lucide-react";

const faqs = [
  {
    q: "How does airplay detection work?",
    a: "We use automated fingerprinting to scan your station’s stream and match it to our music database in real time."
  },
  {
    q: "How do I add or update stream links?",
    a: "Go to your Station Profile > Stream Links and submit a valid streaming URL (e.g. Icecast, SHOUTcast)."
  },
  {
    q: "What counts as a play?",
    a: "A play is counted when a song is continuously detected for more than 30 seconds."
  }
];

const EducationSupport = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <HelpCircle className="text-indigo-400" /> Education & Support
        </h1>

        {/* FAQ Section */}
        <section className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">📚 FAQ & Help Articles</h2>
          {faqs.map((item, index) => (
            <div key={index} className="border-b border-white/10 py-4">
              <button
                className="w-full flex justify-between items-center text-left text-white font-medium"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {item.q}
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === index && (
                <p className="text-sm text-gray-300 mt-2">{item.a}</p>
              )}
            </div>
          ))}
        </section>

        {/* Contact Support Form */}
        <section className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">📨 Contact Support</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-slate-800 text-white p-3 rounded-md border border-white/10"
            />
            <select className="w-full bg-slate-800 text-white p-3 rounded-md border border-white/10">
              <option>Issue Category</option>
              <option>Account / Login</option>
              <option>Playlog Issue</option>
              <option>Report Export</option>
              <option>Other</option>
            </select>
            <textarea
              placeholder="Describe your issue..."
              rows="4"
              className="w-full bg-slate-800 text-white p-3 rounded-md border border-white/10"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
            >
              Send Ticket
            </button>
          </form>
        </section>

        {/* Music Usage Policy */}
        <section className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/30">
          <div className="flex items-center gap-4">
            <Info className="text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold">🎧 Music Usage Policy</h3>
              <p className="text-sm text-yellow-100 mt-1">
                Learn your responsibilities as a broadcaster or content owner under the RoyaltyGH system.
              </p>
              <button className="mt-2 text-yellow-300 hover:text-white text-sm underline">
                View Policy Guide →
              </button>
            </div>
          </div>
        </section>

        {/* Educational Charts */}
        <section className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="text-green-400" /> Genre Balance Insights
          </h2>
          <div className="bg-slate-800 rounded-lg p-4 text-sm text-gray-300">
            🎶 Last Month:
            <ul className="mt-2 space-y-1">
              <li>• Afrobeats: 40%</li>
              <li>• Gospel: 25%</li>
              <li>• Hiplife: 20%</li>
              <li>• Other: 15%</li>
            </ul>
            <div className="mt-4 h-3 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[40%] float-left" />
              <div className="h-full bg-indigo-500 w-[25%] float-left" />
              <div className="h-full bg-pink-500 w-[20%] float-left" />
              <div className="h-full bg-gray-400 w-[15%] float-left" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EducationSupport;
