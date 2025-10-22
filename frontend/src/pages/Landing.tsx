import { Link } from 'react-router-dom';
import { Calendar, Truck, Shield, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      <header className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/CCL_LOGO_TP.png" alt="Cephas Cargo" className="h-12 w-auto object-contain" />
            <div>
              <div className="text-sm font-semibold">Cephas Cargo</div>
              <div className="text-xs text-slate-500">Sea & Air Logistics Platform</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">Logistics made reliable and transparent</h1>
            <p className="mt-6 text-lg text-slate-600">Streamline shipment tracking, inventory management and claims with a secure platform built for businesses operating across Ghana and beyond.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/login" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-white text-sm font-medium shadow">Start</Link>
              
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-semibold">Shipment Visibility</div>
                  <div className="text-sm text-slate-500">Track sea and air cargo end-to-end.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-semibold">Enterprise-grade Security</div>
                  <div className="text-sm text-slate-500">Role-based access & encrypted data.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-semibold">Scheduling & ETA</div>
                  <div className="text-sm text-slate-500">Plan and forecast delivery windows.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-semibold">Team Collaboration</div>
                  <div className="text-sm text-slate-500">Manage users, roles and workflows.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-xl border border-slate-100 shadow p-6 bg-white">
              <div className="text-sm text-slate-500">Operational snapshot</div>
              <div className="mt-4 bg-slate-50 rounded-md p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Route</div>
                    <div className="text-lg font-semibold">China → Ghana</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">ETA</div>
                    <div className="text-lg font-semibold">3d 14h</div>
                  </div>
                </div>

                <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-2 bg-primary w-3/4" />
                </div>

                <div className="mt-4 grid grid-cols-3 text-xs text-slate-500">
                  <div>
                    <div className="font-semibold text-slate-800">Containers</div>
                    <div>24</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Weight</div>
                    <div>12.4t</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Status</div>
                    <div>On schedule</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <div>Updated 12m ago</div>
                <div>+44 clients</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold">Built for teams of all sizes</h3>
            <p className="mt-3 text-slate-600">Run operations with clarity — reduce delays, improve visibility and keep teams aligned.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 border rounded-lg text-center">
              <Calendar className="h-6 w-6 text-primary mx-auto" />
              <h4 className="mt-3 font-semibold">Scheduling</h4>
              <p className="mt-2 text-sm text-slate-500">Plan shipments and get ETA forecasts</p>
            </div>

            <div className="p-6 border rounded-lg text-center">
              <Truck className="h-6 w-6 text-primary mx-auto" />
              <h4 className="mt-3 font-semibold">Route Optimization</h4>
              <p className="mt-2 text-sm text-slate-500">Reduce shipping costs and delays</p>
            </div>

            <div className="p-6 border rounded-lg text-center">
              <Shield className="h-6 w-6 text-primary mx-auto" />
              <h4 className="mt-3 font-semibold">Compliance</h4>
              <p className="mt-2 text-sm text-slate-500">Customs and documentation made easy</p>
            </div>
          </div>
        </section>

        <section className="py-8 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold">Our impact in numbers</h3>
            <p className="mt-3 text-slate-600">Operational metrics that matter — clear, measurable outcomes for teams using Cephas Cargo.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white border rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">1,200+</div>
              <div className="mt-2 text-sm text-slate-600">Shipments handled</div>
            </div>

            <div className="p-6 bg-white border rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">99.2%</div>
              <div className="mt-2 text-sm text-slate-600">On-time delivery rate</div>
            </div>

            <div className="p-6 bg-white border rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="mt-2 text-sm text-slate-600">Logistics partners</div>
            </div>
          </div>
        </section>

        <footer className="py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-slate-600">© {new Date().getFullYear()} Cephas Cargo and Logistics. All rights reserved.</div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link to="/login" className="text-sm text-slate-700 hover:text-primary">Sign in</Link>
              <Link to="/signup" className="text-sm text-primary hover:underline">Get started</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
