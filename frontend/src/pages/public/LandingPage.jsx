import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Award, CheckCircle2, ArrowRight, Shield, Zap, Sparkles, BarChart3 } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider animate-fade-in">
              <Sparkles className="w-4 h-4" /> Next-Gen Educational Tech Platform
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Smart Classroom Management for <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">Enhanced Learning</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Empower Students, Teachers, Parents, and Administrators with real-time attendance tracking, interactive timetables, digital homework submissions, analytics, and instant report cards.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="px-6 py-3.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-500/25 flex items-center gap-2 transition hover:scale-105"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition shadow-xs"
              >
                Sign In to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Designed for All Educational Roles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              A single unified ecosystem built to transform modern digital school operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Admin */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 hover:shadow-lg transition group">
              <div className="p-3 w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Administrators</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Full governance over faculty, student enrollment, classroom allocations, master timetables, and system statistics.
              </p>
            </div>

            {/* Teacher */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 hover:shadow-lg transition group">
              <div className="p-3 w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Teachers</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                One-click attendance marking, QR code verification, assignment uploading, lecture notes sharing, and exam marks entry.
              </p>
            </div>

            {/* Student */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 hover:shadow-lg transition group">
              <div className="p-3 w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Students</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Access routines, submit homework attachments online, download lecture notes, track attendance %, and generate PDF report cards.
              </p>
            </div>

            {/* Parent */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 hover:shadow-lg transition group">
              <div className="p-3 w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Parents</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Real-time child attendance monitoring, exam score analysis, direct teacher remarks, and school announcements.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
