import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardMetrics from './components/DashboardMetrics';
import BookingsTable from './components/BookingsTable';

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <div className="section-label mb-2">Management Portal</div>
              <h1 className="font-display text-3xl font-medium text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Extended Stay Suite · Tema Community 6</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-foreground">2 Units Active</span>
              </div>
              <a
                href="mailto:extendedstaysuitegh@gmail.com"
                className="px-4 py-2 gold-gradient text-accent-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                Contact Owner
              </a>
            </div>
          </div>

          <DashboardMetrics />
          <BookingsTable />
        </div>
      </div>
      <Footer />
    </main>
  );
}